<!-- routes/graph/flow/node-handles.svelte -->
<script lang="ts">
	import { Handle, Position } from '@xyflow/svelte';
	import { NodeType } from './node-schema';

	let { node_type = $bindable() } = $props();
</script>

<!-- Target handle on left - show for all except START -->
{#if node_type !== NodeType.START}
	<Handle
		id="in"
		type="target"
		position={Position.Left}
		style="left: -4px; top: calc(50% - 4px); width:8px; height:8px;"
	/>
{/if}

<!-- Source handle on right - show for all except CONDITION -->
{#if node_type !== NodeType.CONDITION}
	<Handle
		id="next"
		type="source"
		position={Position.Right}
		style="right: -4px; top: calc(50% - 4px); width:8px; height:8px;"
	/>
{/if}

<!-- Source handle true/false - show only for CONDITION -->
{#if node_type === NodeType.CONDITION}
	<Handle
		id="true"
		type="source"
		position={Position.Top}
		style="background: green; top: -4px; left: calc(50% - 4px); width:8px; height:8px;"
	/>
	<Handle
		id="false"
		type="source"
		position={Position.Bottom}
		style="background: red; bottom: -4px; left: calc(50% - 4px); width:8px; height:8px;"
	/>
{/if}
