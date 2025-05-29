<!-- routes/graph/flow/flow-algo.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { useSvelteFlow } from '@xyflow/svelte';
	import { screenToFlow } from './flow-position.store';

	const { screenToFlowPosition } = useSvelteFlow();

	onMount(() => {
		screenToFlow.set(screenToFlowPosition);
	});
</script>
