import { create } from "zustand";
import { CellData, CellFaceData } from "./types";
import { immer } from "zustand/middleware/immer";
import { FaceDir } from "../spatial";


export type MapState = {
    cells: CellData[][];
};

export type MapActions = {
    setCell: (pos: [number, number], cell: CellData) => void;
    setCellFace: (pos: [number, number], dir: FaceDir, data: CellFaceData) => void;
    setMap: (map: MapState) => void;
}

export type MapStore = MapState & {actions: MapActions};

export const useMapStore = create<MapStore>()(immer((set) => ({
    cells: [],
    actions: {
        setCell: (pos, cell) => set((state) => {
            const [x, y] = pos;
            state.cells[y][x] = cell;
            return state;
        }),
        setCellFace: (pos, dir, data) => set((state) => {
            const [x, y] = pos;
            state.cells[y][x].faces[dir] = data;
            return state;
        }),
        setMap: (map) => set({cells: map.cells}),
    }
})));

export const useMap = () => useMapStore((state) => state.cells);
export const useMapCells = () => useMapStore((state) => state.cells);
export const useMapActions = () => useMapStore((state) => state.actions);

