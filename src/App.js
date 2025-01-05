// App.js

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import './App.css';

import React from 'react';

import { GraphManagerProvider } from './Graph/GraphManager';
import ConfigManager from './ConfigManager';
import AppRouter from './Router';


const ConditionalStrictMode = ({ children }) => {
  const location = useLocation();
  const useStrictMode = location.pathname !== '/editor';
  return useStrictMode ? <React.StrictMode>{children}</React.StrictMode> : <>{children}</>;
};

function App() {

  const [usernameFetched, setUsernameFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await ConfigManager.fetchUsername();
      setUsernameFetched(true);
      fetch('/'); // Fetch content from the root route
    };

    fetchData();
  }, []);

  if (!usernameFetched) {
    return <div>Loading...</div>;
  }


  return (
    <GraphManagerProvider>
      <Router basename="/">
        <div className="App">
          <ConditionalStrictMode>
            <AppRouter />
          </ConditionalStrictMode>
        </div>
      </Router>
    </GraphManagerProvider>
  );
}

export default App;
