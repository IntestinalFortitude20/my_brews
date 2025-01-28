import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' }); // Define the correct path of the .env file in main project folder

console.log('VITE_FRONTEND_PORT:', process.env.VITE_FRONTEND_PORT);
console.log('VITE_BACKEND_URL:', process.env.VITE_BACKEND_URL);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_FRONTEND_PORT, 10)
  },
  define: {
    'import.meta.env': {
      VITE_BACKEND_URL: JSON.stringify(process.env.VITE_BACKEND_URL)
    }
  }
})
