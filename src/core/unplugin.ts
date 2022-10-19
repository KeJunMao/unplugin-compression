import { createUnplugin } from "unplugin";
import type { Options } from "../types";
import { compress } from "./compress";
import { Log } from "./log";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default createUnplugin<Options | undefined>((options) => ({
  name: "unplugin-compress",
  enforce: "post",
  buildEnd() {
    (async () => {
      // wait close bundle
      await sleep(500);
      Log.log("start compressing");
      let compressed = false;
      try {
        compressed = await compress(options);
      } catch (e) {
        Log.error(String(e));
      }
      if (compressed) {
        Log.success("compressed success");
      }
    })();
  },
}));
