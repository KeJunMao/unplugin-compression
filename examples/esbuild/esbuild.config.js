import { build } from "esbuild";
import Compression from "unplugin-compression/esbuild";

build({
  entryPoints: ["src/index.js"],
  outdir: "dist",
  plugins: [Compression()],
});
