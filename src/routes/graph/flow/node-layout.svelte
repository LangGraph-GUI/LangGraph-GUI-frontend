<!-- routes/graph/flow/node-layout.svelte -->
<script lang="ts">
	import type { NodeProps } from '@xyflow/svelte';
	import { useSvelteFlow } from '@xyflow/svelte';
	import NodeHandles from './node-handles.svelte';

	// props injected by SvelteFlow
	let { id, data }: NodeProps = $props();
	const { updateNodeData } = useSvelteFlow();
</script>

<div class="node-layout">
	<!-- all four handles are now here -->
	<NodeHandles />

	<div>
		name:
		<input
			class="node-name nodrag"
			type="text"
			value={data.name}
			oninput={(e) => {
				const target = e.currentTarget as HTMLInputElement;
				updateNodeData(id, { name: target.value });
			}}
		/>
	</div>
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
		position: relative;
	}

	/* small circular handles still style globally */
	.node-layout :global(.react-flow__handle) {
		width: 8px;
		height: 8px;
		background: #555;
		border: none;
	}

	.node-name {
		background-color: white;
		font-size: 14px;
		width: 100%;
		box-sizing: border-box;
	}

	.nodrag {
		touch-action: none;
		user-select: text;
		cursor: text;
	}

	.node-description {
		font-size: 12px;
		color: #666;
		margin-top: 4px;
	}
</style>
