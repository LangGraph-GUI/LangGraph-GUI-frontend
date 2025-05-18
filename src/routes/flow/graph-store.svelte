<!-- routes/flow/GraphStore.svelte -->
<script lang="ts" context="module">
	import { writable, derived, get } from 'svelte/store';
	import type { Node, Edge } from '@xyflow/svelte';

	/** A graph consists of nodes and edges */
	export type Graph = { nodes: Node[]; edges: Edge[] };

	/** Initial set of named subgraphs */
	const initialGraphs: Record<string, Graph> = {
		default: {
			nodes: [
				{ id: '1', data: { label: 'Hello' }, position: { x: 0, y: 0 } },
				{ id: '2', data: { label: 'World' }, position: { x: 150, y: 150 } }
			],
			edges: [{ id: '1-2', source: '1', target: '2' }]
		}
	};

	/** The single source of truth for all graphs */
	export const graphs = writable<Record<string, Graph>>(initialGraphs);

	/** Which subgraph key is currently active */
	export const usingSubgraph = writable<string>('default');

	/**
	 * Factory: produce a read/write store for one field
	 * of the active subgraph object
	 */
	function makeCurrentStore<K extends keyof Graph>(field: K) {
		// A derived store that always yields the right slice
		const slice = derived([graphs, usingSubgraph], ([$graphs, $using], set) => {
			const g = $graphs[$using];
			set(g ? g[field] : []);
		});

		return {
			subscribe: slice.subscribe,
			/** Replace the entire array in the active graph */
			set(newItems: Graph[K]) {
				const key = get(usingSubgraph);
				graphs.update((gmap) => {
					if (!gmap[key]) gmap[key] = { nodes: [], edges: [] };
					gmap[key][field] = newItems;
					return gmap;
				});
			},
			/** Update via an updater function */
			update(fn: (items: Graph[K]) => Graph[K]) {
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
