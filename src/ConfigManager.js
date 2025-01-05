// ConfigManager.js

class ConfigManager {
    constructor() {
        if (ConfigManager.instance) {
            return ConfigManager.instance;
        }

        // Initialize default values or get them from localStorage
        this.llmModel = localStorage.getItem('llmModel') || 'gpt';
        this.apiKey = localStorage.getItem('apiKey') || '<empty>';
        
        // Add username retrieval
        this.fetchUsername();

        ConfigManager.instance = this;
    }

    // Method to fetch username from Nginx API
    async fetchUsername() {
        try {
            const response = await fetch('/api/username', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                this.username = data.username;
            } else {
                console.error('Failed to fetch username:', response.status);
            }
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    }

    // Method to get the current settings
    getSettings() {
        return {
            username: this.username,
            llmModel: this.llmModel,
            apiKey: this.apiKey,
        };
    }

    // Method to update settings
    setSettings(newLlmModel, newapiKey) {
        this.llmModel = newLlmModel;
        this.apiKey = newapiKey;

        localStorage.setItem('llmModel', newLlmModel);
        localStorage.setItem('apiKey', newapiKey);
    }
}

const instance = new ConfigManager();
export default instance;
