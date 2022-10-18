export const Adapter = ["tar", "tgz", "zip"] as const;
export type adapterType = typeof Adapter[number];

export type FormatterOptions = Omit<Required<Source>, "formatter">;
export type Formatter = (options: FormatterOptions) => string;
export interface Source {
  source: string;
  outDir?: string;
  adapter?: adapterType;
  formatter?: Formatter;
}
export interface Options {
  /**
   * Compressing adapter
   * @default "zip"
   */
  adapter?: adapterType;
  source?: string | Source | Source[];
  outDir?: string;
  formatter?: Formatter;
}
