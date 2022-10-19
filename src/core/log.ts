import c from "picocolors";

export class Log {
  static log(msg: string) {
    console.log(
      `${c.inverse(c.bold(c.magenta("UNPLUGIN COMPRESSING")))} ${msg}`
    );
  }

  static error(msg: string) {
    console.log(
      `${c.inverse(c.bold(c.red("UNPLUGIN COMPRESSING")))} ${c.red(msg)}`
    );
  }

  static success(msg: string) {
    console.log(
      `${c.inverse(c.bold(c.green("UNPLUGIN COMPRESSING")))} ${c.green(msg)}`
    );
  }
}
