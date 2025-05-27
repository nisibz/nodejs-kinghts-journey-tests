type node = {
  master?: number[];
  current: number[];
  step: number;
  child: node[];
};

function parsePosition(pos: string): number[] {
  if (pos.length > 2) throw Error("Invalid position");
  const col = pos[0].toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
  if (col > 7) throw Error("Invalid position");
  const row = parseInt(pos[1], 10) - 1;
  if (row > 7) throw Error("Invalid position");
  return [row, col];
}

function createBoard(): number[][] | string[][] {
  const length = 8;
  const arr = Array.from({ length }, () => Array.from({ length }, () => 0));
  return arr;
}

function getMinMove(
  start: string,
  target: string,
  brokenTiles: string[],
): number {
  const [rowStart, colStart] = parsePosition(start);
  const [rowTarget, colTarget] = parsePosition(target);
  if (rowStart == rowTarget && colStart == colTarget) return 0;

  const broken = brokenTiles.map((bt) => parsePosition(bt));
  const board = createBoard();

  broken.forEach((element) => {
    const [row, col] = element;
    board[row][col] = 1;
  });
  board[rowStart][colStart] = "S";
  board[rowTarget][colTarget] = "T";

  const knightMove = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  const node: node = {
    current: [rowStart, colStart],
    step: 0,
    child: [],
  };

  let currentNode = [node];
  let minmove: number = 0;
  while (!minmove) {
    const newNode: node[] = [];
    currentNode.forEach((element) => {
      knightMove.forEach((move) => {
        try {
          if (
            board[element.current[0] + move[0]][element.current[1] + move[1]] ==
            0
          ) {
            board[element.current[0] + move[0]][element.current[1] + move[1]] =
              "M";
            const newChild = {
              master: [element.current[0], element.current[1]],
              step: element.step + 1,
              current: [
                element.current[0] + move[0],
                element.current[1] + move[1],
              ],
              child: [],
            };
            element.child.push(newChild);
            newNode.push(newChild);
          } else if (
            board[element.current[0] + move[0]][element.current[1] + move[1]] ==
            "T"
          ) {
            minmove = element.step + 1;
            const newChild = {
              master: [element.current[0], element.current[1]],
              step: element.step + 1,
              current: [
                element.current[0] + move[0],
                element.current[1] + move[1],
              ],
              child: [],
            };
            element.child.push(newChild);
          }
        } catch (error) {}
      });
    });
    // console.table(board);
    currentNode = newNode;
  }
  // console.dir(node, { depth: null });
  // console.log(parsePosition(start));
  // console.log(parsePosition(target));
  return minmove;
}

const minimumMoves = getMinMove("A1", "H8", ["B2", "C3"]);
console.log(`Minimum moves required: ${minimumMoves}`);
