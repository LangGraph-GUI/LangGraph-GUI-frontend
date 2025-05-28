<!-- routes/graph/menu/graphs-io.svelte -->
<script lang="ts" module>
	import { get } from 'svelte/store';
	import { graphs, usingSubgraph, serial_number } from '../flow/graphs.store.svelte';
	import { saveJsonToFile, loadJsonFromFile } from '$lib/io/json';
	import type { JsonNodeData, FlowNode } from '../flow/node-schema';
	import { SvelteNodeToJsonNode, JsonNodeToSvelteNode } from '../flow/node-schema';

	interface ExportedGraph {
		name: string;
		nodes: JsonNodeData[];
	}

	export async function saveGraphs(): Promise<void> {
		const gm = get(graphs);
		const out: ExportedGraph[] = Object.entries(gm).map(([name, nodes]) => ({
			name,
			nodes: nodes.map(SvelteNodeToJsonNode)
		}));

		saveJsonToFile('graphs.json', out);
	}

	export async function loadGraphs(): Promise<void> {
		try {
			const arr = (await loadJsonFromFile()) as Array<{
				name: string;
				nodes: JsonNodeData[];
			}>;

			const newMap: Record<string, FlowNode[]> = {};

			let nextId = 1;
			arr.forEach((g) =>
				g.nodes.forEach((n) => {
					const num = parseInt(n.uniq_id, 10);
					if (!isNaN(num) && num >= nextId) nextId = num + 1;
				})
			);
			serial_number.set(nextId);

			arr.forEach((g) => {
				newMap[g.name] = g.nodes.map(JsonNodeToSvelteNode);
			});

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
