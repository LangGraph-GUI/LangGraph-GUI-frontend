// GraphMenu/MenuToggleButton.tsx

import React, { useRef } from 'react';
import ConfigManager from '../utils/ConfigManager';
import { handleUpload, handleDownload, handleCleanCache } from './FileTransmit';


interface MenuToggleButtonProps {
    openRunWindow: () => void;
    openConfigWindow: () => void;
}

const MenuToggleButton: React.FC<MenuToggleButtonProps> = ({ openRunWindow, openConfigWindow }) => {
    const { username } = ConfigManager.getSettings();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleRunClick = () => {
        console.log('run');
        openRunWindow();
        // Handle run logic here (open the RunWindow)
    };

    const handleConfigClick = () => {
        openConfigWindow();
    }

    const handleDocumentationClick = () => {
        window.open("https://langgraph-gui.github.io/", "_blank");
    };


    const UsernameValid = username === 'unknown';


    return (
        <div className='mt-4 flex flex-col gap-2'>
            <div
                className={`font-bold ${!UsernameValid ? 'text-green-500' : 'text-red-500'}`}
            >
                {`User: ${username}`}
            </div>

            <input
                type="file"
                multiple
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={async (e) => {
                    await handleUpload(e.target.files);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }

                }}
            />
            <button onClick={handleRunClick} className="bg-purple-500 hover:bg-purple-700 text-white font-semibold px-1 rounded focus:outline-none focus:shadow-outline text-sm">
                To Run Graph
            </button>
            <button onClick={() => {
                if (fileInputRef.current) {
                    fileInputRef.current.click();
                }

            }} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-1 rounded focus:outline-none focus:shadow-outline text-sm">
                Upload Files to Server
            </button>
            <button onClick={async () => {
                await handleDownload();
            }} className="bg-blue-500 hover:bg-green-700 text-white font-semibold px-1 rounded focus:outline-none focus:shadow-outline text-sm">
                Get Files from Server
            </button>
            <button onClick={async () => {
                await handleCleanCache();
            }} className="bg-blue-500 hover:bg-yellow-700 text-white font-semibold px-1 rounded focus:outline-none focus:shadow-outline text-sm">
                Clean Server Cache
            </button>
            <button onClick={handleConfigClick} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold px-1 rounded focus:outline-none focus:shadow-outline text-sm">
                 Settings
            </button>
            <button onClick={handleDocumentationClick} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold px-1 rounded focus:outline-none focus:shadow-outline text-sm">
                Documentation
            </button>
        </div>
    );
};

export default MenuToggleButton;