export interface TileProps {
  x: number;
  y: number;
  value: number;
  isNew?: boolean;
}

export interface GameStateProps {
  tiles: TileProps[];
  points: number;
  bestScore: number;
}