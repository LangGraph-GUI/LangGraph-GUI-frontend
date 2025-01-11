// routes/index.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GraphApp from '../Graph/GraphApp';


// Example Components
const HomePage = () => <h1>Home Page</h1>;
const AboutPage = () => <h1>About Page</h1>;
const NotFoundPage = () => <h1>404 Not Found</h1>

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/" element={<GraphApp />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} /> {/* Catch-all for 404 */}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;