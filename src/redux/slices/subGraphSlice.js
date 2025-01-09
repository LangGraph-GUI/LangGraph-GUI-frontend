// redux/slices/subGraphSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rootGraph: null, // Initialize to null or an initial ID
    subGraphs: [], // Array to hold subgraphs objects ({graphId: 1, nodes:[], edges:[]})
};

const subGraphSlice = createSlice({
  name: 'subGraphs',
  initialState,
  reducers: {
    setRootGraph: (state, action) => {
      state.rootGraph = action.payload;
    },
    addSubGraph: (state, action) => {
      state.subGraphs.push(action.payload);
    },
    updateSubGraph: (state, action) => {
        const { graphId, nodes, edges } = action.payload;
         const existingGraphIndex = state.subGraphs.findIndex(graph => graph.graphId === graphId);
      
        if(existingGraphIndex !== -1){
            state.subGraphs[existingGraphIndex] = {
              graphId: graphId,
              nodes: nodes,
              edges: edges
            }
        } else {
            // If graph doesnt exist, add it
            state.subGraphs.push({graphId: graphId, nodes: nodes, edges:edges})
        }
    },
    removeSubGraph: (state, action) => {
      state.subGraphs = state.subGraphs.filter(graph => graph.graphId !== action.payload);
    },
  },
});

export const { setRootGraph, addSubGraph, updateSubGraph, removeSubGraph } = subGraphSlice.actions;
export default subGraphSlice.reducer;