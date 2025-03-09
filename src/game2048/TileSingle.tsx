import { TileProps } from "./types";
import CSS from "./styles.module.css";

function TileSingle({ x, y, value }: TileProps) {
  return (
    <div
      className={
        CSS["tile"] + " " + (value === 0 ? CSS["empty"] : CSS["value"])
      }
      style={{ backgroundColor: `var(--value${value}-color)` }}
    >
      <div>{value}</div>
    </div>
  );
}
export default TileSingle;
