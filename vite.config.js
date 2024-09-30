import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
const aliases = {
  '@components': '/src/components',
  '@icons': '/src/icons',
  '@tailwind': '/node_modules/tailwindcss'
  // ... otros alias según tus necesidades
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    aliases
  }
})
