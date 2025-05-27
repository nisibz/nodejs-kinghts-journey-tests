# Knight's Path Finder

A TypeScript implementation for finding the minimum knight moves on a chessboard with obstacles.

## Features

- Calculate minimum knight moves between positions
- Handle broken/blocked tiles
- Validate chessboard positions (A1-H8 format)
- Create and manage virtual chessboard state

## Installation

1. Clone repository:

```bash
git clone https://github.com/nisibz/nodejs-kinghts-journey-tests.git
cd nodejs-kinghts-journey-tests
```

2. Install dependencies:

```bash
npm install
```

3. Build project:

```bash
npm run build
```

4. Start the application:

```bash
npm run start
```

## Approach

- Uses BFS algorithm for optimal pathfinding
- Chessboard positions parsed using algebraic notation
- Handles blocked tiles through adjacency list modifications
- Type-safe implementation with position validation
