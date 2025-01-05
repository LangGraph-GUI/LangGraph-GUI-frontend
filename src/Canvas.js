// Canvas.js

import React, { useState, useCallback, useEffect, useRef } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useEdgesState, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import Node, { addNode, deleteNode } from './Graph/Node';
import { createEdge, deleteEdge } from './Graph/Edge';
import { createConditionEdge, deleteConditionEdge } from './Graph/ConditionEdge';
import { saveJson, loadJson } from './JsonUtils';
import { useGraphManager, GraphManagerProvider } from './Graph/GraphManagerContext';
import ConfigWindow from './Graph/ConfigWindow';
import RunWindow from './Graph/RunWindow';
import FileTransmit from './Graph/FileTransmit';

const nodeTypes = { textUpdater: Node };

function Canvas() {
  const {
    nodes,
    setNodes,
    onNodesChange,
    nodeIdCounter,
    setNodeIdCounter,
  } = useGraphManager();

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const { screenToFlowPosition } = useReactFlow();
  const menuBarRef = useRef(null);
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight);
  const [showConfig, setShowConfig] = useState(false);
  const [showRun, setShowRun] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (menuBarRef.current) {
        const menuBarHeight = menuBarRef.current.offsetHeight;
        setCanvasHeight(window.innerHeight - menuBarHeight - 10);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddNode = useCallback((event) => {
    const newPosition = screenToFlowPosition({ x: contextMenu.mouseX, y: contextMenu.mouseY });
    addNode(nodes, setNodes, nodeIdCounter, setNodeIdCounter, newPosition);
    setContextMenu(null);
  }, [contextMenu, nodeIdCounter, setNodes, screenToFlowPosition]);

  const handleDeleteNode = useCallback(() => {
    if (contextMenu && contextMenu.nodeId) {
      deleteNode(nodes, setNodes, edges, setEdges, contextMenu.nodeId);
    }
    setContextMenu(null);
  }, [contextMenu, setNodes, setEdges, nodes, edges]);

  const handleDeleteEdge = useCallback(() => {
    if (contextMenu && contextMenu.edgeId) {
      const edge = edges.find((e) => e.id === contextMenu.edgeId);
      if (edge) {
        if (edge.sourceHandle === 'true' || edge.sourceHandle === 'false') {
          deleteConditionEdge(edges, setEdges, contextMenu.edgeId, nodes, setNodes);
        } else {
          deleteEdge(edges, setEdges, contextMenu.edgeId, nodes, setNodes);
        }
      }
    }
    setContextMenu(null);
  }, [contextMenu, setEdges, edges, nodes, setNodes]);

  const handleNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX,
      mouseY: event.clientY,
      nodeId: node.id,
      isNode: true,
      isEdge: false,
    });
  }, []);

  const handlePaneContextMenu = useCallback((event) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX,
      mouseY: event.clientY,
      isNode: false,
      isEdge: false,
    });
  }, []);

  const handleEdgeContextMenu = useCallback((event, edge) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX,
      mouseY: event.clientY,
      edgeId: edge.id,
      isNode: false,
      isEdge: true,
    });
  }, []);

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const onConnect = useCallback((params) => {
    const sourceNode = nodes.find(node => node.id === params.source);

    if (params.sourceHandle === 'true') {
      if (sourceNode.data.true_next !== null) {
        alert('True port already has a connection.');
        return;
      }
      createConditionEdge(edges, setEdges, params, nodes, setNodes);
    } else if (params.sourceHandle === 'false') {
      if (sourceNode.data.false_next !== null) {
        alert('False port already has a connection.');
        return;
      }
      createConditionEdge(edges, setEdges, params, nodes, setNodes);
    } else {
      createEdge(edges, setEdges, params, nodes, setNodes);
    }
  }, [setEdges, edges, nodes, setNodes]);

  const handleNew = () => {
    setNodes([]);
    setEdges([]);
    setNodeIdCounter(1);
  };

  const handleSave = async () => {
    await saveJson(nodes, nodeIdCounter);
  };

  const handleLoad = async () => {
    await loadJson(setEdges, setNodes, setNodeIdCounter);
  };

  const handleRun = () => {
    setShowRun(true);
  };

  const handleConfig = () => {
    setShowConfig(true);
  };

  const handleUploadComplete = () => {
    console.log('Upload complete.');
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <nav ref={menuBarRef} style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
        <button onClick={handleNew}>New</button>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleLoad}>Load</button>
        <button onClick={handleRun}>Run</button>
        <button onClick={handleConfig}>Config</button>
        <FileTransmit onUploadComplete={handleUploadComplete} />
      </nav>
      <div style={{ height: `${canvasHeight}px`, width: '100%' }}>
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange} 
          onEdgesChange={onEdgesChange}
          onNodeContextMenu={handleNodeContextMenu}
          onPaneContextMenu={handlePaneContextMenu}
          onEdgeContextMenu={handleEdgeContextMenu}
          onClick={handleCloseContextMenu}
          onConnect={onConnect}
          connectionLineStyle={{ stroke: '#ddd', strokeWidth: 2 }}
          connectOnClick={false}
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      {contextMenu && (
        <div
          style={{
            position: 'absolute',
            top: contextMenu.mouseY,
            left: contextMenu.mouseX,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            zIndex: 1000,
            padding: '10px',
          }}
        >
          {contextMenu.isNode ? (
            <button onClick={handleDeleteNode}>Delete Node</button>
          ) : contextMenu.isEdge ? (
            <button onClick={handleDeleteEdge}>Delete Edge</button>
          ) : (
            <button onClick={handleAddNode}>Add Node</button>
          )}
          <button onClick={handleCloseContextMenu}>Cancel</button>
        </div>
      )}
      {showConfig && <ConfigWindow onClose={() => setShowConfig(false)} />}
      {showRun && <RunWindow onClose={() => setShowRun(false)} />}
    </div>
  );
}

export default () => (
  <GraphManagerProvider>
    <Canvas />
  </GraphManagerProvider>
);
