import { compress } from "../src/core/compress";

compress({
  source: "dist",
  adapter: "tgz",
});
