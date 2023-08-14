import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ command }) => {
    return {
        plugins: [react(), svgr()],
        base: command === 'serve' ? '/' : '/pix/',
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
                '@components': resolve(__dirname, './src/components'),
                '@pages': resolve(__dirname, './src/pages'),
                '@assets': resolve(__dirname, './src/assets'),
                '@hooks': resolve(__dirname, './src/hooks'),
                '@utils': resolve(__dirname, './src/utils'),
                '@types': resolve(__dirname, './src/types'),
                '@constants': resolve(__dirname, './src/constants')
            }
        }
    }
})
