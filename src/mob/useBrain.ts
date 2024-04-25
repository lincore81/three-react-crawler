import { useEffect, useMemo, useState } from "react";
import { usePartyMapPos } from "../party/PartyStore";
import { createActorUuid, isScheduled, useCurrentActor, useQueue, useScheduleActions } from "../schedule/schedule.store";
import { Vec2i, add, chebyshov, manhattan, sign, sub, } from "../lib/spatial";
import { MobDef } from "./types";
import { useMapCells } from "../map/mapStore";
import { canPassByVec } from "../map/tools";

export const useBrain = (pos: Vec2i, setPos: (pos: Vec2i) => void, mobDef: MobDef, disabled?: boolean) => {
    const myUuid = useMemo(() => createActorUuid(mobDef.name), []);
    const playerPos = usePartyMapPos();
    const actor = useCurrentActor();
    const [inRange, setInRange] = useState(false);
    const { scheduleTurn, advance, purge } = useScheduleActions();
    const map = useMapCells();

    useEffect(function rangeCheck() {
        if (disabled) return;
        const dist = chebyshov(pos, playerPos);
        setInRange(dist <= mobDef.aggroRange && dist > 0);
    }, [playerPos, pos, disabled]);

    useEffect(function onRangeChange() {
        if (disabled) return;
        if (inRange) {
            scheduleTurn(myUuid, mobDef.turnDelay);
        } else {
            purge(myUuid);
        } 
    }, [disabled, inRange]);

    useEffect(function stalkPlayer() {
        if (disabled) return;
        if (actor !== myUuid) return;
        console.log("Stalking player", actor, myUuid);
        const shouldMove = manhattan(pos, playerPos) > 1;
        console.log("Should move?", shouldMove, pos, playerPos);
        if (inRange && !shouldMove) {
            console.log("Whack!");
        } else if (shouldMove && inRange) {
            const [dx, dy] = sub(playerPos, pos);
            const candidates: [Vec2i, Vec2i] = Math.abs(dx) > Math.abs(dy) 
                ? [[dx, 0], [0, dy]]
                : [[0, dy], [dx, 0]];
            const move = candidates
                .map(sign)
                .filter(([x, y]) => Math.abs(x) + Math.abs(y) === 1)
                .find((vec) => canPassByVec(map, pos, vec));
            console.log("Move?", move, candidates);
            if (move) setPos(add(pos, move));
        }
        if (inRange) scheduleTurn(myUuid, mobDef.turnDelay);
        advance();
    }, [actor, disabled]);
};
