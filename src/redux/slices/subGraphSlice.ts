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
        addSubGraph: (state, action: PayloadAction<SubGraphState>) => {
            state.subGraphs.push(action.payload);
        },
        updateSubGraph: (state, action: PayloadAction<{ index: number; updatedGraph: SubGraphState }>) => {
            const { index, updatedGraph } = action.payload;
            if(index >=0 && index < state.subGraphs.length){
                state.subGraphs[index] = updatedGraph;
            }
        },
        removeSubGraph: (state, action: PayloadAction<number>) => {
            state.subGraphs = state.subGraphs.filter((_, index) => index !== action.payload);
        },
        initSubGraphs: () => initialState,
        setSubGraphs: (state, action: PayloadAction<SubGraphState[]>) =>{
            state.subGraphs = action.payload
        }
    },
});

export const { addSubGraph, updateSubGraph, removeSubGraph, initSubGraphs, setSubGraphs } = subGraphSlice.actions;
export default subGraphSlice.reducer;