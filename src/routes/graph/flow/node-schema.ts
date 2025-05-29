// routes/graph/flow/node-schema.ts

export enum NodeType {
	START = 'START',
	STEP = 'STEP',
	TOOL = 'TOOL',
	CONDITION = 'CONDITION',
	INFO = 'INFO',
	SUBGRAPH = 'SUBGRAPH'
}

export interface JsonNodeData {
	uniq_id: string;
	name: string;
	description: string;
	nexts: string[];
	type: string;
	tool: string;
	true_next: string | null;
	false_next: string | null;
	ext: {
		pos_x?: number;
		pos_y?: number;
		width?: number;
		height?: number;
	};
}

import type { Node } from '@xyflow/svelte';

export type FlowNodeData = {
	description: string;
	name: string;
	type: NodeType;
	nexts: Set<string>;
	true_next: string | null;
	false_next: string | null;
};

export type FlowNode = Node<FlowNodeData>;

export function JsonNodeToSvelteNode(json: JsonNodeData): FlowNode {
	let nodeType: NodeType;
	if (Object.values(NodeType).includes(json.type as NodeType)) {
		nodeType = json.type as NodeType;
	} else {
		nodeType = NodeType.STEP;
	}

	return {
		id: json.uniq_id,
		type: 'textNode',
		position: {
			x: json.ext.pos_x ?? 0,
			y: json.ext.pos_y ?? 0
		},
		width: json.ext.width ?? 200,
		height: json.ext.height ?? 200,
		data: {
			name: json.name,
			description: json.description,
			type: nodeType,
			nexts: new Set(json.nexts),
			true_next: json.true_next,
			false_next: json.false_next
		} as FlowNodeData
	};
}

export function SvelteNodeToJsonNode(node: FlowNode): JsonNodeData {
	const nextsSet = node.data.nexts ?? new Set<string>();
	return {
		uniq_id: node.id,
		name: node.data.name,
		description: node.data.description,
		nexts: Array.from(nextsSet),
		type: NodeType[node.data.type],
		tool: '',
		true_next: node.data.true_next,
		false_next: node.data.false_next,
		ext: {
			pos_x: node.position.x,
			pos_y: node.position.y,
			width: node.width,
			height: node.height
		}
	};
}
