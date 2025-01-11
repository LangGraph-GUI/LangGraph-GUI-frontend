// src/Graph/GraphApp.tsx

import React, { useCallback } from 'react';
import ReactFlow, {
    addEdge,
    useNodesState,
    useEdgesState,
    Connection,
    OnNodesChange,
    OnEdgesChange,
    applyNodeChanges,
    applyEdgeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { updateNodesInSubGraph, updateEdgesInSubGraph } from '../redux/slices/subGraphSlice';


const GraphApp: React.FC = () => {
    const dispatch = useDispatch();
    const subGraphs = useSelector((state: RootState) => state.subGraphs.subGraphs);

    // Assuming we are only using "root" subGraph for the moment
    const currentSubGraph = subGraphs.find(graph => graph.graphName === "root");
    const initialNodes = currentSubGraph?.nodes || [];
    const initialEdges = currentSubGraph?.edges || [];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


    // Use callbacks to persist changes in Redux
    const onNodesChangeHandler: OnNodesChange = useCallback((changes) => {
        setNodes(nodes => applyNodeChanges(changes, nodes))
        dispatch(updateNodesInSubGraph({ graphName: "root", nodes: applyNodeChanges(changes, nodes) }));
    }, [dispatch, setNodes]);
    
    const onEdgesChangeHandler: OnEdgesChange = useCallback((changes) => {
        setEdges(edges => applyEdgeChanges(changes, edges));
        dispatch(updateEdgesInSubGraph({graphName: "root", edges: applyEdgeChanges(changes, edges)}))
    }, [dispatch, setEdges]);

    const onConnect = useCallback(
        (connection: Connection) => {
            setEdges(edges => addEdge(connection, edges))
            dispatch(updateEdgesInSubGraph({ graphName: "root", edges: addEdge(connection, edges) }))
        },
        [setEdges, dispatch]
    );


    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow 
                nodes={nodes} 
                edges={edges} 
                onNodesChange={onNodesChangeHandler}
                onEdgesChange={onEdgesChangeHandler}
                onConnect={onConnect}
                />
        </div>
    );
};

export default GraphApp;