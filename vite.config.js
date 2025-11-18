import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc'
import preload from 'vite-plugin-preload';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    preload(),
  ],
  build: {
  modulePreload: {
    polyfill: true,
  }
}
})