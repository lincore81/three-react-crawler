import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { CardinalDir, RelativeDir, TurnDir, Vec2i, cardinalDirsCw, localToGlobalVec2i, translateRelative } from "../spatial";


export type PartyState = {
    mapPos: Vec2i;
    lookDir: CardinalDir;
    noclip: boolean;
};

export type PartyActions = {
    setMapPos: (pos: Vec2i) => void;
    move: (dir: RelativeDir) => void;
    setLookDir: (dir: CardinalDir) => void;
    rotate: (dir: TurnDir) => void;
    setNoClip: (noclip: boolean) => void;
}

export type PartyStore = PartyState & {actions: PartyActions};

export const usePartyStore = create<PartyStore>()(immer((set) => ({
    mapPos: [0, 0],
    lookDir: 'east',
    noclip: false,
    actions: {
        setMapPos: (pos) => set({mapPos: pos}),
        move: (moveDir) => set((state) => {
            const [mx, my] = translateRelative(moveDir, state.lookDir)
            state.mapPos = [state.mapPos[0] + mx, state.mapPos[1] + my];
        }),
        setNoClip: (noclip) => set({noclip}),
        setLookDir: (dir) => set({lookDir: dir}),
        rotate: (dir) => set((state) => {
            const idx = cardinalDirsCw.indexOf(state.lookDir);
            const offset = dir === 'left' ? -1 : 1;
            const newIdx = (idx + offset + cardinalDirsCw.length) % cardinalDirsCw.length;
            state.lookDir = cardinalDirsCw[newIdx];
        }),
    }
})));

export const usePartyMapPos = () => usePartyStore((state) => state.mapPos);
export const usePartyNoclip = () => usePartyStore((state) => state.noclip);
export const usePartyLookDir = () => usePartyStore((state) => state.lookDir);
export const usePartyActions = () => usePartyStore((state) => state.actions);

