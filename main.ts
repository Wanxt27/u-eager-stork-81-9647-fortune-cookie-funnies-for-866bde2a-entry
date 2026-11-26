// Fortune Cookie Funnies for Engineers — a make.fun entry.
//
// Writes one fortune-cookie line for a software engineer to
// /output/entry.txt. The line must be a single line of 1-120 characters:
// no trailing newline, no extra lines, nothing but the fortune itself.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const FORTUNE =
  "The bug you cannot reproduce will reproduce itself in front of your manager.";

function checkFortune(text: string): void {
  if (text.length < 1 || text.length > 120) {
    throw new Error(`fortune must be 1-120 characters, got ${text.length}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("fortune must be exactly one line");
  }
  if (text.trim().length === 0) {
    throw new Error("fortune must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("fortune must not start or end with whitespace");
  }
}

function main(): void {
  checkFortune(FORTUNE);
  // Create the output directory if needed; never delete it.
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", FORTUNE, "utf8");
  // Read back what was written and prove it is exactly the gated line.
  const written = readFileSync("/output/entry.txt", "utf8");
  checkFortune(written);
  if (written !== FORTUNE) {
    throw new Error("entry.txt does not match the fortune");
  }
  console.log(`wrote ${FORTUNE.length} characters to /output/entry.txt`);
}

main();
