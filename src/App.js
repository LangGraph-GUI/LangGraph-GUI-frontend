// App.js

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import './App.css';
import React from 'react';

import { Provider } from 'react-redux';
import { store } from './redux/store';


import { GraphContextProvider } from './Graph/GraphContext';
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
    <Provider store={store}>
      <Router basename="/">
        <GraphContextProvider>
          <div className="App">
            <ConditionalStrictMode>
              <AppRouter />
            </ConditionalStrictMode>
          </div>
        </GraphContextProvider>
      </Router>
    </Provider>
  );
}

export default App;