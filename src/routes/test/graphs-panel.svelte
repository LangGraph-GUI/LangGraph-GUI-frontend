<!-- routes/graph/graphs-panel.svelte -->
<script lang="ts">
	// Destructure `usingSubgraph` from props and make it bindable
	interface Props {
		usingSubgraph: string;
	}
	let { usingSubgraph = $bindable() }: Props = $props();

	// The list of available graphs
	const options = ['root', 'dog', 'pizza'] as const;
</script>

<nav class="z-20 flex items-center justify-center p-2">
	<div class="mr-2 flex items-center rounded-md bg-white px-2 py-1">
		<span class="mr-2 font-semibold">SubGraph:</span>
		<select
			bind:value={usingSubgraph}
			class="dropdown-menu rounded bg-gray-200
             px-2 py-1 font-bold text-gray-800 hover:bg-gray-300"
		>
			{#each options as name (name)}
				<option value={name}>{name}</option>
			{/each}
		</select>
	</div>
</nav>

<style>
	.dropdown-menu {
		border: 1px solid #e2e8f0;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		appearance: none;
	}
</style>
