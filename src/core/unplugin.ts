import { createUnplugin } from "unplugin";
import type { Options } from "../types";
import { compress } from "./compress";

export default createUnplugin<Options | undefined>((options) => ({
  name: "unplugin-compress",
  buildEnd() {
    compress(options);
  },
}));
