<!-- routes/graph/+page.svelte -->
<script lang="ts">
	import { SvelteFlow, Controls, Background, MiniMap, type OnConnect } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	import MenuSidebar from './menu/sidebar.svelte';
	import MenuConfigWindow from './menu/ConfigWindow.svelte';
	import MenuRunWindow from './menu/RunWindow.svelte';
	import { openSidebar } from './menu/menu.store';
	import MenuGraphsPanel from './menu/graphs-panel.svelte';
	import MenuGraphButton from './menu/graph-button.svelte';

	import { currentNodes, currentEdges } from './flow/graphs.store.svelte';
	import NodeLayout from './flow/node-texture.svelte';
	import FlowAlgo from './flow/flow-algo.svelte';
	import { AddEdge } from './flow/graph-algo.svelte';

	// slide offset when sidebar open
	let contentOffset = $derived($openSidebar ? 200 : 0);

	const handleConnect: OnConnect = (e) => {
		if (e.sourceHandle != null) {
			AddEdge(e.source, e.sourceHandle, e.target);
		}
	};

	// custom node types
	const nodeTypes = {
		textNode: NodeLayout
	};
</script>

<MenuSidebar />
<MenuRunWindow />
<MenuConfigWindow />

<div class="content-wrapper" style="transform: translateX({contentOffset}px)">
	<div class="panel-container">
		<MenuGraphsPanel />
	</div>
	<MenuGraphButton>
		<SvelteFlow
			onconnect={handleConnect}
			bind:nodes={$currentNodes}
			edges={$currentEdges}
			{nodeTypes}
			fitView
		>
			<Controls />
			<Background />
			<MiniMap />
			<FlowAlgo />
		</SvelteFlow>
	</MenuGraphButton>
</div>

<style>
	.panel-container {
		position: absolute;
		left: calc(50% - 180px);
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
