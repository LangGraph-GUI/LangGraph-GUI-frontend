/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

type BackendUrlMode = 'development' | 'preview' | 'production';

const backendUrls: Record<BackendUrlMode, string> = {
    development: 'http://localhost:5000',     // Docker Compose
    preview: 'http://backend.local',        // K8s preview
    production: 'https://your-prod-backend.com'
};

export default defineConfig(({ mode }) => {
    const safeMode = mode as BackendUrlMode;
    const backendUrl = backendUrls[safeMode] || backendUrls.production;

    return {
        plugins: [react()],
        server: {
            host: '0.0.0.0', 
            port: 3000,
            allowedHosts: [
                'localhost', 
                '127.0.0.1',
                'frontend.local',
            ],
        },
        test: {
            globals: true,
            environment: "jsdom",
            setupFiles: "./setupTests.ts",
        },
        define: {
            'import.meta.env.VITE_BACKEND_URL': JSON.stringify(backendUrl)
        }
    }
})