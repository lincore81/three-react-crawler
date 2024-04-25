import { create } from "zustand";
import { Vec2i } from "../lib/spatial";
import { immer } from "zustand/middleware/immer";

export type MobState = {
    uuidToPos: Record<string, Vec2i>;
    posToUuid: Record<string, string>;
};

export type MobActions = {
    setPosition: (uuid: string, pos: Vec2i) => void;
};

export type MobStore = MobState & {actions: MobActions};

export const useMobStore = create<MobStore>()(immer((set) => ({
    uuidToPos: {},
    posToUuid: {},
    actions: {
        setPosition: (uuid, pos) => set((state) => {
            const oldPos = state.uuidToPos[uuid];
            if (oldPos) {
                delete state.posToUuid[oldPos.toString()];
            }
            state.uuidToPos[uuid] = pos;
            state.posToUuid[pos.toString()] = uuid;
        }),
    },
})));

export const useMobPosition = (uuid: string) => useMobStore((state) => state.uuidToPos[uuid]);
export const useMobLookup = (pos: Vec2i) => useMobStore((state) => state.posToUuid[pos.toString()]);
export const useMobActions = () => useMobStore((state) => state.actions);
