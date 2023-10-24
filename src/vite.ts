import unplugin from ".";
import type { UserOptions } from "./types";

// TODO: some upstream lib failed generate invalid dts, remove the any in the future
export default unplugin.vite as (options?: UserOptions) => any;
