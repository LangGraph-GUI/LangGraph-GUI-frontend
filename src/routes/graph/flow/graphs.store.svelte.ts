// routes/graph/flow/graphs.store.svelte.ts

import { writable, derived, get } from 'svelte/store';
import { SvelteMap } from 'svelte/reactivity';

import type { Edge } from '@xyflow/svelte';
import type { Writable } from 'svelte/store';
import type { FlowNode } from './node-schema';

/** A graph consists of nodes and edges */
export type SubGraph = { nodes: FlowNode[]; edges: Edge[] };

/** The single source of truth for all graphs */
export const graphs = writable<Record<string, SubGraph>>({});

export const serial_numbers = new SvelteMap<string, number>();

/** Which subgraph key is currently active */
export const usingSubgraph = writable<string>('root');

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
