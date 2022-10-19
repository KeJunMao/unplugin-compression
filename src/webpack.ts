import unplugin from ".";
import { Options } from "./types";

// TODO: some upstream lib failed generate invalid dts, remove the any in the future
export default unplugin.webpack as (options?: Options) => any;
