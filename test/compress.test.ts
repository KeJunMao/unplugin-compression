import {
  normalizerSource,
  getCompressName,
  compress,
} from "../src/core/compress";
import { describe, it, expect } from "vitest";
import { Source } from "../src/types";
import { existsSync } from "fs";
import { resolve } from "path";

describe("normalizerSource", () => {
  it("string to Source[]", () => {
    const globalOptions: Omit<Source, "source"> = {};
    const source = normalizerSource("dist", globalOptions);
    expect(source[0]).toEqual({
      source: "dist",
      outDir: "./",
      adapter: "zip",
      formatter: "{{source}}.{{adapter}}",
    });
  });
  it("source to Source[]", () => {
    const globalOptions: Omit<Source, "source"> = {};
    const source = normalizerSource(
      {
        source: "dist",
      },
      globalOptions
    );
    expect(source[0]).toEqual({
      source: "dist",
      outDir: "./",
      adapter: "zip",
      formatter: "{{source}}.{{adapter}}",
    });
  });
  it("apply globalOptions", () => {
    const globalOptions: Omit<Source, "source"> = {
      outDir: "./",
      formatter: "{{source}}-.{{adapter}}",
      adapter: "tgz",
    };
    const source = normalizerSource(
      [
        {
          source: "dist",
        },
        {
          source: "dist",
          adapter: "tar",
        },
      ],
      globalOptions
    );
    expect(source[0]).toEqual({
      source: "dist",
      outDir: "./",
      adapter: "tgz",
      formatter: "{{source}}-.{{adapter}}",
    });
    expect(source[1]).toEqual({
      source: "dist",
      outDir: "./",
      adapter: "tar",
      formatter: "{{source}}-.{{adapter}}",
    });
  });
});

describe("getCompressName", () => {
  it("get name by default template string", () => {
    const source = normalizerSource("dist", {});
    const name = getCompressName(source[0]);
    expect(name).toBe("dist.zip");
  });
  it("get name by customize template string", () => {
    const source = normalizerSource("./path/to/dist", {
      formatter: "{{name}}.{{adapter}}",
    });
    const name = getCompressName(source[0]);
    expect(name).toBe("dist.zip");
  });
  it("get name by customize formatter", () => {
    const source = normalizerSource("dist", {
      formatter: (s) => {
        return s.source;
      },
    });
    const name = getCompressName(source[0]);
    expect(name).toBe(source[0].source);
  });
});

describe("compress", () => {
  it("compress dist to dist.zip", async () => {
    await compress();
    const isExist = existsSync(resolve(process.cwd(), "dist.zip"));
    expect(isExist).toBeTruthy();
  });
  it("compress src to dist.zip", async () => {
    await compress({
      source: "src",
      formatter: "dist.{{ext}}",
    });
    const isExist = existsSync(resolve(process.cwd(), "dist.zip"));
    expect(isExist).toBeTruthy();
  });
  it("compress dist to yyyy-MM-DD.tar", async () => {
    const now = new Date("2022-10-23");
    const basename = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()}`;
    await compress({
      source: "src",
      adapter: "tar",
      formatter: (s) => {
        return `${basename}.${s.adapter}`;
      },
    });
    const isExist = existsSync(resolve(process.cwd(), "2022-10-23.tar"));
    expect(isExist).toBeTruthy();
  });
});
