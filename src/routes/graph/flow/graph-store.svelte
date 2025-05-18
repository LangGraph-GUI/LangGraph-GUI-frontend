<!-- routes/graph/flow/graph-store.svelte -->
<script lang="ts" context="module">
	import { writable, derived, get } from 'svelte/store';
	import type { Edge } from '@xyflow/svelte';
	import type { Writable } from 'svelte/store';
	import type { FlowNode } from './node-schema'; // Import CustomNode

	/** A graph consists of nodes and edges */
	export type SubGraph = { nodes: FlowNode[]; edges: Edge[] };

	/** Initial set of named subgraphs */
	const initialGraphs: Record<string, SubGraph> = {
		default: {
			nodes: [
				{
					id: '1',
					data: { label: 'Hello', name: 'Node 1' },
					position: { x: 0, y: 0 }
				},
				{
					id: '2',
					data: { label: 'World', name: 'Node 2' },
					position: { x: 150, y: 150 }
				}
			],
			edges: [{ id: '1-2', source: '1', target: '2' }]
		},
		second: {
			nodes: [
				{
					id: '5',
					data: { label: 'page', name: 'Node 1' },
					position: { x: 333, y: 333 }
				},
				{
					id: '6',
					data: { label: 'dog', name: 'Node 2' },
					position: { x: 5, y: 5 }
				}
			],
			edges: [{ id: '5-6', source: '5', target: '5' }]
		}
	};

	/** The single source of truth for all graphs */
	export const graphs = writable<Record<string, SubGraph>>(initialGraphs);

	/** Which subgraph key is currently active */
	export const usingSubgraph = writable<string>('default');

	/**
	 * Factory: produce a read/write store for one field
	 * of the active subgraph object
	 */
	function makeCurrentStore<K extends keyof SubGraph>(
		field: K
	): {
		subscribe: Writable<SubGraph[K]>['subscribe'];
		set: (value: SubGraph[K]) => void;
		update: (updater: (value: SubGraph[K]) => SubGraph[K]) => void;
	} {
		// A derived store that always yields the right slice
		const slice = derived([graphs, usingSubgraph], ([$graphs, $using]) => {
			const g = $graphs[$using];
			return g ? g[field] : ([] as SubGraph[K]); // crucial type assertion here
		});

		return {
			subscribe: slice.subscribe,
			/** Replace the entire array in the active graph */
			set(newItems: SubGraph[K]) {
				const key = get(usingSubgraph);
				graphs.update((gmap) => {
					if (!gmap[key]) gmap[key] = { nodes: [], edges: [] };
					gmap[key][field] = newItems;
					return gmap;
				});
			},
			/** Update via an updater function */
			update(fn: (items: SubGraph[K]) => SubGraph[K]) {
				const key = get(usingSubgraph);
				graphs.update((gmap) => {
					if (!gmap[key]) gmap[key] = { nodes: [], edges: [] };
					gmap[key][field] = fn(gmap[key][field]);
					return gmap;
				});
			}
		};
	}

	/** Export read/write stores bound to the active subgraph */
	export const currentNodes = makeCurrentStore('nodes');
	export const currentEdges = makeCurrentStore('edges');
</script>
