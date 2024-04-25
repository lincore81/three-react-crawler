import { KeyboardControls, PerspectiveCamera, useKeyboardControls } from "@react-three/drei";
import { FC, useEffect, useMemo, useState } from "react";
import { usePartyActions, usePartyLookDir, usePartyMapPos } from "./PartyStore";
import { cardinalToRotation, vec2iToVec3 } from "../lib/spatial";
import { useCollidableMovement } from "./useCollidableMovement";
import { createActorUuid, useCurrentActor, useScheduleActions } from "../schedule/schedule.store";


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
    const currentActor = useCurrentActor();
    const {scheduleTurn, advance} = useScheduleActions();
    const uuid = useMemo(() => createActorUuid('Player'), []);
    const turnDelay = 2;

    useEffect(() => {
        scheduleTurn(uuid, 0, true);
        advance();
    }, [uuid]);

    useEffect(() => {
        if (turnRight) {
            rotate('right');
        } else if (turnLeft) {
            rotate('left');
        }
    }, [currentActor, turnRight, turnLeft]);

    useEffect(() => {
        if (currentActor !== uuid) return;
        if (forward) {
            console.log("Moving forward");
            move('forward');
        } else if (backward) {
            console.log("Moving backwards");
            move('backward');
        } else return;
        scheduleTurn(uuid, turnDelay, true);
        setTimeout(() => advance(), 200);
    }, [currentActor, forward, backward]);

    return <group position={vec2iToVec3(position, 0)} rotation={cardinalToRotation(dir)}>
        <PerspectiveCamera 
            makeDefault 
            position={[0, 0.5, 0.5]} 
        />
        <pointLight position={[0, 0.5, 0.1]} color="#ccaa66" intensity={5} />
    </group>;
};
