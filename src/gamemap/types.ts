import { FaceDir } from "../spatial";

export type Edge = "UpperNw" | "UpperNe" | "UpperSw" | "UpperSe" | "LowerNw" | "LowerNe" | "LowerSw" | "LowerSe";

export type CellFaceData = {
    visible: boolean;
    passable: boolean;
    texture?: string;
    textureScale?: [number, number];
};

export type CellData = {
    faces: Record<FaceDir, CellFaceData>;
    yOffsets: Record<Edge, number>;
    value: boolean;
};



export type GameMapData = {
    cells: CellData[][];
};
