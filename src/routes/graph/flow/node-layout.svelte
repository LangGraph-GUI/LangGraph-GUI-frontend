<!-- routes/graph/flow/node-layout.svelte -->
<script lang="ts">
	import type { NodeProps } from '@xyflow/svelte';
	import { useSvelteFlow } from '@xyflow/svelte';
	import NodeHandles from './node-handles.svelte';

	let { id, data }: NodeProps = $props();
	const { updateNodeData } = useSvelteFlow();
</script>

<div class="relative w-[150px] rounded-md border border-gray-300 bg-gray-200 p-2.5 text-center">
	<NodeHandles />

	<div class="mt-2">
		<label class="mb-1 block text-sm text-gray-700" for="node-name-{id}">Name:</label>
		<input
			id="node-name-{id}"
			type="text"
			class="w-full cursor-text touch-none bg-white p-1 text-sm select-text focus:outline-none"
			value={data.name}
			oninput={(e) => {
				const val = (e.currentTarget as HTMLInputElement).value;
				updateNodeData(id, { name: val });
			}}
		/>
	</div>

	<div class="mt-2 text-xs text-gray-600">
		{data.description}
	</div>
</div>
