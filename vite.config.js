import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { resolve as resolver } from 'path';

const resolve = {
    development: {
        alias: {
            '@': resolver(__dirname, './src'),
            '@getters': resolver(__dirname, './backend-dev/index.js'),
        },
    },
    production: {
        alias: {
            '@': resolver(__dirname, './src'),
            '@getters': resolver(__dirname, './fake-backend/index.js'),
        },
    },
};

const plugins = [react(), viteSingleFile()];

export default defineConfig(({ command, node }) => {
    if (command === 'serve') {
        return {
            plugins,
            resolve: resolve.development,
        };
    } else {
        return {
            plugins,
            resolve: resolve.production,
            build: {
                emptyOutDir: false,
            },
            optimizeDeps: {
                entries: ['fake-backend', 'backend-dev', 'dist'],
                include: ['fake-backend', 'backend-dev', 'dist'],
            },
        };
    }
});

