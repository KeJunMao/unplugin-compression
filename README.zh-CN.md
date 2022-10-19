<img src="./assets/logo.svg" alt="logo of vite-plugin-patch-env repository" width="100" height="100" align="right" />

# unplugin-compression

> 压缩 dist 为 `zip`, `tar`, `taz`. 由 [unplugin](https://github.com/unjs/unplugin) 驱动

[English](./README.md) | 简体中文

## 安装

```bash
pnpm i -D unplugin-compression
```

## 使用

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

## 配置

```ts
Compression({
    // 可以使用 `zip`, `tar`, `taz`
    adapter: "zip"
    // 要压缩的目录的相对路径
    source: "dist"
    // 要输出的目录的相对路径
    outDir: "./"
    // 压缩后的文件名
    formatter: "{{name}}.{{ext}}"
})
```

### `adapter`

全局适配器。当 source 未设置适配器时，使用全局适配器。

更多 [compressing](https://github.com/node-modules/compressing)

### `source`

压缩源, 可以设置为 `string` 或 `Source` 或 `Source[]`

如果你使用 `Source` 时并配置了 `adapter` 或 `outDir` 或 `formatter` 选项, 将覆盖全局选项。

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

压缩文件输出目录。

### `formatter`

压缩后的文件名格式化器。 默认值为 `{{name}}.{{ext}}`.

```ts
interface template extends Omit<Source, "formatter"> {
  name: string;
  ext: string;
}
```

还可以设置为函数

```ts
Compression({
  formatter(source) {
    return `Hello.${source.adapter}`;
  },
});
```