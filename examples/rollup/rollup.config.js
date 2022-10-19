import { defineConfig } from "rollup";
import Compression from "unplugin-compression/rollup";

export default defineConfig({
  input: "src/index.js",
  output: {
    file: "./dist/index.js",
    format: "cjs",
  },
  plugins: [Compression()],
});
