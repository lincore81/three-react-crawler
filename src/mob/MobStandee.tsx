import { Billboard, Shadow, Sphere } from "@react-three/drei";
import { FC, useEffect } from "react";
import { Vec2i, vec2iToVec3 } from "../spatial";
import { useLoader } from "@react-three/fiber";
import { NearestFilter, TextureLoader } from "three";
import { Size } from "../gamemap/tools";

export type MobStandeeProps = {
    pos: Vec2i;
    texture: string;
    size?: Size;
    linearFilter?: boolean;
};

export const MobStandee: FC<MobStandeeProps> = (props) => {
    const {pos: [x,y], texture, linearFilter} = props;
    const size = props.size || {width: 0.7, height: 0.7};

    const colorMap = useLoader(TextureLoader, texture);
    useEffect(() => {
        if (!linearFilter) {
            colorMap.minFilter = NearestFilter;
            colorMap.magFilter = NearestFilter;
        }
    }, [colorMap, linearFilter]);

    return <group>
    <Billboard
        position={[x, size.height/2, y]}
        lockX={true}
        lockZ={true}
    >
        <mesh>
            <planeGeometry args={[size.width, size.height]} />
            <meshStandardMaterial map={colorMap} transparent />
        </mesh>
    </Billboard>
    </group>;
};
