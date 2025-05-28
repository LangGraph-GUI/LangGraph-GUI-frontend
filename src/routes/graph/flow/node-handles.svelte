<!-- routes/graph/flow/node-handles.svelte -->
<script lang="ts">
	import { Handle, Position } from '@xyflow/svelte';
</script>

<!-- target on left -->
<Handle id="in" type="target" position={Position.Left} style="left: -4px; top: calc(50% - 4px);" />

<!-- source on right -->
<Handle
	id="next"
	type="source"
	position={Position.Right}
	style="right: -4px; top: calc(50% - 4px);"
/>

<!-- source on top -->
<Handle
	id="true"
	type="source"
	position={Position.Top}
	style="background: green; top: -4px; left: calc(50% - 4px);"
/>

<!-- source on bottom -->
<Handle
	id="false"
	type="source"
	position={Position.Bottom}
	style="background: red; bottom: -4px; left: calc(50% - 4px);"
/>
