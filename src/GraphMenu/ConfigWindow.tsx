// GraphMenu/ConfigWindow.tsx

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setConfigs } from '../redux/slices/userInfo.slice';

interface ConfigWindowProps {
    onClose: () => void;
}

function ConfigWindow({ onClose }: ConfigWindowProps) {
    const username = useSelector((state: RootState) => state.userInfo.username);
    const llmModelFromRedux = useSelector((state: RootState) => state.userInfo.llmModel);
    const apiKeyFromRedux = useSelector((state: RootState) => state.userInfo.apiKey);

    const [llmModel, setLlmModel] = useState(llmModelFromRedux);
    const [apiKey, setAPIKey] = useState(apiKeyFromRedux);

    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(setConfigs({ llmModel: llmModel, apiKey: apiKey }));
        localStorage.setItem('llmModel', llmModel);
        localStorage.setItem('apiKey', apiKey);

        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-1000">
            <div className="bg-white p-5 rounded shadow-md w-96">
                <h2 className="text-lg font-bold mb-4 text-black">Settings</h2>
                <div className="mb-2">
                    <label className="block mb-1 text-sm text-black">
                        Username:
                        <input
                            type="text"
                            value={username}
                            readOnly
                            className="bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-300 p-2 rounded w-full focus:outline-none text-black"
                        />
                    </label>
                </div>
                <div className="mb-2">
                    <label className="block mb-1 text-sm text-black">
                        LLM model:
                        <input
                            type="text"
                            value={llmModel}
                            onChange={(e) => setLlmModel(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full focus:outline-none text-black bg-white"
                        />
                    </label>
                </div>
                <div className="mb-2">
                    <label className="block mb-1 text-sm text-black">
                        API Key:
                        <input
                            type="text"
                            value={apiKey}
                            onChange={(e) => setAPIKey(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full focus:outline-none text-black bg-white"
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