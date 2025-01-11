// redux/slices/subGraphSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Edge } from '@xyflow/react';

interface SubGraphState {
    graphName: string;
    nodes: Node[];
    edges: Edge[];
    serial_number: number;
}


const initialState: { subGraphs: SubGraphState[] } = {
    subGraphs: [{
        graphName: "root",
        nodes: [
            { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
            { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
        ],
        edges: [{ id: 'e1-2', source: '1', target: '2' }],
        serial_number: 0,
    }],
};



const subGraphSlice = createSlice({
    name: 'subGraphs',
    initialState,
    reducers: {
        addSubGraph: (state, action: PayloadAction<{ graphName: string, nodes: Node[], edges: Edge[], serial_number: number }>) => {
            const { graphName, nodes, edges, serial_number } = action.payload;

            const graphExists = state.subGraphs.some(graph => graph.graphName === graphName);
            if (graphExists) {
                console.error(`Subgraph with name '${graphName}' already exists. Cannot add.`);
                return;
            }
            state.subGraphs.push({ graphName, nodes, edges, serial_number });
        },
        updateSubGraph: (state, action: PayloadAction<{ graphName: string, nodes: Node[], edges: Edge[], serial_number: number }>) => {
            const { graphName, nodes, edges, serial_number } = action.payload;
            const existingGraphIndex = state.subGraphs.findIndex(graph => graph.graphName === graphName);

            if (existingGraphIndex !== -1) {
                state.subGraphs[existingGraphIndex] = {
                    graphName: graphName,
                    nodes: nodes,
                    edges: edges,
                    serial_number: serial_number,
                };
            } else {
                state.subGraphs.push({ graphName: graphName, nodes: nodes, edges: edges, serial_number: serial_number });
            }
        },
        removeSubGraph: (state, action: PayloadAction<string>) => {
            state.subGraphs = state.subGraphs.filter(graph => graph.graphName !== action.payload);
        },
        initSubGraphs: () => initialState,
        setSubGraphs: (state, action: PayloadAction<SubGraphState[]>) => {
            state.subGraphs = action.payload;
        },
        updateNodesInSubGraph: (state, action: PayloadAction<{ graphName: string, nodes: Node[] }>) => {
            const { graphName, nodes } = action.payload;
            const existingGraphIndex = state.subGraphs.findIndex(graph => graph.graphName === graphName);

            if (existingGraphIndex !== -1) {
                state.subGraphs[existingGraphIndex].nodes = nodes;
            }
        },
        updateEdgesInSubGraph: (state, action: PayloadAction<{ graphName: string, edges: Edge[] }>) => {
          const { graphName, edges } = action.payload;
          const existingGraphIndex = state.subGraphs.findIndex(graph => graph.graphName === graphName);

          if(existingGraphIndex !== -1) {
            state.subGraphs[existingGraphIndex].edges = edges;
          }
      }
    },
});


export const { addSubGraph, updateSubGraph, removeSubGraph, initSubGraphs, setSubGraphs, updateNodesInSubGraph, updateEdgesInSubGraph } = subGraphSlice.actions;
export default subGraphSlice.reducer;