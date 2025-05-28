// routes/graph/flow/graphs.store.svelte.ts
import { writable, derived, get } from 'svelte/store';
import { SvelteMap } from 'svelte/reactivity';
import type { FlowNode } from './node-schema';

/** The single source of truth for all graphs */
export const graphs = writable<Record<string, FlowNode[]>>({});

export const serial_numbers = new SvelteMap<string, number>();

/** Which subgraph key is currently active */
export const usingSubgraph = writable<string>('root');

/** Read/write store for the active graph's nodes */
export const currentNodes = (() => {
	// a derived slice of graphs[usingSubgraph]
	const slice = derived([graphs, usingSubgraph], ([$graphs, $using]) => $graphs[$using] ?? []);

	return {
		subscribe: slice.subscribe,
		set(newNodes: FlowNode[]) {
			const key = get(usingSubgraph);
			graphs.update((gmap) => {
				if (!gmap[key]) gmap[key] = [];
				gmap[key] = newNodes;
				return gmap;
			});
		},
		update(fn: (nodes: FlowNode[]) => FlowNode[]) {
			const key = get(usingSubgraph);
			graphs.update((gmap) => {
				if (!gmap[key]) gmap[key] = [];
				gmap[key] = fn(gmap[key]);
				return gmap;
			});
		}
	};
})();
