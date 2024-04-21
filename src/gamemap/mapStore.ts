import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { CellData, CellFaceData } from "./types";
import { FaceDir } from "../spatial";
import { TextureSheet } from "../useTextureSheet";


export type MapState = {
    cells: CellData[][];
    sheet: TextureSheet;
};

export type MapActions = {
    setCell: (pos: [number, number], cell: CellData) => void;
    setCellFace: (pos: [number, number], dir: FaceDir, data: CellFaceData) => void;
    setMap: (map: MapState) => void;
    setCells: (cells: CellData[][]) => void;
    setSheet: (sheet: TextureSheet) => void;
}

export type MapStore = MapState & {actions: MapActions};


export const defaultTextureSheet: TextureSheet = {
    texture: 'textures/map-sheet2x.png',
    itemWidthPx: 64,
    itemHeightPx: 64,
    names: {
        'bricks-big': [0, 0],
        'bricks-castle': [1, 0],
        'bricks-clay': [2, 0],
        'bricks-dungeon': [3, 0],
        'bricks-dungeon-cell': [4, 0],
        'bricks-goo': [5, 0],
        'bricks-porcelain': [6, 0],
        'bricks-red': [7, 0],
        'bricks-round': [0, 1],
        'bricks-slim': [1, 1],
        'dirt': [2, 1],
        'stones-flat': [3, 1],
        'stones-gold': [4, 1],
        'stones-gray': [5, 1],
        'stones-icey': [6, 1],
        'stones-path': [7, 1],
        'rock-slim': [0, 2],
        'wood-door': [1, 2],
        'stones-lava': [2, 2],
        'wood-planks-doorway': [3, 2],
        'wood-planks-window': [4, 2],
        'wood-planks': [5, 2],
    },
};

export const useMapStore = create<MapStore>()(immer((set) => ({
    cells: [],
    sheet: defaultTextureSheet,
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
        setCells: (cells) => set({cells}),
        setMap: (map) => set({
            cells: map.cells,
            sheet: map.sheet,
        }),
        setSheet: (sheet) => set({sheet}),
    }
})));

export const useMapCells = () => useMapStore((state) => state.cells);
export const useMapSheet = () => useMapStore((state) => state.sheet);
export const useMapActions = () => useMapStore((state) => state.actions);

