<!-- routes/graph/flow/graph-algo.svelte -->
<script lang="ts" module>
	import { get } from 'svelte/store';
	import { serial_number, currentNodes } from './graphs.store.svelte';
	import type { FlowNode } from './node-schema';
	import { screenToFlow } from '../flow/flow-position.store';
	import { NodeType } from './node-schema';

	/**
	 * Add an outgoing edge from one node to another.
	 *
	 * @param source       the id of the source node
	 * @param sourceHandle one of 'next' | 'true' | 'false'
	 * @param target       the id of the target node
	 */
	export function AddEdge(source: string, sourceHandle: string, target: string): void {
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

	export function AddNode(screen_x: number, screen_y: number): void {
		// This will never be null—at worst it's our fallback that returns {0,0}
		const ScreenToFlow = get(screenToFlow);
		const { x, y } = ScreenToFlow({ x: screen_x, y: screen_y });

		const serial = get(serial_number);

		const newNode: FlowNode = {
			id: String(serial),
			type: 'textNode',
			data: {
				name: 'Node' + String(serial),
				description: 'Enter description here',
				type: NodeType.STEP,
				nexts: new Set<string>(),
				true_next: null,
				false_next: null
			},
			position: { x, y },
			width: 280,
			height: 280
		};

		serial_number.set(serial + 1);
		currentNodes.update((nodes) => [...nodes, newNode]);
	}

	export function RemoveNode(nodeId: string): void {
		currentNodes.update((nodes) => nodes.filter((n) => n.id !== nodeId));
	}

	export function RemoveEdge(sourceHandle: string | null, source: string, target: string): void {
		currentNodes.update((nodes) =>
			nodes.map((node) => {
				if (node.id !== source) return node;

				// clone so Svelte sees the update
				const updated: FlowNode = {
					...node,
					data: { ...node.data, nexts: new Set(node.data.nexts) }
				};

				if (sourceHandle === null) {
					// remove from the Set<string>
					updated.data.nexts.delete(target);
				} else if (sourceHandle === 'true') {
					updated.data.true_next = null;
				} else if (sourceHandle === 'false') {
					updated.data.false_next = null;
				}

				return updated;
			})
		);
	}

	export function NodeVerify(allNodes: FlowNode[]): FlowNode[] {
		// Build a map from node-id → FlowNode, so we can look up types of any referenced node
		const idToNode = new Map<string, FlowNode>();
		for (const n of allNodes) {
			idToNode.set(n.id, n);
		}

		return allNodes.map((orig) => {
			// Clone the node object (and its data) so we don't mutate the original
			const updated: FlowNode = {
				...orig,
				data: {
					...orig.data,
					// we'll rebuild nexts/true_next/false_next below
					nexts: new Set(orig.data.nexts),
					true_next: orig.data.true_next,
					false_next: orig.data.false_next
				}
			};

			const nodeType = updated.data.type;

			// 1. If this is a CONDITION node, we must clear nexts entirely.
			if (nodeType === NodeType.CONDITION) {
				updated.data.nexts = new Set();
			} else {
				// 2. If NOT a CONDITION, forcibly null out true/false branches
				updated.data.true_next = null;
				updated.data.false_next = null;
			}

			// 3. If this is a TOOL node, also clear everything (nexts + branches)
			if (nodeType === NodeType.TOOL) {
				updated.data.nexts = new Set();
				updated.data.true_next = null;
				updated.data.false_next = null;
			}

			// 4. Now remove any pointers whose target node is of type TOOL or START
			//    – for “nexts” (Set<string>):
			const cleanedNexts = new Set<string>();
			for (const nextId of updated.data.nexts) {
				const target = idToNode.get(nextId);
				if (!target) continue; // skip if no such node
				const tType = target.data.type;
				// only keep if tType is NOT TOOL or START
				if (tType !== NodeType.TOOL && tType !== NodeType.START) {
					cleanedNexts.add(nextId);
				}
			}
			updated.data.nexts = cleanedNexts;

			//    – for true_next:
			if (updated.data.true_next) {
				const trueTarget = idToNode.get(updated.data.true_next);
				if (
					!trueTarget ||
					trueTarget.data.type === NodeType.TOOL ||
					trueTarget.data.type === NodeType.START
				) {
					updated.data.true_next = null;
				}
			}

			//    – for false_next:
			if (updated.data.false_next) {
				const falseTarget = idToNode.get(updated.data.false_next);
				if (
					!falseTarget ||
					falseTarget.data.type === NodeType.TOOL ||
					falseTarget.data.type === NodeType.START
				) {
					updated.data.false_next = null;
				}
			}

			return updated;
		});
	}
</script>
