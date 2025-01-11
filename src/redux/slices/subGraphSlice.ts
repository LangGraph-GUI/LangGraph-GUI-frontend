// redux/slices/subGraphSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Edge } from '@xyflow/react';

interface SubGraphState {
    graphName: string;
    nodes: Node[];
    edges: Edge[];
    serial_number: number;
}

interface SubGraphSliceState {
    subGraphs: SubGraphState[];
}

const initialState: SubGraphSliceState = {
    subGraphs: [{
        graphName: "root",
        nodes: [],
        edges: [],
        serial_number: 0,
    }],
};


const subGraphSlice = createSlice({
    name: 'subGraphs',
    initialState,
    reducers: {
        addSubGraph: (state, action: PayloadAction<string>) => {
            const newGraph:SubGraphState = {
                graphName: action.payload,
                nodes: [],
                edges: [],
                serial_number: 0
            };
            state.subGraphs.push(newGraph);
        },
        updateSubGraph: (state, action: PayloadAction<{ graphName: string; updatedGraph: Omit<SubGraphState, "graphName"> }>) => {
            const { graphName, updatedGraph } = action.payload;
            const graphIndex = state.subGraphs.findIndex((graph) => graph.graphName === graphName);
            if (graphIndex !== -1) {
                state.subGraphs[graphIndex] = { ...state.subGraphs[graphIndex], ...updatedGraph };
            }
        },
        removeSubGraph: (state, action: PayloadAction<string>) => {
            state.subGraphs = state.subGraphs.filter((graph) => graph.graphName !== action.payload);
        },
        initSubGraphs: () => initialState,
        setSubGraphs: (state, action: PayloadAction<SubGraphState[]>) => {
            state.subGraphs = action.payload
        }
    },
});

export const { addSubGraph, updateSubGraph, removeSubGraph, initSubGraphs, setSubGraphs } = subGraphSlice.actions;
export default subGraphSlice.reducer;