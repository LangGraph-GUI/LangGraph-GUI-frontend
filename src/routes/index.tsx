// routes/index.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GraphApp from '../Graph/GraphApp';
import MenuLayout from '../components/MenuLayout';

// Example Components
const HomePage = () => <h1>Home Page</h1>;
const AboutPage = () => <h1>About Page</h1>;
const NotFoundPage = () => <h1>404 Not Found</h1>

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route element={<MenuLayout />}>
                    <Route path="/" element={<GraphApp />} />                    
                </Route>
                <Route path="/about" element={<AboutPage />} />
                <Route path="/test" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} /> {/* Catch-all for 404 */}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;