import * as compressing from "compressing";
import path, { resolve } from "path";
import { Options, Source } from "../types";
import fs from "fs/promises";
import { Log } from "./log";
/**
 * normalizer source to Source[]
 */
export function normalizerSource(
  source: string | Source | Source[],
  globalOptions: Omit<Options, "source">
): Required<Source>[] {
  if (typeof source === "string") {
    source = {
      source,
    };
  }
  if (!Array.isArray(source)) {
    source = [source];
  }
  source = source.map((s) => {
    const defaultFormatter = "{{name}}.{{ext}}";
    return {
      source: s.source ?? "dist",
      outDir: s.outDir ?? globalOptions.outDir ?? "./",
      adapter: s.adapter ?? globalOptions.adapter ?? "zip",
      formatter: s.formatter ?? globalOptions.formatter ?? defaultFormatter,
      compressingOptions: s.compressingOptions ?? globalOptions.compressingOptions ?? undefined
    };
  });
  return source as any;
}

/**
 * get compress name from source formatter
 */
export function getCompressName(source: Required<Source>) {
  const { formatter, ...s } = source;
  const extra = {
    name: path.basename(s.source),
    ext: s.adapter,
  };
  if (typeof formatter === "string") {
    const template: Record<string, any> = { ...s, ...extra };
    return formatter.replace(/\{\{(\w+)\}\}/g, ($_, $1: string) => {
      const value = template[$1];
      if (value !== undefined) {
        return value;
      }
      return $_;
    });
  }
  return formatter(s);
}

export async function compress({
  source: rawSource = "dist",
  ...options
}: Options = {}) {
  const source = normalizerSource(rawSource, options);
  await Promise.all(
    source.map(async (s) => {
      const compressAdapter = compressing[s.adapter];
      const resolvedSource = resolve(process.cwd(), s.source);
      const fileName = getCompressName(s);
      const resolvedOutput = path.join(
        resolve(process.cwd(), s.outDir),
        fileName
      );
      await compressAdapter.compressDir(resolvedSource, resolvedOutput, s.compressingOptions);
      const stat = await fs.stat(resolvedOutput);
      Log.success(`${fileName}\t${stat.size} bytes`);
    })
  );
  return true;
}
