<!-- routes/graph/flow/node-handles.svelte -->
<script lang="ts">
	import { Handle, Position } from '@xyflow/svelte';
	import { NodeType } from './node-schema';

	let { node_type = $bindable() } = $props();
	let is_start = $derived(node_type === NodeType.START);
	let is_condition = $derived(node_type === NodeType.CONDITION);
	let is_tool = $derived(node_type === NodeType.TOOL);
</script>

<!-- Target handle on left - show for all except START -->
<Handle
	id="in"
	type="target"
	isConnectable={!is_start && !is_tool}
	position={Position.Left}
	style="visibility: {!is_start && !is_tool ? 'visible' : 'hidden'};
		left: -4px; top: calc(50% - 4px); width:8px; height:8px; "
/>

<!-- Source handle on right - show for all except CONDITION -->
<Handle
	id="next"
	type="source"
	isConnectable={!is_condition && !is_tool}
	position={Position.Right}
	style="visibility: {!is_condition && !is_tool ? 'visible' : 'hidden'};
		right: -4px; top: calc(50% - 4px); width:8px; height:8px; "
/>

<!-- Source handle true/false - show only for CONDITION -->
<Handle
	id="true"
	type="source"
	isConnectable={is_condition}
	position={Position.Right}
	style="visibility: {is_condition ? 'visible' : 'hidden'}; 
		right: -4px; top: 25%; width:8px; height:8px; background: green;"
/>
<Handle
	id="false"
	type="source"
	isConnectable={is_condition}
	position={Position.Right}
	style="visibility: {is_condition ? 'visible' : 'hidden'}; 
		right: -4px; top: 75%; width:8px; height:8px; background: red;"
/>
