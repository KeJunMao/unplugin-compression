import { createUnplugin } from "unplugin";
import type { Options } from "../types";
import { compress } from "./compress";
import { Log } from "./log";

export default createUnplugin<Options | undefined>((options) => ({
  name: "unplugin-compress",
  enforce: "post",
  buildEnd() {
    let isCompress = false;
    process.on("beforeExit", async () => {
      if (isCompress) return;
      isCompress = true;
      Log.log("start compressing");
      let compressed = false;
      try {
        compressed = await compress(options);
      } catch (e) {
        Log.error(String(e));
        console.error(e)
      }
      if (compressed) {
        Log.success("compressed success");
      }
    });
  },
}));
