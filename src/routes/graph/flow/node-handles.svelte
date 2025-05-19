<!-- src/routes/graph/flow/node-handles.svelte -->
<script lang="ts">
	import { Handle, Position } from '@xyflow/svelte';
</script>

<!-- target on left -->
<Handle
	id="left"
	type="target"
	position={Position.Left}
	style="left: -4px; top: calc(50% - 4px);"
/>

<!-- source on top -->
<Handle id="top" type="source" position={Position.Top} style="top: -4px; left: calc(50% - 4px);" />

<!-- source on right -->
<Handle
	id="right"
	type="source"
	position={Position.Right}
	style="right: -4px; top: calc(50% - 4px);"
/>

<!-- source on bottom -->
<Handle
	id="bottom"
	type="source"
	position={Position.Bottom}
	style="bottom: -4px; left: calc(50% - 4px);"
/>
