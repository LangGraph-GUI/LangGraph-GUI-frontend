<!-- routes/graph/+page.svelte -->
<script lang="ts">
	import { SvelteFlow, Controls, Background, MiniMap } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	import Sidebar from './menu/sidebar.svelte';
	import GraphsPanel from './menu/graphs-panel.svelte';
	import GraphButton from './menu/graph-button.svelte';
	import { currentNodes } from './flow/graphs.store.svelte';
	import NodeLayout from './flow/node-layout.svelte';
	import FlowAlgo from './flow/flow-algo.svelte';

	// sidebar toggle
	let menuOpen = $state(false);
	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	// slide offset when sidebar open
	let contentOffset = $derived(menuOpen ? 200 : 0);

	// custom node types
	const nodeTypes = {
		textNode: NodeLayout
	};
</script>

<Sidebar open={menuOpen} onToggle={toggleMenu} />

<div class="content-wrapper" style="transform: translateX({contentOffset}px)">
	<div class="panel-container">
		<GraphsPanel />
	</div>
	<GraphButton>
		<SvelteFlow bind:nodes={$currentNodes} {nodeTypes} fitView>
			<Controls />
			<Background />
			<MiniMap />
			<FlowAlgo />
		</SvelteFlow>
	</GraphButton>
</div>

<style>
	.panel-container {
		position: absolute;
		left: calc(50% - 200px);
		z-index: 10;
	}
	.content-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: calc(100vh - 20px);
		transition: transform 0.3s ease;
	}
</style>
