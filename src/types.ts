import type { Context } from "./core/context";

export const Adapter = ["tar", "tgz", "zip"] as const;
export type adapterType = typeof Adapter[number];

export type FormatterOptions = Omit<ResolvedSource, "formatter">;
export type Formatter = string | ((options: FormatterOptions) => string);
export type CompressingOptions = {
  [x: string]: any;
  ignoreBase?: boolean
}
export interface Source {
  source: string;
  outDir?: string;
  adapter?: adapterType;
  formatter?: Formatter;
  compressingOptions?: CompressingOptions
}

export interface ResolvedSource extends Required<Omit<Source, 'compressingOptions'>> {
  compressingOptions: CompressingOptions | undefined
}

export interface Options {
  /**
   * Compressing adapter
   * @default "zip"
   */
  adapter: adapterType;
  source: string | Source | Source[];
  outDir: string;
  formatter: Formatter;
  compressingOptions: CompressingOptions
  hooks: Partial<Hooks>;
}
export interface UserOptions extends Partial<Options> {}
export interface ResolvedOptions extends Omit<Options, 'compressingOptions'> {
  compressingOptions: CompressingOptions | undefined
}

export interface Hooks {
  "compress:prepare": (ctx: Context, source: ResolvedSource) => void | Promise<void>
  "compress:after": (ctx: Context, source: ResolvedSource & {
    resolvedInput: string
    resolvedOutput: string
  }) => void | Promise<void>
}