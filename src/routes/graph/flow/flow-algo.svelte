<!-- routes/graph/flow/flow-algo.svelte -->
<script lang="ts">
	import { useSvelteFlow } from '@xyflow/svelte';

	// Get SvelteFlow context - this must be in regular script, not module script
	const { screenToFlowPosition } = useSvelteFlow();

	// Function to convert screen coordinates to flow coordinates
	export function getFlowPosition(screen_x: number, screen_y: number) {
		return screenToFlowPosition({ x: screen_x, y: screen_y });
	}
</script>
