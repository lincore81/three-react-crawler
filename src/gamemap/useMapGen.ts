
/* 
 * Generate a map from a string.
 *
    "      ",
    " #### #",
    " #    #",
    " # ## #",
    "   #   ",
    "   #   ",
];
 */

import { useEffect, useMemo } from "react";
import { CellData } from "./types";
import { getCell } from "./tools";
import { FaceDir } from "../spatial";
import { useMapActions, useMapCells, useMapStore } from "./mapStore";


const getNeighbours = (map: boolean[][], [x, y]: [number, number]) => {
    if (!map.length) return [];

    const dir2offset = ([
        { dir: 'north', pos: [x, y - 1] },
        { dir: 'south', pos: [x, y + 1] },
        { dir: 'east', pos: [x + 1, y] },
        { dir: 'west', pos: [x - 1, y] },
    ] as { dir: FaceDir, pos: [number, number] }[])

    return dir2offset.map(({ dir, pos }) => {
        return ({
            dir,
            pos,
            value: !!getCell(map, pos),
        })
    });
}

const createCellData = (map: boolean[][], pos: [number, number], value: boolean): CellData => {
    const neighbours = getNeighbours(map, pos);
    const faces = ['north', 'south', 'east', 'west', 'up', 'down'];
    const neededFaces = faces.filter(dir => !neighbours.find(n => n.dir === dir && n.value));
    return {
        faces: Object.fromEntries(faces.map(dir => {
            const visible = value && neededFaces.includes(dir);
            return [dir, { visible, passable: !visible }];
        })),
        value,
    } as CellData;
};

export const useMapGen = (mapDef: string[]) => {
    const mapData = useMapCells();
    const {setMap} = useMapActions();
    useEffect(() => {
        const rawMap: boolean[][] = mapDef.map(row => row.split('').map(cell => cell !== '#'));
        if (!rawMap.length) throw new Error('Empty map');
        if (!rawMap.every(row => row.length === rawMap[0].length)) 
            throw new Error('Map is not rectangular');
        const _mapData: CellData[][] = rawMap.map((row, y) => 
            row.map((cell, x) => createCellData(rawMap, [x, y], cell))
        );
        setMap({cells: _mapData});
    }, [mapDef]);
    console.log(mapDef.join('\n'));
    console.log(mapData);
    return mapData;
}
