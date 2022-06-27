import { startsWith } from "./utils";
import type { ConversionTableEntry } from "./types";

export class Converter {
  private queue: string[] = [];
  private output: string[] = [];
  private prevKanzen: ConversionTableEntry | null = null;

  constructor(private table: ConversionTableEntry[]) { }

  public confirm() {
    return this.output.join("");
  }

  public input(char: string) {
    this.queue.push(char);

    const kanzens = this.table
      .filter((entry) => this.queue.length === entry.from.length)
      .filter((entry) => startsWith(entry.from, this.queue));
    const [kanzen] = kanzens;

    const zenpous = this.table
      .filter((entry) => this.queue.length < entry.from.length)
      .filter((entry) => startsWith(entry.from, this.queue));
    const [zenpou] = zenpous;

    if (kanzen === undefined) {
      if (zenpou === undefined) {
        if (this.prevKanzen === null) {
          // :(
          this.output.push(...this.queue);
          this.queue = [];
        } else {
          this.output.push(this.prevKanzen.to);
          this.queue = [...this.prevKanzen.next, char];
          this.prevKanzen = null;
        }
      } else {
        // :)
      }
    } else if (kanzens.length === 1) {
      if (zenpou === undefined) {
        this.output.push(kanzen.to);
        this.queue = [...kanzen.next];
        this.prevKanzen = null;
      } else {
        this.prevKanzen = kanzen;
      }
    } else {
      // :(
    }
  }
}
