import {fileURLToPath, URL} from 'node:url'
import Components from 'unplugin-vue-components/vite'
import MotionResolver from 'motion-v/resolver'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        vue(),
        Components({
            dts: 'src/types/components.d.ts',
            resolvers: [
                MotionResolver()
            ],
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'https://localhost:3721',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                secure: false,
            },
        },
    },
})
