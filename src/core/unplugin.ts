import { createUnplugin } from "unplugin";
import type { UserOptions } from "../types";
import { Context } from "./context";

export default createUnplugin<UserOptions | undefined>((options) => {
  const ctx = new Context(options)
  return {
    name: "unplugin-compress",
    enforce: "post",
    buildEnd() {
      // let isCompress = false;
      process.on("beforeExit", async () => {
        await ctx.compressAllOnce()
      });
    },
  }
});
