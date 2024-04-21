import { FC, useMemo } from "react";

export type QuadProps = {
    vertices?: Float32Array;
    uvs?: Float32Array;
    colors?: number | Float32Array;
    yOffsets?: number[];
};

const defaultQuadVertices = new Float32Array([
    -0.5, -0.5, 0,
    0.5, -0.5, 0,
    0.5, 0.5, 0,
    -0.5, 0.5, 0,
]);

const defaultQuadNormals = new Float32Array([
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
]);

const quadIndices = new Uint16Array([
    0, 1, 3,
    2, 3, 1,
]);

const defaultQuadUvs = new Float32Array([
    0, 0,
    1, 0,
    1, 1,
    0, 1, 
    // black if all < 1 && >= 0
]);

/**
 * Must be used within a <mesh> component.
 */
export const Quad: FC<QuadProps> = (props) => {
    const uvs = props.uvs ?? defaultQuadUvs;
    return <bufferGeometry attach="geometry" name="quad">
        <bufferAttribute
            attach='attributes-position'
            array={defaultQuadVertices}
            count={defaultQuadVertices.length / 3}
            itemSize={3}
        />
        <bufferAttribute
            attach='attributes-normal'
            array={defaultQuadNormals}
            count={defaultQuadNormals.length / 3}
            itemSize={3}
        />
        <bufferAttribute
            attach='attributes-color'
            array={useMemo(() => new Float32Array(16).fill(1), [])}
            count={4}
            itemSize={4}
        />
        <bufferAttribute
            attach="index"
            array={quadIndices}
            count={quadIndices.length}
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
