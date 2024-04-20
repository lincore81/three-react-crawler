import { FaceDir } from "../spatial";

export type CellFaceData = {
    // TODO: texture
    visible: boolean;
    passable: boolean;
};

export type CellData = {
    faces: Record<FaceDir, CellFaceData>;
    value: boolean;
};



export type GameMapData = {
    cells: CellData[][];
};
