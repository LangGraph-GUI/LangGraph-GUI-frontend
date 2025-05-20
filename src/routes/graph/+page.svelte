<!-- src/routes/graph/+page.svelte -->
<script lang="ts">
	import { SvelteFlow, Controls, Background, MiniMap } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	import Sidebar from './menu/sidebar.svelte';
	import GraphPanel from './flow/graph-panel.svelte';
	import { currentNodes, currentEdges } from './flow/graph.store.svelte';
	import NodeLayout from './flow/node-layout.svelte';

	// Local state for sidebar visibility
	let menuOpen = $state(false);
	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	// Optional: slide the graph over when the menu is open
	let contentOffset = $derived(menuOpen ? 200 : 0);

	// Register the custom node type
	const nodeTypes = {
		textNode: NodeLayout
	};
</script>

<!-- Use correct prop binding syntax: propName={value} -->
<Sidebar open={menuOpen} onToggle={toggleMenu} />

<div class="content-wrapper" style="transform: translateX({contentOffset}px)">
	<GraphPanel />
	<SvelteFlow bind:nodes={$currentNodes} bind:edges={$currentEdges} {nodeTypes} fitView>
		<Controls />
		<Background />
		<MiniMap />
	</SvelteFlow>
</div>

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
