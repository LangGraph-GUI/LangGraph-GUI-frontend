// components/MenuToggleButton.tsx

import React, { useRef } from 'react';
import ConfigManager from '../ConfigManager';
import { handleUpload, handleDownload, handleCleanCache } from './FileTransmit';


interface MenuToggleButtonProps {
    openRunWindow: () => void;
}

const MenuToggleButton: React.FC<MenuToggleButtonProps> = ({ openRunWindow }) => {
    const { username } = ConfigManager.getSettings();
    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleRunClick = () => {
        console.log('run');
        openRunWindow();
        // Handle run logic here (open the RunWindow)
    };

    const isUsernameValid = username && username.length > 0;


    return (
        <div className='mt-4 flex flex-col gap-2'>
            <div
                className={`font-bold ${isUsernameValid ? 'text-green-500' : 'text-red-500'}`}
            >
                {isUsernameValid ? `User: ${username}` : 'User: undefined'}
            </div>

            <input
                type="file"
                multiple
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={async (e) => {
                    await handleUpload(e.target.files);
                    if(fileInputRef.current){
                        fileInputRef.current.value = ''
                    }

                }}
            />
            <button onClick={() => {
                if (fileInputRef.current) {
                    fileInputRef.current.click();
                }

            }} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-1 rounded focus:outline-none focus:shadow-outline text-sm">
                Upload Files to Server
            </button>
            <button onClick={async () => {
                await handleDownload();
            }} className="bg-green-500 hover:bg-green-700 text-white font-semibold px-1 rounded focus:outline-none focus:shadow-outline text-sm">
                Get Files from Server
            </button>
            <button onClick={async () => {
                await handleCleanCache();
            }} className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold px-1 rounded focus:outline-none focus:shadow-outline text-sm">
                Clean Server Cache
            </button>
            <button onClick={handleRunClick} className="bg-purple-500 hover:bg-purple-700 text-white font-semibold px-1 rounded focus:outline-none focus:shadow-outline text-sm">
                To Run Graph
            </button>
        </div>
    );
};

export default MenuToggleButton;