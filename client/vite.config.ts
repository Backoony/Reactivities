import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import  mkcert  from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  build:{
    outDir:'../API/wwwroot',
    chunkSizeWarningLimit:1500,
    emptyOutDir:true
  },
  server: {
    host:true,
    port: 3000,
      },
  plugins: [react(),mkcert()],
})
