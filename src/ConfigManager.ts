// ConfigManager.ts

interface ConfigSettings {
    username: string;
    llmModel: string;
    apiKey: string;
}

class ConfigManager {
    private static instance: ConfigManager;
    private llmModel: string = 'gpt'; 
    private apiKey: string = '<empty>'; 
    private username: string = 'unknown';

    constructor() {
        if (ConfigManager.instance) {
            return ConfigManager.instance;
        }
       
        const storedLlmModel = localStorage.getItem('llmModel');
        if(storedLlmModel) {
            this.llmModel = storedLlmModel;
        }

        const storedApiKey = localStorage.getItem('apiKey');
        if(storedApiKey) {
            this.apiKey = storedApiKey;
        }

        this.fetchUsername(); // Initiate username fetch

        ConfigManager.instance = this;
    }
  
    // Method to fetch username from Nginx API
    private async fetchUsername() {
        try {
            const response = await fetch('/api/username', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json() as {username: string};
                this.username = data.username;
            } else {
                console.error('Failed to fetch username:', response.status);
            }
        } catch (error) {
            if(error instanceof Error) {
                console.error('Error fetching username:', error.message);
            } else {
                console.error('Error fetching username:', error)
            }
        }
    }


    // Method to get the current settings
    getSettings(): ConfigSettings {
        return {
            username: this.username,
            llmModel: this.llmModel,
            apiKey: this.apiKey,
        };
    }

    // Method to update settings
    setSettings(newLlmModel: string, newapiKey: string): void {
        this.llmModel = newLlmModel;
        this.apiKey = newapiKey;

        localStorage.setItem('llmModel', newLlmModel);
        localStorage.setItem('apiKey', newapiKey);
    }
}

const instance = new ConfigManager();
export default instance;