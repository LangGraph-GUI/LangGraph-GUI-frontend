# LangGraph-GUI-svelte [LangGraph-GUI](https://github.com/LangGraph-GUI/LangGraph-GUI)

## See [LangGraph-GUI](https://github.com/LangGraph-GUI/LangGraph-GUI)


## 

### core design concept

SSOT is Nodes, singals to Edges
```
bind:nodes={$currentNodes}
edges={$currentEdges} 
```

Thus, everything such add edge, remove edge, that all modify node.data then signals trigger edge update
