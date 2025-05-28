<!-- routes/graph/menu/graphs-io.svelte -->
<script lang="ts" module>
	import { get } from 'svelte/store';
	import { graphs, usingSubgraph, serial_numbers } from '../flow/graphs.store.svelte';
	import { saveJsonToFile, loadJsonFromFile } from '$lib/io/json';
	import type { JsonNodeData, FlowNode } from '../flow/node-schema';
	import { SvelteNodeToJsonNode, JsonNodeToSvelteNode } from '../flow/node-schema';

	interface ExportedGraph {
		name: string;
		nodes: JsonNodeData[];
		serial: number;
	}

	export async function saveGraphs(): Promise<void> {
		const gm = get(graphs);

		const serialMap = Array.from(serial_numbers.entries()).reduce<Record<string, number>>(
			(acc, [name, sn]) => {
				acc[name] = sn;
				return acc;
			},
			{}
		);

		const out: ExportedGraph[] = Object.entries(gm).map(([name, nodes]) => ({
			name,
			nodes: nodes.map(SvelteNodeToJsonNode),
			serial: serialMap[name] ?? 0
		}));

		saveJsonToFile('graphs.json', out);
	}

	export async function loadGraphs(): Promise<void> {
		try {
			const arr = (await loadJsonFromFile()) as Array<{
				name: string;
				nodes: JsonNodeData[];
				serial?: number;
			}>;

			const newMap: Record<string, FlowNode[]> = {};
			serial_numbers.clear();

			arr.forEach((g) => {
				newMap[g.name] = g.nodes.map(JsonNodeToSvelteNode);
				serial_numbers.set(g.name, g.serial ?? 1);
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
