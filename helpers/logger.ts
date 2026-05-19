export class Logger {
  static info(message: string): void {
    console.log(`[INFO] ${message}`);
  }

  static step(message: string): void {
    console.log(`[STEP] ${message}`);
  }

  static warn(message: string): void {
    console.warn(`[WARN] ${message}`);
  }
}
