<!-- routes/graph/flow/control.svelte -->
<script lang="ts">
	// get child content via snippet
	let { children } = $props();

	// reactive counter
	let count = $state(0);

	// track menu position, whether it was a node, and its id
	let menu = $state<{
		show: boolean;
		x: number;
		y: number;
		isNode: boolean;
		nodeId: string | null;
	}>({
		show: false,
		x: 0,
		y: 0,
		isNode: false,
		nodeId: null
	});

	function handleContextMenu(event: MouseEvent) {
		event.preventDefault();

		// detect node via data-id attribute
		const el = (event.target as HTMLElement).closest('[data-id]');
		menu = {
			show: true,
			x: event.clientX,
			y: event.clientY,
			isNode: !!el,
			nodeId: el?.getAttribute('data-id') ?? null
		};
	}

	function onTest() {
		if (menu.isNode && menu.nodeId) {
			count -= 1;
			console.log(`TEST clicked on node ${menu.nodeId} → count is now ${count}`);
		} else {
			count += 1;
			console.log(`TEST clicked on canvas → count is now ${count}`);
		}
		menu = { ...menu, show: false };
	}
</script>

<div class="canvas-container" role="application" oncontextmenu={handleContextMenu}>
	{@render children()}

	{#if menu.show}
		<div class="context-menu" role="menu" style="top: {menu.y}px; left: {menu.x}px;">
			<button type="button" role="menuitem" onclick={onTest}> TEST </button>
		</div>
	{/if}
</div>

<style>
	.canvas-container {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.context-menu {
		position: absolute;
		background: white;
		border: 1px solid #888;
		padding: 0.5em;
		z-index: 10;
	}
</style>
