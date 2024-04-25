import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { assert } from '../lib/assert';

export type ScheduledAction = { uuid: string, time: number, isPlayer: boolean };

export type ScheduleState = {
    turn: number;
    isPlayerTurn: boolean;
    currentActor?: string;
    queue: ScheduledAction[];
}

export type ScheduleActions = {
    /** Advance to the next turn */
    advance: () => void;
    /** Remove a mob from the schedule (most likely because they are dead) */
    purge: (uuid: string) => void;
    /** Schedule a mob to act after a delay (in turns, not real time) */
    scheduleTurn: (uuid: string, time: number, isPlayer?: boolean) => void;
}

export type ScheduleStore = ScheduleState & {actions: ScheduleActions};

export const useScheduleStore = create<ScheduleStore>()(immer((set) => ({
    turn: 0,
    isPlayerTurn: false,
    currentActor: undefined,
    queue: [],
    actions: {
        advance: () => set((state) => {
            const next = state.queue.shift();
            if (!next) {
                throw new Error('No actions scheduled');
            }
            state.turn = Math.max(state.turn, next.time);
            state.isPlayerTurn = next.isPlayer;
            state.currentActor = next.uuid;
            console.log(`turn @${state.turn} for ${next.uuid}`);
        }),
        purge: (uuid) => set((state) => {
            console.log('purging', uuid);
            state.queue = state.queue.filter((a) => a.uuid !== uuid);
        }),
        scheduleTurn: (uuid, delay, isPlayer = false) => set((state) => {
            assert(isFinite(delay), 'delay must be finite');
            console.log(`scheduling turn for ${uuid} at ${state.turn + delay}`);
            state.queue.push({ 
                uuid, 
                isPlayer,
                time: state.turn + delay, 
            });
            state.queue.sort((a, b) => a.time - b.time);
        }),
    },
})));

export const createActorUuid = (name?: string) => `${name ? `${name}-` : ''}${uuid()}`;
export const isScheduled = (schedule: ScheduledAction[], uuid: string) => 
    schedule.some((a) => a.uuid === uuid);

export const useTurn = () => useScheduleStore((state) => state.turn);
export const useIsPlayerTurn = () => useScheduleStore((state) => state.isPlayerTurn);
export const useCurrentActor = () => useScheduleStore((state) => state.currentActor);
export const useQueue = () => useScheduleStore((state) => state.queue);
export const useScheduleActions = () => useScheduleStore((state) => state.actions);
