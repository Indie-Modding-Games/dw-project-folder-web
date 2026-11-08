import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  /**
   * GitHub Pages sirve este repo en https://indie-modding-games.github.io/dw-project-folder-web/
   * Si mañana se usa dominio propio o un repo <usuario>.github.io, cambiar a '/'.
   */
  base: '/dw-project-folder-web/',
})
