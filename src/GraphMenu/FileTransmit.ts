// GraphMenu/FileTransmit.ts

import SERVER_URL from '../config';
import ConfigManager from '../ConfigManager';

const { username } = ConfigManager.getSettings();


export const handleUpload = async (files: FileList | null) => {
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