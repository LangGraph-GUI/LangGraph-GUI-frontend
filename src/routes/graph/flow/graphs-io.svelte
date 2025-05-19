<!-- routes/graph/menu/json-io.svelte -->
<script context="module" lang="ts">
	import { get } from 'svelte/store';
	import { graphs, usingSubgraph } from './graph.store.svelte';
	import type { SubGraph } from './graph.store.svelte';
	import { saveJsonToFile, loadJsonFromFile } from '$lib/io/json';
	import type { JsonNodeData } from './node-schema';
	import { SvelteNodeToJsonNode, JsonNodeToSvelteNode } from './node-schema';

	export async function saveGraphs(): Promise<void> {
		const gm = get(graphs);
		const out = Object.entries(gm).map(([name, g], idx) => ({
			name,
			serial_number: idx,
			nodes: g.nodes.map(SvelteNodeToJsonNode)
		}));
		saveJsonToFile('graphs.json', out);
	}

	/**
	 * Load that same array back, rebuild your `graphs` store,
	 * and switch to the first subgraph.
	 */
	export async function loadGraphs(): Promise<void> {
		try {
			const arr = (await loadJsonFromFile()) as Array<{
				name: string;
				serial_number: number;
				nodes: JsonNodeData[];
			}>;

			const newMap: Record<string, SubGraph> = {};
			arr.forEach((g) => {
				newMap[g.name] = {
					nodes: g.nodes.map(JsonNodeToSvelteNode),
					edges: [] // you can extend this later
				};
			});

			graphs.set(newMap);
			if (arr.length) usingSubgraph.set(arr[0].name);

			console.log('Loaded graphs:', newMap);
			alert('Graph data loaded. Check the console.');
		} catch (error) {
			console.error('Error loading graph:', error);
			alert('Failed to load graph.  Check the console for errors.');
		}
	}
</script>
