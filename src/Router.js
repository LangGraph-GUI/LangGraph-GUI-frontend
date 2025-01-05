// Router.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GraphApp from './Graph/GraphApp';


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<GraphApp />} />
    </Routes>
  );
};

export default AppRouter;
