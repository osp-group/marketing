import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
          'process.env.TEAM_BASE_URL': JSON.stringify(env.TEAM_BASE_URL || '/team'),
          'process.env.HERO_IMAGE_URL': JSON.stringify(env.HERO_IMAGE_URL || '')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
