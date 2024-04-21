import { Texture } from "three";
import { Vec2i } from "./spatial";
import { UseNearestOptions, useNearestTexture } from "./useNearestTexture";
import { useMemo } from "react";

export type TextureSheet = {
    texture: string;
    itemWidthPx: number;
    itemHeightPx: number;
    names: Record<string, Vec2i>;
}


const getSheetUvs = (size: Vec2i, sheet: TextureSheet, item: string | Vec2i): Float32Array => {
    const _item = typeof item === 'string' ? sheet.names?.[item] : item;
    console.log(_item);
    if (!_item) {
        console.error(`Item ${item} not found in sheet`);
        return new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
    }
    const [col, row] = _item;
    const [w, h] = size;
    const [nw, nh] = [
        sheet.itemWidthPx / w,
        sheet.itemHeightPx / h
    ];
    // 0, 0 is top left
    const bleed = 0.0005;
    const _00 = [((col + 1) * nw)-bleed, (1 - row * nh)];
    const _10 = [(col * nw)+bleed, (1 - row * nh)];
    const _11 = [(col * nw)+bleed, (1 - (row + 1) * nh)];
    const _01 = [((col + 1) * nw)-bleed, (1 - (row + 1) * nh)];
    return new Float32Array([
        ..._11,
        ..._01, 
        ..._00, 
        ..._10,
    ]);
};

export type UseTextureSheet 
    = (sheet: TextureSheet, item: string | Vec2i, opts?: UseNearestOptions) 
    => {texture: Texture, uvs: Float32Array};


export const useTextureSheet: UseTextureSheet = (sheet, item, opts) => {
    const texture = useNearestTexture(sheet.texture, opts);
    const uvs = useMemo(() => 
       getSheetUvs([texture.image.width, texture.image.height], sheet, item), 
       [sheet, item]);
    console.log('uvs', uvs);
    return {texture, uvs}; 
};
