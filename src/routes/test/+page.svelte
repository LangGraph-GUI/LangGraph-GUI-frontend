<!-- routes/graph/+page.svelte -->

<script lang="ts">
	import { SvelteMap } from 'svelte/reactivity';
	import { SvelteFlow, Controls, Background, MiniMap, type Node } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';
	import GraphsPanel from './graphs-panel.svelte';

	let graphs = new SvelteMap<string, Node[]>();
	function randomNodes(count = 3): Node[] {
		const rnd = (max: number) => Math.floor(Math.random() * max);
		return Array.from({ length: count }).map((_, i) => ({
			id: `node-${i}-${Date.now()}`,
			position: { x: rnd(400), y: rnd(400) },
			data: { text: `Item ${rnd(100)}` }
		}));
	}
	graphs.set('root', randomNodes(4));
	graphs.set('dog', randomNodes(6));
	graphs.set('pizza', randomNodes(5));

	let usingSubgraph = $state('root');
	let usingNodes = $derived(graphs.get(usingSubgraph) ?? []);
</script>

<div class="content-wrapper">
	<div class="panel-container">
		<GraphsPanel bind:usingSubgraph />
	</div>

	<SvelteFlow
		bind:nodes={usingNodes}
		onnodedragstop={() => {
			graphs.set(usingSubgraph, usingNodes);
		}}
		fitView
	>
		<Controls />
		<Background />
		<MiniMap />
	</SvelteFlow>
</div>

<style>
	.panel-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
	}
	.content-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: calc(100vh - 50px);
		transition: transform 0.3s ease;
	}
</style>
