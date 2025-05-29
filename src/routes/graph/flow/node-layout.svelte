<!-- routes/graph/flow/node-layout.svelte -->
<script lang="ts">
	import type { NodeProps } from '@xyflow/svelte';
	import { useSvelteFlow, NodeResizer } from '@xyflow/svelte';
	import NodeHandles from './node-handles.svelte';
	import { NodeType } from './node-schema';

	let { id, data, selected, width, height }: NodeProps = $props();
	const { updateNodeData } = useSvelteFlow();
</script>

<div
	class="relative rounded-md border border-gray-300 bg-gray-200 p-2.5 text-center"
	style="width: {width}px; height: {height}px;"
>
	<NodeResizer minWidth={150} minHeight={100} isVisible={selected} color="rgb(255,64,0)" />
	<NodeHandles />

	<!-- TYPE DROPDOWN -->
	<div class="mt-2">
		<label class="mb-1 block text-sm text-gray-700" for="node-type-{id}"> Type: </label>
		<select
			id="node-type-{id}"
			class="w-full bg-white p-1 text-sm focus:outline-none"
			value={data.type}
			onchange={(e) => {
				const newType = (e.currentTarget as HTMLSelectElement).value as NodeType;
				updateNodeData(id, { type: newType });
			}}
		>
			{#each Object.values(NodeType) as type}
				<option value={type} selected={type === data.type}>
					{type}
				</option>
			{/each}
		</select>
	</div>

	<!-- NAME INPUT -->
	<div class="mt-2">
		<label class="mb-1 block text-sm text-gray-700" for="node-name-{id}"> Name: </label>
		<input
			id="node-name-{id}"
			type="text"
			class="w-full cursor-text bg-white p-1 text-sm focus:outline-none"
			value={data.name}
			oninput={(e) => {
				const val = (e.currentTarget as HTMLInputElement).value;
				updateNodeData(id, { name: val });
			}}
		/>
	</div>

	<!-- DESCRIPTION -->
	<div class="mt-2 text-xs text-gray-600">
		{data.description}
	</div>
</div>
