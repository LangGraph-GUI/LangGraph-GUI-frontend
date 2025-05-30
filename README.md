# LangGraph-GUI-svelte

<p style="font-size: 4em;">see [LangGraph-GUI](https://github.com/LangGraph-GUI/LangGraph-GUI)</p>


## core design concept

SSOT is Nodes, singals to Edges
```
bind:nodes={$currentNodes}
edges={$currentEdges} 
```

Thus, everything such add edge, remove edge, that all modify node.data then signals trigger edge update
