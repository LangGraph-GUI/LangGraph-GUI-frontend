<!-- routes/graph/flow/node-layout.svelte -->
<script lang="ts">
	import type { NodeProps } from '@xyflow/svelte';
	import { useSvelteFlow, NodeResizer } from '@xyflow/svelte';
	import NodeHandles from './node-handles.svelte';
	import { NodeType } from './node-schema';

	let { id, data, selected, width, height }: NodeProps = $props();
	const { updateNodeData } = useSvelteFlow();

	// 1. Reactive local copy of description
	let localDescription = $state(data.description);
</script>

<div
	class="relative rounded-md border border-gray-300 bg-gray-200 p-2.5 text-center"
	style="width: {width}px; height: {height}px;"
>
	<NodeResizer minWidth={260} minHeight={280} isVisible={selected} color="rgb(255,64,0)" />

	<NodeHandles node_type={data.type} />

	<!-- NAME INPUT -->
	{#if data.type !== NodeType.START && data.type !== NodeType.TOOL}
		<div class="mt-2 flex items-center space-x-2">
			<label for="node-name-{id}" class="text-left text-sm text-gray-700"> Name: </label>
			<input
				id="node-name-{id}"
				type="text"
				class="w-full bg-white p-1 text-sm focus:outline-none"
				value={data.name}
				oninput={(e) => {
					const val = (e.currentTarget as HTMLInputElement).value;
					updateNodeData(id, { name: val });
				}}
			/>
		</div>
	{/if}

	<!-- TYPE DROPDOWN -->
	<div class="mt-2 flex items-center space-x-2">
		<label for="node-type-{id}" class="text-sm text-gray-700"> Type: </label>
		<select
			id="node-type-{id}"
			class="flex-1 bg-white p-1 text-sm focus:outline-none"
			value={data.type}
			onchange={(e) => {
				const newType = (e.currentTarget as HTMLSelectElement).value as NodeType;
				updateNodeData(id, { type: newType });
			}}
		>
			{#each Object.values(NodeType) as type (type)}
				<option value={type} selected={type === data.type}>
					{type}
				</option>
			{/each}
		</select>
	</div>

	<!-- TOOL INPUT -->
	{#if data.type === NodeType.STEP}
		<div class="mt-2 flex items-center space-x-2">
			<label for="tool-input-{id}" class="text-left text-sm text-gray-700">Tool: </label>

			<input
				id="tool-input-{id}"
				type="text"
				class="w-full cursor-text bg-white p-1 text-sm focus:outline-none"
				value={data.tool}
				oninput={(e) => {
					const val = (e.currentTarget as HTMLInputElement).value;
					updateNodeData(id, { tool: val });
				}}
			/>
		</div>
	{/if}

	<!-- DESCRIPTION -->
	{#if data.type !== NodeType.START && data.type !== NodeType.SUBGRAPH}
		<div class="mt-2 flex h-[calc(100%-120px)] min-h-0 flex-grow flex-col">
			<label for="node-description-{id}" class="mb-1 block text-left text-sm text-gray-700">
				Description:
			</label>

			<!-- 3.1 Bind locally, update only on blur -->
			<textarea
				id="node-description-{id}"
				class="h-full w-full flex-grow resize-none overflow-y-auto
               rounded border border-gray-300 bg-white p-1 text-sm
               focus:outline-none"
				bind:value={localDescription}
				onblur={() => updateNodeData(id, { description: localDescription })}
			></textarea>
		</div>
	{/if}
</div>
