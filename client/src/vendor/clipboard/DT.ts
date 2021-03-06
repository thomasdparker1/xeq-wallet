const dataTypes = [
  "text/plain",
  "text/html",
];

// TODO: Dedup with main file?
function warnOrLog() {
  // tslint:disable-next-line: no-console
  (console.warn || console.log).call(arguments);
} // IE9 workaround (can't bind console functions).
const warn = warnOrLog.bind(console, "[clipboard-polyfill]");
let showWarnings = true;
export function suppressDTWarnings() {
  showWarnings = false;
}

export class DT {
  private m: {[key: string]: string} = {};

  public setData(type: string, value: string): void {
    if (showWarnings && dataTypes.indexOf(type) === -1) {
      // @ts-ignore
      warn("Unknown data type: " + type, "Call clipboard.suppressWarnings() " +
        "to suppress this warning.");
    }

    this.m[type] = value;
  }

  public getData(type: string): string | undefined {
    return this.m[type];
  }

  // TODO: Provide an iterator consistent with DataTransfer.
  public forEach(f: (value: string, key: string) => void): void {
    // tslint:disable-next-line: forin
    for (const k in this.m) {
      f(this.m[k], k);
    }
  }
}
