function knightMoves(start, end) {
  // Define the possible moves a knight can make.
  const moves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  // Create a chessboard as a 2D array to keep track of visited squares.
  const boardSize = 8; // Assuming an 8x8 chessboard.
  const chessboard = Array.from({ length: boardSize }, () => Array(boardSize).fill(false));

  // Create a queue for BFS and initialize it with the starting square.
  const queue = [[start[0], start[1]]];
  chessboard[start[0]][start[1]] = true;

  // Create a parent dictionary to track the path.
  const parent = {};

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    if (x === end[0] && y === end[1]) {
      // We reached the target square. Reconstruct the path.
      const path = [[x, y]];
      let current = parent[`${x}-${y}`];
      while (current) {
        path.push(current);
        current = parent[`${current[0]}-${current[1]}`];
      }
      return path.reverse();
    }

    // Explore possible knight moves.
    for (const [dx, dy] of moves) {
      const newX = x + dx;
      const newY = y + dy;

      if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && !chessboard[newX][newY]) {
        queue.push([newX, newY]);
        chessboard[newX][newY] = true;
        parent[`${newX}-${newY}`] = [x, y];
      }
    }
  }

  // If no path is found, return an empty array.
  return [];
}

// Example usage:
console.log(knightMoves([3, 3], [4, 3]));