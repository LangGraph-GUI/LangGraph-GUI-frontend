# LangGraph-GUI-frontend (ReactFlow)

**you need git clone recursively**, the dep repo is at `src/Graph`

This repo is based on [LangGraph-GUI-reactflow](https://github.com/LangGraph-GUI/LangGraph-GUI-reactflow) with better refractor

LangGraph-GUI is a user-friendly interface for managing and visualizing Node-Edge workflows with LangGraph. It supports creating, editing, and running workflows.

For more detail, please see [frontend doc](https://langgraph-gui.github.io/Frontend/)

![LangGraph-GUI](https://langgraph-gui.github.io/cover.webp)

## Usage

Build up environment:

```
npm install
```

Run up frontend:

```
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\

## Chnage Log

see: [root repo CHANGELOG](https://github.com/LangGraph-GUI/LangGraph-GUI/blob/main/CHANGELOG.md)


## Debug Redux

* ```npm install @redux-devtools/extension```
* in browser, F12 and type 
  * ```window.store.getState().subGraphs```
* ```store.js``` : 
  ```
  // redux/store.js
  import { composeWithDevTools } from '@redux-devtools/extension';

  export const store = configureStore(
    // other code
    composeWithDevTools()
  );

  window.store = store;
  ```