// routes/AppRoutes.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GraphApp from '../Graph/GraphApp';
import MenuLayout from '../GraphMenu/MenuLayout';
import DocPage from '../Doc/DocPage';

// Example Components
const HomePage = () => <h1>Home Page</h1>;
const NotFoundPage = () => <h1>404 Not Found</h1>;

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Apply MenuLayout ONLY on the root (/) */}
                <Route path="/" element={<MenuLayout />}>
                    <Route index element={<GraphApp />} />
                </Route>

                {/* Other paths, without MenuLayout */}
                <Route path="/doc" element={<DocPage />} />
                <Route path="/test" element={<HomePage />} />

                {/* Catch-all for 404 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
