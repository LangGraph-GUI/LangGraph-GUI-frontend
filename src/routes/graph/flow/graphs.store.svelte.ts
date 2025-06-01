// routes/graph/flow/graphs.store.svelte.ts
import { writable, derived, get } from 'svelte/store';
import type { Edge } from '@xyflow/svelte';
import type { FlowNode } from './node-schema';
import { NodeVerify } from './graph-algo.svelte';

// The single source of truth for all graphs
export const graphs = writable<Record<string, FlowNode[]>>({ root: [] });
export const usingSubgraph = writable<string>('root');
export const serial_number = writable<number>(1);

export const currentNodes = (() => {
	const slice = derived([graphs, usingSubgraph], ([$graphs, $using]) => $graphs[$using] ?? []);

	return {
		subscribe: slice.subscribe,
		set(newNodes: FlowNode[]) {
			const key = get(usingSubgraph);
			graphs.update((gmap) => {
				if (!gmap[key]) gmap[key] = [];
				gmap[key] = NodeVerify(newNodes);
				return gmap;
			});
		},
		update(fn: (nodes: FlowNode[]) => FlowNode[]) {
			const key = get(usingSubgraph);
			graphs.update((gmap) => {
				if (!gmap[key]) gmap[key] = [];
				gmap[key] = NodeVerify(fn(gmap[key]));
				return gmap;
			});
		}
	};
})();

// derive edges from nodes
export const currentEdges = derived(currentNodes, ($nodes): Edge[] => {
	const edges: Edge[] = [];

	for (const node of $nodes) {
		// default to an empty Set if undefined
		const nextsSet = node.data.nexts ?? new Set<string>();

		// for…of is fine on a Set
		for (const nextId of nextsSet) {
			edges.push({
				id: `xy-edge-${node.id}→${nextId}`,
				source: node.id,
				target: nextId,
				style: 'stroke-width: 4px;'
			});
		}

		// boolean branches, if you want them:
		if (node.data.true_next) {
			edges.push({
				id: `xy-edge-${node.id}-true→${node.data.true_next}`,
				source: node.id,
				sourceHandle: 'true',
				target: node.data.true_next,
				style: 'stroke-width: 4px; stroke: green; '
			});
		}
		if (node.data.false_next) {
			edges.push({
				id: `xy-edge-${node.id}-false→${node.data.false_next}`,
				source: node.id,
				sourceHandle: 'false',
				target: node.data.false_next,
				style: 'stroke-width: 4px; stroke: red;'
			});
		}
	}

	return edges;
});
