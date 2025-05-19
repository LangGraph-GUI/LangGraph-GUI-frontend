<!-- src/routes/graph/flow/node-layout.svelte -->

<script lang="ts">
	import type { NodeProps } from '@xyflow/svelte';

	// Access node properties through NodeProps
	let { data }: NodeProps = $props(); // We do not need id or others
</script>

<div class="node-layout">
	<div class="node-label">
		{data.name}
	</div>
	<!-- You can add more content here, like the label or other data -->
	<div class="node-label">
		{data.label}
	</div>
</div>

<style>
	.node-layout {
		background-color: #f0f0f0;
		border: 1px solid #ccc;
		padding: 10px;
		border-radius: 5px;
		text-align: center;
	}

	.node-label {
		font-size: 14px;
		font-weight: bold;
		margin-bottom: 5px;
	}
</style>
