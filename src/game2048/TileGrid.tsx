import { useState } from "react";
import { TileProps } from "./types";
import TileSingle from "./TileSingle";

import CSS from "./game2048.module.css";

function TileGrid({ tiles }: { tiles: Array<TileProps> }) {
  return (
    <div className={CSS["container"]}>
      <div className={CSS["tile-grid"]}>
        {tiles?.map((t) => (
          <TileSingle
            key={t.x + "-" + t.y}
            x={t.x}
            y={t.y}
            value={t.value}
            isNew={t.isNew}
          ></TileSingle>
        ))}
      </div>
    </div>
  );
}

export default TileGrid;
