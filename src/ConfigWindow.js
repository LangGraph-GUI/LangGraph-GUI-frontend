import React, { useState } from 'react';
import ConfigManager from './ConfigManager';

function ConfigWindow({ onClose }) {
  const settings = ConfigManager.getSettings();

  const [username] = useState(settings.username);
  const [llmModel, setLlmModel] = useState(settings.llmModel);
  const [apiKey, setAPIKey] = useState(settings.apiKey);

  const handleSave = () => {
    ConfigManager.setSettings(llmModel, apiKey);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-1000">
      <div className="bg-white p-5 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Settings</h2>
        <div className="mb-2">
          <label className="block mb-1 text-sm">
            Username:
            <input
              type="text"
              value={username}
              readOnly
              className="bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-300 p-2 rounded w-full focus:outline-none"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block mb-1 text-sm">
            LLM model:
            <input
              type="text"
              value={llmModel}
              onChange={(e) => setLlmModel(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full focus:outline-none"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block mb-1 text-sm">
            API Key:
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setAPIKey(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full focus:outline-none"
            />
          </label>
        </div>
        <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Save
        </button>
        <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
            Cancel
        </button>
        </div>
      </div>
    </div>
  );
}

export default ConfigWindow;