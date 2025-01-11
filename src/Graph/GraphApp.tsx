// src/Graph/GraphApp.tsx

import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addSubGraph, updateSubGraph, removeSubGraph } from '../redux/slices/subGraphSlice';
import { Node, Edge } from '@xyflow/react';
import { useState, useMemo, useCallback, useEffect } from 'react';

const GraphApp: React.FC = () => {
    const subGraphs = useSelector((state: RootState) => state.subGraphs.subGraphs);
    const dispatch = useDispatch();
    const [currentGraphName] = useState("root"); //default graph


    const getGraph = useCallback((graphName: string) => {
        return subGraphs.find((graph) => graph.graphName === graphName);
    }, [subGraphs]);


    const initialGraphData = useMemo(() => {
        return {
            nodes: [
                { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
                { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
            ],
            edges: [{ id: 'e1-2', source: '1', target: '2' }],
            serial_number: 0,
        };
    }, []);



    useEffect(() => {
        const rootGraph = getGraph("root");
        if (rootGraph && rootGraph.nodes.length === 0) {
            dispatch(updateSubGraph({ graphName: "root", updatedGraph:initialGraphData})); //add root graph
        }
    }, [dispatch, getGraph, initialGraphData])



    const currentGraph = getGraph(currentGraphName);

    const handleAddGraph = () => {
        const newGraphName = prompt("Enter a new graph name:");
        if (newGraphName) {
            dispatch(addSubGraph(newGraphName));
        }
    };


    const handleUpdateGraph = () => {
        const newNodes: Node[] = [
            { id: '3', position: { x: 200, y: 0 }, data: { label: '3' } },
            { id: '4', position: { x: 200, y: 100 }, data: { label: '4' } },
        ]
        const newEdges: Edge[] = [{ id: 'e3-4', source: '3', target: '4' }]
        dispatch(updateSubGraph({ graphName: currentGraphName, updatedGraph: {nodes: newNodes, edges: newEdges, serial_number: 1} }));
    };

    const handleRemoveGraph = () => {
        const graphName = prompt("Enter the graph name to delete:");
        if (graphName) {
            dispatch(removeSubGraph(graphName));
        }
    };

    if (!currentGraph) {
        return <div>No Graph Data Found</div>;
    }

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <button onClick={handleAddGraph}>Add Graph</button>
            <button onClick={handleUpdateGraph}>Update Graph</button>
            <button onClick={handleRemoveGraph}>Remove Graph</button>
            <ReactFlow nodes={currentGraph.nodes} edges={currentGraph.edges} />
        </div>
    );
};

export default GraphApp;