<!-- src/routes/graph/flow/node-layout.svelte -->

<script lang="ts">
	import type { NodeProps } from '@xyflow/svelte';
	import { useSvelteFlow } from '@xyflow/svelte';

	let { id, data }: NodeProps = $props();
	const { updateNodeData } = useSvelteFlow();
</script>

<div class="node-layout">
	<!-- editable name via `oninput` -->
	name:
	<input
		class="node-name nodrag"
		type="text"
		value={data.name}
		oninput={(e) => {
			// currentTarget is typed correctly in runes mode
			const target = e.currentTarget as HTMLInputElement;
			updateNodeData(id, { name: target.value });
		}}
	/>

	<div class="node-description">
		{data.description}
	</div>
</div>

<style>
	.node-layout {
		background-color: #f0f0f0;
		border: 1px solid #ccc;
		padding: 10px;
		border-radius: 5px;
		text-align: center;
		width: 150px;
	}

	.node-name {
		background-color: white;
		font-size: 14px;
		width: 100%;
		box-sizing: border-box;
	}

	.node-description {
		font-size: 12px;
		color: #666;
	}

	.nodrag {
		touch-action: none;
		user-select: text;
		cursor: text;
	}
</style>
