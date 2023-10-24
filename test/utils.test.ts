import { describe, it, expect } from "vitest";
import { Source } from "../src/types";
import { resolveOptions, resolveSources, getSourceOutput } from "../src/core/utils";
import { existsSync } from "fs";
import { resolve } from "path";

const options = resolveOptions()

describe("resolveSources", () => {
  it("default source", () => {
    const source = resolveSources(options);
    expect(source).toMatchInlineSnapshot(`
      [
        {
          "adapter": "zip",
          "compressingOptions": undefined,
          "formatter": "{{name}}.{{ext}}",
          "outDir": "./",
          "source": "dist",
        },
      ]
    `)
  });
  it("object source", () => {
    const source = resolveSources({
      ...options, source: {
        source: "dist",
      }
    });
    expect(source).toMatchInlineSnapshot(`
      [
        {
          "adapter": "zip",
          "compressingOptions": undefined,
          "formatter": "{{name}}.{{ext}}",
          "outDir": "./",
          "source": "dist",
        },
      ]
    `)
  });
  it("apply globalOptions", () => {
    const source = resolveSources({
      ...options,
      outDir: "./",
      formatter: "{{source}}-.{{adapter}}",
      adapter: "tgz",
      source: [
        {
          source: "dist",
        },
        {
          source: "dist",
          adapter: "tar",
        },
      ]
    })
    expect(source).toMatchInlineSnapshot(`
      [
        {
          "adapter": "tgz",
          "compressingOptions": undefined,
          "formatter": "{{source}}-.{{adapter}}",
          "outDir": "./",
          "source": "dist",
        },
        {
          "adapter": "tar",
          "compressingOptions": undefined,
          "formatter": "{{source}}-.{{adapter}}",
          "outDir": "./",
          "source": "dist",
        },
      ]
    `)
  });
});

describe("getSourceOutput", () => {
  it("get name by default template string", () => {
    const name = getSourceOutput({
      ...options,
      source: 'dist'
    });
    expect(name).toBe("dist.zip");
  });
  it("get name by customize template string", () => {
    const name = getSourceOutput({
      ...options,
      source: "./path/to/dist",
      formatter: "hi-{{name}}.{{adapter}}",
    });
    expect(name).toBe("hi-dist.zip");
  });
  it("get name by customize formatter", () => {
    const name = getSourceOutput({
      ...options,
      source: "dist", 
      formatter: (s) => {
        return s.source;
      },
    });
    expect(name).toBe("dist");
  });
});

// describe("compress", () => {
//   it("compress dist to dist.zip", async () => {
//     await compress();
//     const isExist = existsSync(resolve(process.cwd(), "dist.zip"));
//     expect(isExist).toBeTruthy();
//   });
//   it("compress src to dist.zip", async () => {
//     await compress({
//       source: "src",
//       formatter: "dist.{{ext}}",
//     });
//     const isExist = existsSync(resolve(process.cwd(), "dist.zip"));
//     expect(isExist).toBeTruthy();
//   });
//   it("compress dist to yyyy-MM-DD.tar", async () => {
//     const now = new Date("2022-10-23");
//     const basename = `${now.getFullYear()}-${
//       now.getMonth() + 1
//     }-${now.getDate()}`;
//     await compress({
//       source: "src",
//       adapter: "tar",
//       formatter: (s) => {
//         return `${basename}.${s.adapter}`;
//       },
//     });
//     const isExist = existsSync(resolve(process.cwd(), "2022-10-23.tar"));
//     expect(isExist).toBeTruthy();
//   });

//   it("compress dist to dist.zip with compressingOptions", async () => {
//     await compress({
//       compressingOptions: {
//         ignoreBase: true
//       }
//     });
//     const isExist = existsSync(resolve(process.cwd(), "dist.zip"));
//     expect(isExist).toBeTruthy();
//   });
// });
