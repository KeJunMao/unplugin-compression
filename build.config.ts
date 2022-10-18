import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "src/index",
    "src/rollup",
    "src/vite",
    "src/webpack",
    "src/esbuild",
    "src/types",
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  externals: ["vite"],
});
