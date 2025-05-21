<!-- routes/graph/flow/control.svelte -->
<script lang="ts">
	// pull in the snippet function instead of using <slot/>
	let { children } = $props(); // Svelte 5: slots → snippets :contentReference[oaicite:1]{index=1}

	// reactive count & menu state
	let count = $state(0);
	let menu = $state({ show: false, x: 0, y: 0 });

	function handleContextMenu(event: MouseEvent) {
		event.preventDefault();
		menu = { show: true, x: event.clientX, y: event.clientY };
	}

	function addOne() {
		count += 1;
		console.log('TEST clicked – count is now', count);
		menu = { ...menu, show: false };
	}
</script>

<div class="canvas-container" role="application" oncontextmenu={handleContextMenu}>
	{@render children()}

	{#if menu.show}
		<div class="context-menu" role="menu" style="top: {menu.y}px; left: {menu.x}px;">
			<button type="button" role="menuitem" onclick={addOne}> TEST </button>
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
