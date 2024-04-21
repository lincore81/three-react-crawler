import { FC } from "react";

export type QuadProps = {
    vertices?: Float32Array;
    uvs?: Float32Array;
    colors?: number | Float32Array;
    yOffsets?: number[];
};

const positions = new Float32Array([
    -0.5, -0.5, 0,
    0.5, -0.5, 0,
    0.5, 0.5, 0,
    -0.5, 0.5, 0,
]);

const normals = new Float32Array([
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
]);

const colors = new Float32Array([
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
]);

const indices = new Uint16Array([
    0, 1, 3,
    2, 3, 1,
]);

const uvs = new Float32Array([
    0, 0,
    1, 0,
    1, 1,
    0, 1,
]);

export const Quad: FC<QuadProps> = (props) => {
    const ps = props.vertices || positions
    if (props.yOffsets) {
        for (let i = 0; i < ps.length; i += 3) {
            ps[i + 1] += props.yOffsets?.[i / 3];
        }
    }
    const us = props.uvs || uvs;
    return <bufferGeometry attach="geometry">
        <bufferAttribute
            attach='attributes-position'
            array={positions}
            count={positions.length / 3}
            itemSize={3}
        />
        <bufferAttribute
            attach='attributes-normal'
            array={normals}
            count={normals.length / 3}
            itemSize={3}
        />
        <bufferAttribute
            attach='attributes-color'
            array={new Float32Array(16).fill(1)}
            count={4}
            itemSize={4}
        />
        <bufferAttribute
            attach="index"
            array={indices}
            count={indices.length}
            itemSize={1}
        />
        <bufferAttribute
            attach="attributes-uv"
            array={uvs}
            count={uvs.length / 2}
            itemSize={2}
        />
    </bufferGeometry>;
};
