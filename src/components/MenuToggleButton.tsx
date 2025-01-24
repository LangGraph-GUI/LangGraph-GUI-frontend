// components/MenuToggleButton.tsx

import React from 'react';

const MenuToggleButton: React.FC = () => {

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

    return (
        <div className='mt-4 flex flex-col gap-2'>
            <button onClick={handleUploadClick} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-1 rounded focus:outline-none focus:shadow-outline text-sm">
            Upload Files to Server
            </button>
            <button onClick={handleDownloadClick} className="bg-green-500 hover:bg-green-700 text-white font-semibold px-1 rounded focus:outline-none focus:shadow-outline text-sm">
            Get Files from Server
            </button>
            <button onClick={handleCleanCacheClick} className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold px-1 rounded focus:outline-none focus:shadow-outline text-sm">
            Clean Server Cache
            </button>
        </div>
    );
};

export default MenuToggleButton;