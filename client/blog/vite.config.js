import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config//
export default defineConfig({
  plugins: [
    tailwindcss(),
  ]
  ,
  server: {
    allowedHosts: [
      '11e7aad1874e.ngrok-free.app'  // 👈 your ngrok URL here
    ]
  }
})

