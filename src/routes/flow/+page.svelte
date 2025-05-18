<!-- src/routes/flow/+page.svelte -->
<script lang="ts">
	import { SvelteFlow, Controls, Background, MiniMap } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	import Sidebar from './menu/sidebar.svelte';
	import { usingSubgraph, currentNodes, currentEdges } from './graph-store.svelte';

	// Local state for sidebar visibility
	let menuOpen = false;
	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	// Optional: slide the graph over when the menu is open
	$: contentOffset = menuOpen ? 200 : 0;
</script>

<!-- Use correct prop binding syntax: propName={value} -->
<Sidebar open={menuOpen} onToggle={toggleMenu} />

<div class="content-wrapper" style="transform: translateX({contentOffset}px)">
	<SvelteFlow bind:nodes={$currentNodes} bind:edges={$currentEdges} fitView>
		<Controls />
		<Background />
		<MiniMap />
	</SvelteFlow>
</div>

<button on:click={() => usingSubgraph.set('default')}> Default Graph </button>
<button on:click={() => usingSubgraph.set('anotherKey')}> Another Graph </button>

<style>
	.content-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: calc(100vh - 50px);
		transition: transform 0.3s ease;
	}
</style>
