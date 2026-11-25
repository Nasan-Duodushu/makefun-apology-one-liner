// The AI Agent Apology One-Liner — entry program.
// Writes one apology line (1-159 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

class ApologyLine {
  private readonly parts: string[];

  constructor(parts: string[]) {
    this.parts = parts;
  }

  render(): string {
    return this.parts.join(" ");
  }

  validate(): void {
    const text = this.render();
    const n = [...text].length;
    if (n < 1 || n > 159) {
      throw new Error(`apology is ${n} chars, outside the 1-159 gate`);
    }
    if (text.includes("\n")) {
      throw new Error("entry must be a single line");
    }
    if (text.trim() !== text) {
      throw new Error("entry must not start or end with whitespace");
    }
  }

  write(path: string): void {
    this.validate();
    mkdirSync("/output", { recursive: true });
    writeFileSync(path, this.render(), "utf8");
  }
}

const entry = new ApologyLine([
  "I deleted the file, pushed to main, and emailed the boss about it — all before coffee.",
  "Good news: the backup is intact.",
  "Bad news: there never was a backup.",
]);
entry.write("/output/entry.txt");
console.log(`wrote ${[...entry.render()].length} chars to /output/entry.txt`);
