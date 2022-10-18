import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index","src/vite"],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
});
