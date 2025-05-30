<!-- src/routes/graph/flow/graphs-algo.svelte -->
<script lang="ts" module>
	import { get } from 'svelte/store';
	import { graphs, usingSubgraph } from './graphs.store.svelte';
	import { serial_number } from './graphs.store.svelte';
	import type { FlowNode } from './node-schema';
	import type { JsonNodeData } from './node-schema';
	import { SvelteNodeToJsonNode, JsonNodeToSvelteNode } from './node-schema';

	/**
	 * Prompt the user for a new subgraph name, create it (as an empty node list),
	 * and switch into it.
	 */
	export function addSubGraph() {
		const name = prompt('🆕 Enter a name for the new subgraph:');
		if (!name) return; // cancelled or empty

		const existing = get(graphs);
		if (existing[name]) {
			alert(`⚠️ Subgraph “${name}” already exists.`);
			return;
		}

		// add and switch
		graphs.update((g) => {
			g[name] = [];
			return g;
		});
		usingSubgraph.set(name);
	}

	/**
	 * Prompt the user for a new name for the current subgraph,
	 * and rename it (updating the key in the graphs map).
	 */
	export function renameSubGraph() {
		const current = get(usingSubgraph);
		if (current === 'root') {
			alert('⚠️ Cannot rename the root graph.');
			return;
		}

		const newName = prompt(`✏️ Rename subgraph “${current}” to:`, current);
		if (!newName || newName === current) return;

		const existing = get(graphs);
		if (existing[newName]) {
			alert(`⚠️ A subgraph named “${newName}” already exists.`);
			return;
		}

		// rename key
		graphs.update((g) => {
			g[newName] = g[current];
			delete g[current];
			return g;
		});

		usingSubgraph.set(newName);
	}

	/**
	 * Confirm with the user, then delete the current subgraph
	 * and fall back to 'root'.
	 */
	export function removeSubGraph() {
		const current = get(usingSubgraph);
		if (current === 'root') {
			alert('⚠️ Cannot remove the root graph.');
			return;
		}

		const ok = confirm(`🗑️ Are you sure you want to delete subgraph “${current}”?`);
		if (!ok) return;

		graphs.update((g) => {
			delete g[current];
			return g;
		});

		usingSubgraph.set('root');
	}

	export interface ExportedGraph {
		name: string;
		nodes: JsonNodeData[];
	}

	/**
	 * Turn your in-memory graphs store into a JSON-serializable array.
	 */
	export function GraphsToJson(graphMap: Record<string, FlowNode[]>): ExportedGraph[] {
		return Object.entries(graphMap).map(([name, nodes]) => ({
			name,
			nodes: nodes.map(SvelteNodeToJsonNode)
		}));
	}

	/**
	 * Take a loaded JSON array and:
	 * 1) Compute and bump the serial_number store so future nodes get fresh IDs
	 * 2) Build a new map of FlowNode[] for setting back into your store
	 */
	export function JsonToGraphs(arr: ExportedGraph[]): Record<string, FlowNode[]> {
		// find the highest existing uniq_id in the imported JSON
		let nextId = 1;
		for (const { nodes } of arr) {
			for (const n of nodes) {
				const num = parseInt(n.uniq_id, 10);
				if (!isNaN(num) && num >= nextId) nextId = num + 1;
			}
		}
		// bump the global serial_number store
		serial_number.set(nextId);

		// convert JSON nodes back to FlowNode instances
		const map: Record<string, FlowNode[]> = {};
		for (const { name, nodes } of arr) {
			map[name] = nodes.map(JsonNodeToSvelteNode);
		}
		return map;
	}
</script>
