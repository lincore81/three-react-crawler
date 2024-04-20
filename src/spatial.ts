import { Euler } from "@react-three/fiber";

export type Vec2i = [number, number];
export type Neighbour<T> = { of: Vec2i, dir: CardinalDir, pos: Vec2i, cell?: T };
export type CardinalDir = 'north' | 'south' | 'east' | 'west';
export type RelativeDir = 'forward' | 'right' | 'backward' | 'left';
export type FaceDir = CardinalDir | 'up' | 'down';
export type TurnDir = 'left' | 'right';

export const cardinalDirsCw = ['north', 'east', 'south', 'west'] as const;
export const relativeDirsCw = ['forward', 'right', 'backward', 'left'] as const;
export const faceDirs = ['north', 'east', 'south', 'west', 'up', 'down'] as const;

export const cardinalToRelativeDir = (cardinalDir: CardinalDir): RelativeDir => {
    const idx = cardinalDirsCw.indexOf(cardinalDir);
    return relativeDirsCw[idx];
}

export const relativeToCardinalDir = (relativeDir: RelativeDir): CardinalDir => {
    const idx = relativeDirsCw.indexOf(relativeDir);
    return cardinalDirsCw[idx];
}

export const cardinalEulers: Record<CardinalDir, Euler> = {
    'north': [0, 0, 0],
    'south': [0, -Math.PI, 0],
    'east': [0, -Math.PI / 2, 0],
    'west': [0, Math.PI / 2, 0],
};

export const cardinalOffsets: Record<CardinalDir, Vec2i> = {
    'north': [0, -1],
    'south': [0, 1],
    'east': [1, 0],
    'west': [-1, 0]
};

const moveOffsets: Record<RelativeDir, Record<CardinalDir, Vec2i>> = {
    forward: { north: [0, -1], east: [1, 0], south: [0, 1], west: [-1, 0], },
    right: { north: [1, 0], east: [0, -1], south: [-1, 0], west: [0, 1], },
    backward: { north: [0, 1], east: [-1, 0], south: [0, -1], west: [1, 0], },
    left: { north: [-1, 0], east: [0, 1], south: [1, 0], west: [0, -1], },
};

export const translateRelative = (translateDir: RelativeDir, lookDir: CardinalDir, n = 1): Vec2i => {
    const [x, y] = moveOffsets[translateDir][lookDir];
    return [x * n, y * n];
};

export const offsetToCardinalDir = ([x, y]: Vec2i): CardinalDir => {
    if (x === 0 && y === -1) return 'north';
    if (x === 1 && y === 0) return 'east';
    if (x === 0 && y === 1) return 'south';
    if (x === -1 && y === 0) return 'west';
    throw new Error('Invalid offset');
}

export const localToGlobalVec2i = (lookdir: CardinalDir | RelativeDir, [x, y]: Vec2i): Vec2i => {
    switch (lookdir) {
        case 'forward': 
        case 'north': 
            return [x, y];
        case 'backward':
        case 'south': 
            return [-x, -y];
        case 'right':
        case 'east': 
            return [y, -x];
        case 'left':
        case 'west': 
            return [-y, x];
    }
};

export const globalToLocalVec2i = (lookdir: CardinalDir, [x, y]: Vec2i): Vec2i => {
    switch (lookdir) {
        case 'north': return [x, y];
        case 'south': return [-x, -y];
        case 'east': return [-y, x];
        case 'west': return [y, -x];
    }
}

export const cardinalToRotation = (dir: CardinalDir): Euler => 
    cardinalEulers[dir];

export const cardinalToOffset = (dir: CardinalDir): Vec2i => 
    cardinalOffsets[dir];

export const vec2iToVec3 = ([x, y]: Vec2i, z = 0): [number, number, number] => [x, z, y];
export const vec3ToVec2i = ([x, _, y]: [number, number, number]): Vec2i => [x, y]; 
