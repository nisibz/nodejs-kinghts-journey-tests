import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function parsePosition(pos: string): number[] {
  const col = pos[0].toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
  const row = parseInt(pos[1], 10) - 1;
  return [row, col];
}

function getMinMove(
  start: string,
  target: string,
  brokenTitles: string[],
): number {
  console.log(parsePosition(start));
  console.log(parsePosition(target));
  const broken = brokenTitles.map((bt) => parsePosition(bt));
  console.log(broken);

  return 0;
}

async function main() {
  try {
    let brokenTitles: string[] = [];
    const start = await ask("start (e.g., a1 - h8): ");
    const target = await ask("target (e.g., a1 - h8): ");
    const brokenInput = await ask(
      "brokenTitles (comma-separated, e.g., a2,b3): ",
    );
    brokenTitles = brokenInput.split(",");
    console.log(getMinMove(start, target, brokenTitles));
  } catch (err) {
    console.error(err);
  } finally {
    rl.close();
  }
}

main();
