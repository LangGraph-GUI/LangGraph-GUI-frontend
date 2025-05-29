<!-- routes/graph/flow/node-handles.svelte -->
<script lang="ts">
	import { Handle, Position } from '@xyflow/svelte';
	import { NodeType } from './node-schema';

	let { node_type = $bindable() } = $props();
	let is_start = $derived(node_type !== NodeType.START);
	let is_condition = $derived(node_type === NodeType.CONDITION);
	let not_condition = $derived(!is_condition);
</script>

<!-- Target handle on left - show for all except START -->
<Handle
	id="in"
	type="target"
	isConnectable={is_start}
	position={Position.Left}
	style="visibility: {is_start ? 'visible' : 'hidden'};
		left: -4px; top: calc(50% - 4px); width:8px; height:8px; "
/>

<!-- Source handle on right - show for all except CONDITION -->
<Handle
	id="next"
	type="source"
	isConnectable={not_condition}
	position={Position.Right}
	style="visibility: {not_condition ? 'visible' : 'hidden'};
		right: -4px; top: calc(50% - 4px); width:8px; height:8px; "
/>

<!-- Source handle true/false - show only for CONDITION -->
<Handle
	id="true"
	type="source"
	isConnectable={is_condition}
	position={Position.Top}
	style="visibility: {is_condition ? 'visible' : 'hidden'}; 
		top: -4px; left: calc(50% - 4px); width:8px; height:8px; background: green;"
/>
<Handle
	id="false"
	type="source"
	isConnectable={is_condition}
	position={Position.Bottom}
	style="visibility: {is_condition ? 'visible' : 'hidden'}; 
		bottom: -4px; left: calc(50% - 4px); width:8px; height:8px; background: red;"
/>
