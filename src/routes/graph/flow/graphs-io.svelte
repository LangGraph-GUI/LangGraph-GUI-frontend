<!-- routes/graph/menu/graphs-io.svelte -->
<script lang="ts" module>
	import { get } from 'svelte/store';
	import { graphs, usingSubgraph } from '../flow/graphs.store.svelte';
	import { saveJsonToFile, loadJsonFromFile } from '$lib/io/json';

	import type { ExportedGraph } from './graphs-algo.svelte';
	import { GraphsToJson, JsonToGraphs } from './graphs-algo.svelte';

	export async function saveGraphs(): Promise<void> {
		const gm = get(graphs);
		const out: ExportedGraph[] = GraphsToJson(gm);
		saveJsonToFile('graphs.json', out);
	}

	export async function loadGraphs(): Promise<void> {
		try {
			const arr = (await loadJsonFromFile()) as ExportedGraph[];
			const newMap = JsonToGraphs(arr);
			graphs.set(newMap);

			if (arr.length) {
				usingSubgraph.set(arr[0].name);
			}

			console.log('Loaded graphs:', newMap);
			alert('Graphs data loaded. Check the console.');
		} catch (error) {
			console.error('Error loading graph:', error);
			alert('Failed to load graphs. Check the console for errors.');
		}
	}
</script>
