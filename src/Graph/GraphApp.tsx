// src/Graph/GraphApp.tsx

import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Assuming your store is in 'redux/store.ts'

const GraphApp: React.FC = () => {
    const subGraphs = useSelector((state: RootState) => state.subGraphs.subGraphs);
    // For simplicity, using the first graph; You might want to select a graph based on some criteria
    const currentGraph = subGraphs[0];

    if (!currentGraph) {
        return <div>No Graph Data Found</div>;
    }

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow nodes={currentGraph.nodes} edges={currentGraph.edges} />
        </div>
    );
};

export default GraphApp;