// JsonUtils.js

import NodeData from './Graph/NodeData';
import { createEdge } from './Graph/Edge';
import { createConditionEdge } from './Graph/ConditionEdge';

export const saveJson = async (nodes, nodeIdCounter) => {
  const nodesData = nodes.map((node) => NodeData.fromReactFlowNode(node));

  const flowData = {
    nodes: nodesData.map((node) => node.toDict()),
    node_counter: nodeIdCounter,
  };

  const blob = new Blob([JSON.stringify(flowData, null, 2)], { type: 'application/json' });
  const fileHandle = await window.showSaveFilePicker({
    suggestedName: 'flow.json',
    types: [
      {
        description: 'JSON Files',
        accept: { 'application/json': ['.json'] },
      },
    ],
  });
  const writable = await fileHandle.createWritable();
  await writable.write(blob);
  await writable.close();
  alert('Flow saved!');
};

export const loadJson = async (setEdges, setNodes, setNodeIdCounter) => {
  const [fileHandle] = await window.showOpenFilePicker({
    types: [
      {
        description: 'JSON Files',
        accept: { 'application/json': ['.json'] },
      },
    ],
    multiple: false,
  });
  const file = await fileHandle.getFile();
  const contents = await file.text();
  const flowData = JSON.parse(contents);

  const loadedNodes = (flowData.nodes || []).map((nodeData) => NodeData.fromDict(nodeData).toReactFlowNode());

  // First, set the nodes
  setNodes(loadedNodes);

  // Then, create edges
  const loadedEdges = [];
  loadedNodes.forEach((node) => {
    node.data.nexts.forEach((nextId) => {
      const newEdge = createEdge(loadedEdges, setEdges, { source: node.id, target: nextId }, loadedNodes, setNodes);
      if (newEdge) {
        loadedEdges.push(newEdge);
      }
    });
    if (node.data.true_next) {
      const newEdge = createConditionEdge(loadedEdges, setEdges, { source: node.id, target: node.data.true_next, sourceHandle: 'true' }, loadedNodes, setNodes);
      if (newEdge) {
        loadedEdges.push(newEdge);
      }
    }
    if (node.data.false_next) {
      const newEdge = createConditionEdge(loadedEdges, setEdges, { source: node.id, target: node.data.false_next, sourceHandle: 'false' }, loadedNodes, setNodes);
      if (newEdge) {
        loadedEdges.push(newEdge);
      }
    }
  });

  setEdges(loadedEdges);

  // Set node counter
  setNodeIdCounter(flowData.node_counter || 1);
};
