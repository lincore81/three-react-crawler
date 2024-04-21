
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


const getNeighbours = (map: (false|CellDef)[][], [x, y]: [number, number]) => {
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

export type CellDef = Record<FaceDir, string>;

export type MapDef = {
    map: string[];
    empty: string;
    legend: Record<string, CellDef>;
}

const createCellData = (map: (false|CellDef)[][], pos: [number, number], value: false|CellDef): CellData => {
    const neighbours = getNeighbours(map, pos);
    const faces = ['north', 'south', 'east', 'west', 'up', 'down'];
    const neededFaces = faces.filter(dir => !neighbours.find(n => n.dir === dir && n.value));
    return {
        faces: Object.fromEntries(faces.map(dir => {
            const visible = value && neededFaces.includes(dir);
            return [dir, { 
                visible, 
                passable: !visible,
                texture: !value ? undefined : value[dir as FaceDir],
            }];
        })),
        value,
    } as CellData;
};

export const useMapGen = (mapDef: MapDef) => {
    const { map, empty, legend } = mapDef;
    const mapData = useMapCells();
    const {setMap} = useMapActions();
    useEffect(() => {
        const cellDefMap = map.map(row => row.split('').map(char => char !== empty && legend?.[char]));
        if (!cellDefMap.length) throw new Error('Empty map');
        if (!cellDefMap.every(row => row.length === cellDefMap[0].length)) 
            throw new Error('Map is not rectangular');

        const _mapData: CellData[][] = cellDefMap.map((row, y) => 
            row.map((cell, x) => createCellData(cellDefMap, [x, y], cell))
        );
        setMap({cells: _mapData});
    }, [mapDef]);
    console.log(mapDef.map.join('\n'));
    console.log(mapData);
    return mapData;
}
