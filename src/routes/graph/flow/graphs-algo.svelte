<!-- src/routes/graph/flow/graphs-algo.svelte -->
<script lang="ts" module>
	import { get } from 'svelte/store';
	import { graphs, usingSubgraph } from './graphs.store.svelte';

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
</script>
