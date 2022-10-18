import { createUnplugin } from "unplugin";
import type { Options } from "../types";
import { compress } from "./compress";

export default createUnplugin<Options | undefined>((options) => ({
  name: "unplugin-compress",
  enforce: "post",
  buildEnd() {
    setTimeout(async () => {
      await compress(options);
    }, 1000);
  },
}));
