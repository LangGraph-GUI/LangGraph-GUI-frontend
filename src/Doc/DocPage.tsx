// Graph/Doc.tsx

import React from 'react';

const DocPage: React.FC = () => {
    return (
        <iframe
            src="https://langgraph-gui.github.io/"
            style={{ width: '100vw', height: '100vh', border: 'none' }}
            title="LangGraph GUI Documentation"
        />
    );
};

export default DocPage;