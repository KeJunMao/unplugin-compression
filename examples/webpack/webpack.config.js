import Compression from "unplugin-compression/webpack";
/** @typedef {import('webpack').Configuration} WebpackConfig **/
/** @type WebpackConfig */
export default {
  plugins: [Compression()],
};
