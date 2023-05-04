<img src="./assets/logo.svg" alt="logo of vite-plugin-patch-env repository" width="100" height="100" align="right" />

# unplugin-compression

> Compress dist to `zip`, `tar`, `taz`. Powered by [unplugin](https://github.com/unjs/unplugin).

English | [简体中文](./README.zh-CN.md)

## Installation

```bash
pnpm i -D unplugin-compression
```

## Usage

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Compression from "unplugin-compression/vite";

export default defineConfig({
  plugins: [
    Compression({
      /* options */
    }),
  ],
});
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Compression from "unplugin-compression/rollup";

export default {
  plugins: [
    Compression({
      /* options */
    }),
  ],
};
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require("unplugin-compression/webpack")({
      /* options */
    }),
  ],
};
```

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require("unplugin-compression/webpack")({
        /* options */
      }),
    ],
  },
};
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from "esbuild";

build({
  /* ... */
  plugins: [
    require("unplugin-compression/esbuild")({
      /* options */
    }),
  ],
});
```

<br></details>

## Configuration

```ts
Compression({
    // you can use `zip`, `tar`, `taz`
    adapter: "zip"
    // relative paths to the directory to compress
    source: "dist"
    // relative paths to the directory to output
    outDir: "./"
    // compressed file name
    formatter: "{{name}}.{{ext}}"
})
```

### `adapter`

Global adapter. When the source does not set the adapter, the global adapter is used.

see [compressing](https://github.com/node-modules/compressing)

### `source`

The compress source, which can be set as `string` or `Source` or `Source[]`

If you use `Source` and set `adapter` or `outDir` or `formatter` options, it's cover global options.

```ts
Compression({
  source: [
    {
      // zip adapter, dist.zip
      source: "dist",
    },
    {
      // tar adapter, output.tar
      source: "output",
      adapter: "tar",
    },
  ],
});
```

### `outDir`

The compressed file output dir.

### `formatter`

The compressed filename formatter. default value is `{{name}}.{{ext}}`.

```ts
interface template extends Omit<Source, "formatter"> {
  name: string;
  ext: string;
}
```

you can also set a handler

```ts
Compression({
  formatter(source) {
    return `Hello.${source.adapter}`;
  },
});
```
