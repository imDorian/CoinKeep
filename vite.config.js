import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

const aliases = {
  '@components': '/src/components',
  '@icons': '/src/icons',
  '@tailwind': '/node_modules/tailwindcss'
  // ... otros alias según tus necesidades
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'KeepCoin - Save your Money',
        short_name: 'KeepCoin',
        description:
          'Maneja tus gastos diarios, ahorros e inversiones. Comparte gastos con tus amigos mediante grupos.',
        theme_color: '#242424',
        icons: [
          {
            // src: 'icon-192x192.png',
            src: 'KeepCoin.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            // src: 'icon-512x512.png',
            src: 'KeepCoin.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    aliases
  }
})
