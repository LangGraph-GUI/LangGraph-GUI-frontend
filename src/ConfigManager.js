// ConfigManager.js

class ConfigManager {
    constructor() {
        if (ConfigManager.instance) {
            return ConfigManager.instance;
        }

        this.llmModel = localStorage.getItem('llmModel') || 'gemma2';
        this.backendScript = localStorage.getItem('backendScript') || 'cd working && python backend.py --graph graph.json --llm gemma2 --tee output.log';
        this.workingFolder = localStorage.getItem('workingFolder') || 'working';

        ConfigManager.instance = this;
    }

    getSettings() {
        return {
            llmModel: this.llmModel,
            backendScript: this.backendScript,
            workingFolder: this.workingFolder,
        };
    }

    setSettings(newLlmModel, newBackendScript, newWorkingFolder) {
        this.llmModel = newLlmModel;
        this.backendScript = newBackendScript;
        this.workingFolder = newWorkingFolder;

        localStorage.setItem('llmModel', newLlmModel);
        localStorage.setItem('backendScript', newBackendScript);
        localStorage.setItem('workingFolder', newWorkingFolder);
    }
}

const instance = new ConfigManager();
// Object.freeze(instance); // Remove this line to allow property modifications

export default instance;
