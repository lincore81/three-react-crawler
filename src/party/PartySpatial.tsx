import { KeyboardControls, PerspectiveCamera, useKeyboardControls } from "@react-three/drei";
import { FC, useEffect, useState } from "react";
import { usePartyActions, usePartyLookDir, usePartyMapPos } from "./PartyStore";
import { cardinalToRotation, vec2iToVec3 } from "../spatial";
import { useCollidableMovement } from "./useCollisionMovement";


export type PartySpatialProps = {
    offset: [number, number, number];
}

export type Controls = 'forward' | 'backward' | 'turn right' | 'turn left';
export const keyboardMap: { name: Controls, keys: string[]}[] = [
    { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
    { name: 'backward', keys: ['KeyS', 'ArrowDown'] },
    { name: 'turn right', keys: ['KeyD', 'ArrowRight'] },
    { name: 'turn left', keys: ['KeyA', 'ArrowLeft'] },
];

export const PartySpatial: FC<PartySpatialProps> = ({offset}) => {
    const forward = useKeyboardControls(state => state['forward']);
    const backward = useKeyboardControls(state => state['backward']);
    const turnRight = useKeyboardControls(state => state['turn right']);
    const turnLeft = useKeyboardControls(state => state['turn left']);
    const position = usePartyMapPos();
    const dir = usePartyLookDir();
    const {rotate} = usePartyActions();
    const move = useCollidableMovement();

    useEffect(() => {
        if (turnRight) rotate('right');
        else if (turnLeft) rotate('left');
    }, [turnRight, turnLeft]);

    useEffect(() => {
        if (forward) move('forward');
        else if (backward) move('backward');
    }, [forward, backward]);

    return <group position={vec2iToVec3(position, 0)} rotation={cardinalToRotation(dir)}>
        <PerspectiveCamera 
            makeDefault 
            position={[0, 0.5, 0.5]} 
        />
        <pointLight position={[0, 0.5, 0.1]} color="#ccaa66" intensity={5} />
    </group>;
};
