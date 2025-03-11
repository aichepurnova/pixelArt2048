import { TileProps } from "./types";

export const compareTwoArrayOfObjects = (
  first_array_of_objects: any[],
  second_array_of_objects: any[]
) => {
  return (
    first_array_of_objects.length === second_array_of_objects.length &&
    first_array_of_objects.every((element_1) =>
      second_array_of_objects.some((element_2) =>
        Object.keys(element_1).every((key) => element_1[key] === element_2[key])
      )
    )
  );
};

export const generateNewTiles = (count: number, add: number) => {
  const tiles: Array<TileProps> = [];
  for (let i = 0; i < count; i++) {
    let row = Math.floor(i / 4);
    let col = i % 4;
    tiles.push({ x: row, y: col, value: 0 });
  }
  for (let i = 0; i < add; i++) {
    addNewTile(tiles);
  }
  return tiles;
};

export const sumRepeatedNumbers = (
  arr: number[],
  reverse: boolean,
  points: number[]
): { newLine: number[]; points: number[] } => {
  // Step 1: Collect numbers while summing repeated ones
  let output = [];
  let input = arr.filter((x) => x !== 0);
  let n = input.length;

  for (let i = 0; i < n; i++) {
    if (i < n - 1 && input[i] === input[i + 1]) {
      // Sum repeated numbers
      output.push(input[i] * 2);
      points.push(input[i] * 2);
      i += 1; // Skip the next number as it's already summed
    } else {
      output.push(input[i]);
    }
  }

  // Step 3: Fill the result array with non-zero numbers from combined
  let num_of_zeros = arr.length - output.length;
  if (reverse) {
    for (let i = 0; i < num_of_zeros; i++) {
      output.push(0);
    }
  } else {
    for (let i = 0; i < num_of_zeros; i++) {
      output.unshift(0);
    }
  }

  return { newLine: output, points: points };
};

export const checkGameOver = (tiles: TileProps[]) => {
  let freeTiles = tiles.filter((t) => t.value === 0);
  let isFilled = freeTiles.length === 0;
  if (isFilled) {
    let possibleMoves = ["up", "down", "left", "right"];
    let canMove = false;
    for (let i = 0; i < possibleMoves.length; i++) {
      let result = moveTiles(tiles, possibleMoves[i]);
      if (!compareTwoArrayOfObjects(result.newTiles, tiles)) {
        canMove = true;
        break;
      }
    }
    return !canMove;
  } else {
    return false;
  }
};

export const addNewTile = (tiles: TileProps[]) => {
  let freeTiles = tiles.filter((t) => t.value === 0);
  let randomTile = freeTiles[Math.floor(Math.random() * freeTiles.length)];
  tiles.map((t) => {
    if (t.x === randomTile.x && t.y === randomTile.y) {
      t.value = 2;
      t.isNew = true
    }
  });
  console.log('add new tile', tiles); 
  return tiles;
};

export const moveTiles = (
  tiles: TileProps[],
  direction: string
): { newTiles: TileProps[]; addPoints: number[] } => {
  const isVertical = direction === "up" || direction === "down";
  const reverse = direction === "up" || direction === "left";
  console.log(direction, isVertical, reverse);

  // Create a 4x4 grid for easier manipulation
  const grid = Array.from({ length: 4 }, () => Array(4).fill(null));

  // Populate the grid with the tile values
  tiles.forEach((tile) => {
    if (isVertical) {
      grid[tile.y][tile.x] = tile.value;
    } else {
      grid[tile.x][tile.y] = tile.value;
    }
  });

  let points: number[] = [];

  for (let i = 0; i < 4; i++) {
    let result = sumRepeatedNumbers(grid[i], reverse, points);
    grid[i] = result.newLine;
    points = result.points;
  }

  let newTiles: TileProps[] = [];
  grid.map((r, i) =>
    r.map((v, j) => {
      let newTile = { x: i, y: j, value: v };
      if (isVertical) {
        newTile = { x: j, y: i, value: v };
      }
      newTiles.push(newTile);
    })
  );
  newTiles.sort((a, b) => a.x - b.x || a.y - b.y);

  return { newTiles: newTiles, addPoints: points };
};
