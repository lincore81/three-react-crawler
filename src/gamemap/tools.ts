
/*
 * ALWAYS ASSUMING ROW MAJOR ORDER.
 */

import { FaceDir, Neighbour, Vec2i, cardinalDirsCw, cardinalToOffset } from "../spatial";
import { CellData } from "./types";

export type Map<T> = T[][];
export type Size = { width: number, height: number };


// --- generic ---
export const inBounds = <T>(map: Map<T>, [x, y]: Vec2i): boolean =>
    y >= 0 && y < map.length && x >= 0 && x < map[y].length;

export const getCell = <T>(map: Map<T>, [x, y]: Vec2i, deflt: T | undefined = undefined) =>
    inBounds(map, [x, y]) ? map[y][x] : deflt;

export const setCell = <T>(map: Map<T>, [x, y]: Vec2i, value: T): boolean =>
    inBounds(map, [x, y]) ? (map[y][x] = value, true) : false;

export const getMapSize = <T>(map: Map<T>): Size => ({
    width: map?.[0]?.length ?? 0,
    height: map.length
});


export const getNeighbours = <T>(map: T[][], [x, y]: Vec2i): Neighbour<T>[] =>
    cardinalDirsCw.map(dir => {
        const [nx, ny] = cardinalToOffset(dir);
        const pos: Vec2i = [x + nx, y + ny];
        return { of: [x, y], dir, pos, cell: getCell(map, pos) };
    });


// --- GameMap specific ---
export const getCellFace = (map: CellData[][], [x, y]: Vec2i, dir: FaceDir) =>
    getCell(map, [x, y])?.faces[dir];

export const canPass = (map: CellData[][], [x, y]: Vec2i, dir: FaceDir) =>
    getCellFace(map, [x, y], dir)?.passable;

