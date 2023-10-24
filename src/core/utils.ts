import path from "path";
import { ResolvedOptions, ResolvedSource, Source, UserOptions } from "../types";


export function resolveOptions(options: UserOptions = {}): ResolvedOptions {
  return {
    source: 'dist',
    adapter: 'zip',
    outDir: './',
    formatter: "{{name}}.{{ext}}",
    compressingOptions: undefined,
    ...options
  }
}

export function resolveSources({ source, ...options }: ResolvedOptions): ResolvedSource[] {
  let sources: Source[] = []
  if (typeof source === "string") {
    sources = [{ source }]
  } else if (!Array.isArray(source)) {
    sources = [source]
  } else {
    sources = [...source]
  }
  return sources.map(s => {
    const source: ResolvedSource = {
      source: s.source,
      outDir: s.outDir ?? options.outDir,
      adapter: s.adapter ?? options.adapter,
      formatter: s.formatter ?? options.formatter,
      compressingOptions: s.compressingOptions ?? options.compressingOptions
    }
    return source
  })
}

export function getSourceOutput(source: ResolvedSource) {
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
