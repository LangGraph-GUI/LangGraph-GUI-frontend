<!-- routes/flow/GraphStore.svelte -->
<script lang="ts" context="module">
	import { writable, get } from 'svelte/store';
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
		// add more subgraphs under other keys if needed
	};

	/** Store holding all subgraphs by key */
	export const graphs = writable<Record<string, Graph>>(initialGraphs);

	/** Which subgraph key is currently active */
	export const usingSubgraph = writable<string>('default');

	/**
	 * Creates a store synced to the `nodes` array of the active subgraph.
	 */
	function createCurrentNodesStore() {
		const { subscribe, set } = writable<Node[]>([]);
		let latestNodes: Node[] = [];

		/** Re-sync whenever the active key or graphs map changes */
		function resync() {
			const activeKey = get(usingSubgraph);
			const graphMap = get(graphs);
			const currentGraph = graphMap[activeKey];
			latestNodes = currentGraph?.nodes ?? [];
			set(latestNodes);
		}

		usingSubgraph.subscribe(resync);
		graphs.subscribe(resync);

		return {
			subscribe,
			set: (newNodes: Node[]) => {
				graphs.update((graphMap) => {
					const activeKey = get(usingSubgraph);
					if (!graphMap[activeKey]) {
						graphMap[activeKey] = { nodes: [], edges: [] };
					}
					graphMap[activeKey].nodes = newNodes;
					return graphMap;
				});
				latestNodes = newNodes;
				set(latestNodes);
			},
			update: (updater: (nodes: Node[]) => Node[]) => {
				const updatedNodes = updater(latestNodes);
				graphs.update((graphMap) => {
					const activeKey = get(usingSubgraph);
					if (!graphMap[activeKey]) {
						graphMap[activeKey] = { nodes: [], edges: [] };
					}
					graphMap[activeKey].nodes = updatedNodes;
					return graphMap;
				});
				latestNodes = updatedNodes;
				set(latestNodes);
			}
		};
	}

	/**
	 * Same pattern for edges of the active subgraph.
	 */
	function createCurrentEdgesStore() {
		const { subscribe, set } = writable<Edge[]>([]);
		let latestEdges: Edge[] = [];

		function resync() {
			const activeKey = get(usingSubgraph);
			const graphMap = get(graphs);
			const currentGraph = graphMap[activeKey];
			latestEdges = currentGraph?.edges ?? [];
			set(latestEdges);
		}

		usingSubgraph.subscribe(resync);
		graphs.subscribe(resync);

		return {
			subscribe,
			set: (newEdges: Edge[]) => {
				graphs.update((graphMap) => {
					const activeKey = get(usingSubgraph);
					if (!graphMap[activeKey]) {
						graphMap[activeKey] = { nodes: [], edges: [] };
					}
					graphMap[activeKey].edges = newEdges;
					return graphMap;
				});
				latestEdges = newEdges;
				set(latestEdges);
			},
			update: (updater: (edges: Edge[]) => Edge[]) => {
				const updatedEdges = updater(latestEdges);
				graphs.update((graphMap) => {
					const activeKey = get(usingSubgraph);
					if (!graphMap[activeKey]) {
						graphMap[activeKey] = { nodes: [], edges: [] };
					}
					graphMap[activeKey].edges = updatedEdges;
					return graphMap;
				});
				latestEdges = updatedEdges;
				set(latestEdges);
			}
		};
	}

	/** Export stores bound to the active subgraph */
	export const currentNodes = createCurrentNodesStore();
	export const currentEdges = createCurrentEdgesStore();
</script>
