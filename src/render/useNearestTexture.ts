import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { TextureLoader, NearestFilter, RepeatWrapping } from "three";


export type UseNearestOptions = {
    linearFilter?: boolean,
    scale: [number, number],
};

export const useNearestTexture = (texture: string, options?: UseNearestOptions) => {
    const { linearFilter, scale } = options ?? {};
    const colorMap = useLoader(TextureLoader, texture);
    useEffect(() => {
        if (!linearFilter) {
            colorMap.minFilter = NearestFilter;
            colorMap.magFilter = NearestFilter;
        }
        if (scale) {
            colorMap.wrapS = RepeatWrapping;
            colorMap.wrapT = RepeatWrapping;
            colorMap.repeat.set(scale[0], scale[1]);
        }
    }, [colorMap, linearFilter]);
    return colorMap;
};
