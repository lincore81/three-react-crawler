import { Vector3 } from "@react-three/fiber";
import { CellData } from "./types";
import { FC } from "react";
import { MapCell } from "./MapCell";

export type GameMapProps = {
    data: CellData[][];
    position: Vector3;
}

export const GameMap: FC<GameMapProps> = ({ data, position }) => {
    if (!data.length) return null;
    return (
        <group position={position}>
            {data.map((row, y) => row.map((cell, x) => 
                <MapCell key={`${x},${y}`} data={cell} position={[x, 0, y]} />
            ))}
        </group>
    );
}
