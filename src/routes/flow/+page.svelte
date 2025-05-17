<!-- routes/flow/+page.svelte -->
<script lang="ts">
	import { SvelteFlow, Controls, Background, MiniMap } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	// Import the stores
	import { usingSubgraph, currentNodes, currentEdges } from './GraphStore.svelte';

	// Toggle between subgraphs, e.g., on a button click
	function switchTo(key: string) {
		usingSubgraph.set(key);
	}
</script>

<div style="height: calc(100vh - 50px);">
	<SvelteFlow bind:nodes={$currentNodes} bind:edges={$currentEdges} fitView>
		<Controls />
		<Background />
		<MiniMap />
	</SvelteFlow>
</div>

<button on:click={() => switchTo('default')}> Default Graph </button>
<button on:click={() => switchTo('anotherKey')}> Another Graph </button>
