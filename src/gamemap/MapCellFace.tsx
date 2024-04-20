import { FC } from "react";
import { CellFaceData } from "./types";
import { Euler, Vector3 } from "@react-three/fiber";
import { FaceDir } from "../spatial";

export type MapCellFaceProps = {
    data: CellFaceData
    direction: FaceDir
}

type FaceDirMapping = Record<FaceDir, { 
    position: Vector3, 
    rotation: Euler, 
    size: [number, number]
}>;
const faceDirectionTransform: FaceDirMapping = {
    'north': { 
        position: [0, 0.5, -0.5], 
        rotation: [0, 0, 0],
        size: [1, 1]
    },
    'south': { 
        position: [0, 0.5, 0.5], 
        rotation: [0, -Math.PI, 0],
        size: [1, 1]
    },
    'east': { 
        position: [0.5, 0.5, 0], 
        rotation: [0, -Math.PI / 2, 0],
        size: [1, 1]
    },
    'west': { 
        position: [-0.5, 0.5, 0], 
        rotation: [0, Math.PI / 2, 0],
        size: [1, 1]
    },
    'up': { 
        position: [0, 1, 0], 
        rotation: [Math.PI / 2, 0, 0],
        size: [1, 1]
    },
    'down': { 
        position: [0, 0.0, 0], 
        rotation: [-Math.PI / 2, 0, 0],
        size: [1, 1]
    },
};

type FaceColorMapping = Record<FaceDir, number>;
const faceDirectionToColor: FaceColorMapping = {
    'north': 0xff0000,
    'south': 0x00ff00,
    'east': 0x0000ff,
    'west': 0xffff00,
    'up': 0xff00ff,
    'down': 0x00ffff,
};


export const MapCellFace: FC<MapCellFaceProps> = ({ data, direction }) => {
    const {size, ...posAndRot} = faceDirectionTransform[direction];
    return ( data.visible &&
        <mesh visible={data.visible} {...posAndRot}>
            <planeGeometry args={size} />
            <meshStandardMaterial color={faceDirectionToColor[direction]} />
        </mesh>
    );
};
