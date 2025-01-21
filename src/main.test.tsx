// src/main.test.tsx
import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';

import { Provider } from 'react-redux';
import { store } from "./redux/store";
import { ReactFlowProvider } from '@xyflow/react';
import { GraphProvider } from './Graph/GraphContext';
import { StrictMode } from 'react';
import App from './App';

describe('Application Rendering', () => {
    it('renders the main application with providers', () => {
        render(
            <main>
                <StrictMode>
                    <Provider store={store}>
                        <GraphProvider>
                            <ReactFlowProvider>
                                <App />
                            </ReactFlowProvider>
                        </GraphProvider>
                    </Provider>
                </StrictMode>
            </main>
        );

        // Now you can assert that elements from your App or child components are rendered.
        // Example: Replace this with your actual test assertion.
        // This example assumes you have an element with the text "My App" inside App component or child.
        const appElement = screen.getByRole("main"); 
        expect(appElement).toBeInTheDocument();
    });
});