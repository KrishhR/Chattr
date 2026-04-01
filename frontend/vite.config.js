import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        // Make open: true to automatically open build visualizer 
        // on browser when run build command
        visualizer({ open: false, template: "treemap" })
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Core React runtime
                    "vendor-react": ["react", "react-dom"],

                    // Routing
                    "vendor-router": ["react-router-dom"],

                    // UI / notification libs
                    "vendor-ui": ["lucide-react", "react-hot-toast"],

                    // State management
                    "vendor-state": ["zustand"],
                }
            }
        }
    }
})
