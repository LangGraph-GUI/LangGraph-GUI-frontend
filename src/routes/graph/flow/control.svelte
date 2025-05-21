<script lang="ts">
	// Svelte 5 rune syntax for reactive state
	let count = $state(0);
	let menu = $state({ show: false, x: 0, y: 0 });

	function handleContextMenu(event: MouseEvent) {
		event.preventDefault();
		menu = { show: true, x: event.clientX, y: event.clientY };
	}

	function addOne() {
		count += 1;
		console.log('TEST clicked – count is now', count);
		// hide menu after click
		menu = { ...menu, show: false };
	}
</script>

<!-- 
  1. ARIA role to satisfy a11y_no_static_element_interactions 
     :contentReference[oaicite:0]{index=0}
  2. use `oncontextmenu` instead of deprecated `on:contextmenu` 
     :contentReference[oaicite:1]{index=1}
-->
<div class="canvas-container" role="application" oncontextmenu={handleContextMenu}>
	<!-- render whatever you wrap this around -->
	<slot />

	{#if menu.show}
		<div class="context-menu" role="menu" style="top: {menu.y}px; left: {menu.x}px;">
			<!-- use onclick instead of on:click to silence event_directive_deprecated :contentReference[oaicite:2]{index=2} -->
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
