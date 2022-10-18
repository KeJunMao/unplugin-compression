import * as compressing from "compressing";
import path, { resolve } from "path";
import { FormatterOptions, Options, Source } from "../types";

function formatSource(
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
    const defaultFormatter = (s: FormatterOptions) =>
      `${s.source}.${s.adapter}`;
    return {
      source: s.source ?? "dist",
      outDir: s.outDir ?? globalOptions.outDir ?? "./",
      adapter: s.adapter ?? globalOptions.adapter ?? "zip",
      formatter: s.formatter ?? globalOptions.formatter ?? defaultFormatter,
    };
  });
  return source as any;
}

export async function compress({
  source: rawSource = "dist",
  ...options
}: Options = {}) {
  const source = formatSource(rawSource, options);
  await Promise.all(
    source.map(async (s) => {
      const compressAdapter = compressing[s.adapter];
      const resolvedSource = resolve(process.cwd(), s.source);
      const resolvedOutput = path.join(
        resolve(process.cwd(), s.outDir),
        `${s.source}.${s.adapter}`
      );
      await compressAdapter.compressDir(resolvedSource, resolvedOutput);
    })
  );
}
