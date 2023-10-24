import { defineConfig } from "vite";
import Compression from "unplugin-compression/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Compression({
    outDir: 'dist',
    adapter: 'tar'
  })],
});
