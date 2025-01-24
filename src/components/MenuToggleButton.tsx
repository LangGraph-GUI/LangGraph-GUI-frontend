// components/MenuToggleButton.tsx

import React, { useState } from 'react';
import RunWindow from './RunWindow';
import ConfigManager from '../ConfigManager';

const MenuToggleButton: React.FC = () => {
    const [isRunWindowOpen, setIsRunWindowOpen] = useState(false);
    const { username } = ConfigManager.getSettings();

    const handleUploadClick = () => {
        console.log('upload file');
        // Handle upload logic here (specific to this component)
    };

    const handleDownloadClick = () => {
        console.log('get files');
        // Handle download logic here (specific to this component)
    };

    const handleCleanCacheClick = () => {
        console.log('clean cache');
        // Handle cache clean logic here (specific to this component)
    };

    const handleRunClick = () => {
        console.log('run');
        setIsRunWindowOpen(true);
        // Handle run logic here (open the RunWindow)
    };

    const closeRunWindow = () => {
        setIsRunWindowOpen(false);
    };

    // Check if username is valid
    const isUsernameValid = username && username.length > 0;


    return (
        <div className='mt-4 flex flex-col gap-2'>
            <div
                className={`font-bold ${isUsernameValid ? 'text-green-500' : 'text-red-500'}`}
            >
                {isUsernameValid ? `User: ${username}` : 'User: undefined'}
            </div>


            <button onClick={handleUploadClick} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-1 rounded focus:outline-none focus:shadow-outline text-sm">
                Upload Files to Server
            </button>
            <button onClick={handleDownloadClick} className="bg-green-500 hover:bg-green-700 text-white font-semibold px-1 rounded focus:outline-none focus:shadow-outline text-sm">
                Get Files from Server
            </button>
            <button onClick={handleCleanCacheClick} className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold px-1 rounded focus:outline-none focus:shadow-outline text-sm">
                Clean Server Cache
            </button>
            <button onClick={handleRunClick} className="bg-purple-500 hover:bg-purple-700 text-white font-semibold px-1 rounded focus:outline-none focus:shadow-outline text-sm">
                Run
            </button>
            {isRunWindowOpen && <RunWindow onClose={closeRunWindow} />}
        </div>
    );
};

export default MenuToggleButton;