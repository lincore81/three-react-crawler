import { Vector3 } from "@react-three/fiber";
import { CellData } from "./types";
import { FC } from "react";
import { MapCellFace } from "./MapCellFace";
import { FaceDir } from "../spatial";

export type MapCellProps = {
    data: CellData
    position: Vector3
}

export const MapCell: FC<MapCellProps> = ({ data, position }) => {
    return (
        <group position={position}>
            {Object.entries(data.faces).map(([direction, faceData]) => 
                <MapCellFace 
                    key={direction} 
                    data={faceData} 
                    direction={direction as FaceDir} 
                />
            )}
        </group>
    );
};
