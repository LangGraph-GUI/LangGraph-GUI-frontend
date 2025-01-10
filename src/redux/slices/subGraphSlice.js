// redux/slices/subGraphSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    subGraphs: [{ 
        graphName: "root", 
        nodes: [],
        node_counter: 1,
    }],
};

const subGraphSlice = createSlice({
  name: 'subGraphs',
  initialState,
  reducers: {
    
    addSubGraph: (state, action) => {
        const { graphName, nodes, node_counter } = action.payload;

        // Check if a subgraph with the same name already exists
        const graphExists = state.subGraphs.some(graph => graph.graphName === graphName);
        if (graphExists) {
            console.error(`Subgraph with name '${graphName}' already exists. Cannot add.`);
          return; // Prevent adding if name exists
        }
        state.subGraphs.push({graphName, nodes, node_counter});
    },
    updateSubGraph: (state, action) => {
        const { graphName, nodes, node_counter } = action.payload;
         const existingGraphIndex = state.subGraphs.findIndex(graph => graph.graphName === graphName);
      
        if(existingGraphIndex !== -1){
            state.subGraphs[existingGraphIndex] = {
              graphName: graphName,
              nodes: nodes,
              node_counter: node_counter,
            }
        } else {
            // If graph doesnt exist, add it
            state.subGraphs.push({graphName: graphName, nodes: nodes, node_counter: node_counter})
        }
    },
    removeSubGraph: (state, action) => {
      state.subGraphs = state.subGraphs.filter(graph => graph.graphName !== action.payload);
    },
    initSubGraphs: () => initialState, // Add reset reducer
  },
});

export const { addSubGraph, updateSubGraph, removeSubGraph, initSubGraphs } = subGraphSlice.actions;
export default subGraphSlice.reducer;