// main.tsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { Provider } from 'react-redux';
import {store} from "./redux/store.ts"
import { ReactFlowProvider } from '@xyflow/react';
import { GraphProvider } from './Graph/GraphContext';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <GraphProvider>
                <ReactFlowProvider>
                    <App />
                </ReactFlowProvider>
            </GraphProvider>
        </Provider>
    </StrictMode>,
)