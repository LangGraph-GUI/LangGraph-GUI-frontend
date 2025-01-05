// App.js

import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import Canvas from './Canvas';

function App() {
  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  );
}

export default App;
