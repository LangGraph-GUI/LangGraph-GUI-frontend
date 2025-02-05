// GraphMenu/FileTransmit.ts

import ConfigManager from '../utils/ConfigManager';

export const handleUpload = async (files: FileList | null) => {
    const { username } = ConfigManager.getSettings();

    const SERVER_URL = import.meta.env.VITE_BACKEND_URL;

    if (!files || files.length === 0) {
        alert("No files selected for upload.");
        return;
    }
   
    if (!username) {
        alert("Username is not set. Please configure your settings.");
        return;
    }


    const formData = new FormData();
    for (const file of files) {
        formData.append('files', file);
    }

    try {
        const response = await fetch(`${SERVER_URL}/upload/${encodeURIComponent(username)}`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Files successfully uploaded');
        } else {
            const errorData = await response.json();
            alert('Upload failed: ' + errorData.error);
        }
    } catch (error: any) {
        alert('Upload failed: ' + error.message);
    }
};


export const handleDownload = async () => {
    const { username } = ConfigManager.getSettings();

    const SERVER_URL = import.meta.env.VITE_BACKEND_URL;


    if (!username) {
        alert("Username is not set. Please configure your settings.");
        return;
    }
    try {
        const response = await fetch(`${SERVER_URL}/download/${encodeURIComponent(username)}`);

        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${username}_workspace.zip`;
            a.click();
            URL.revokeObjectURL(url);
        } else {
            const errorData = await response.json();
            alert('Download failed: ' + errorData.error);
        }
    } catch (error: any) {
        alert('Download failed: ' + error.message);
    }
};


export const handleCleanCache = async () => {

    const SERVER_URL = import.meta.env.VITE_BACKEND_URL;


    const { username } = ConfigManager.getSettings();
    if (!username) {
        alert("Username is not set. Please configure your settings.");
        return;
    }
    try {
        const response = await fetch(`${SERVER_URL}/clean-cache/${encodeURIComponent(username)}`, {
            method: 'POST'
        });

        if (response.ok) {
            alert('Cache successfully cleaned');
        } else {
            const errorData = await response.json();
            alert('Clean cache failed: ' + errorData.error);
        }
    } catch (error: any) {
        alert('Clean cache failed: ' + error.message);
    }
};