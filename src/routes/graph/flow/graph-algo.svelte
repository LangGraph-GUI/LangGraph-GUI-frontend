<!-- routes/graph/flow/graph-algo.svelte -->
<script lang="ts" module>
	import { currentNodes } from './graphs.store.svelte';
	import type { FlowNode } from './node-schema';

	/**
	 * Add an outgoing edge from one node to another.
	 *
	 * @param source       the id of the source node
	 * @param sourceHandle one of 'next' | 'true' | 'false'
	 * @param target       the id of the target node
	 */
	export function CreateEdge(source: string, sourceHandle: string, target: string): void {
		currentNodes.update((nodes: FlowNode[]) => {
			return nodes.map((node) => {
				if (node.id !== source) return node;

				// clone the node so Svelte sees a change
				const updated = { ...node, data: { ...node.data } };

				if (sourceHandle === 'next') {
					const nexts = new Set(updated.data.nexts);
					nexts.add(target);
					updated.data.nexts = nexts;
				} else if (sourceHandle === 'true') {
					updated.data.true_next = target;
				} else if (sourceHandle === 'false') {
					updated.data.false_next = target;
				}

				return updated;
			});
		});
	}
</script>
