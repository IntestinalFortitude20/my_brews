import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../', '');

  return {
    plugins: [react()],
    server: {
      port: Number.parseInt(env.VITE_FRONTEND_PORT || '5173', 10)
    },
    define: {
      'import.meta.env': {
        VITE_BACKEND_URL: JSON.stringify(env.VITE_BACKEND_URL || 'http://localhost:3000')
      }
    }
  };
})
