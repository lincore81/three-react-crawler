import { create } from "zustand";
import { immer } from "zustand/middleware/immer";


export type AppActions = {
    brightLight: () => void;
    freeLook: () => void;
    edit: () => void;
}

export type AppStore = {
    bright: boolean;
    freeLook: boolean;
    editMode: boolean;
    actions: AppActions;
};

export const useAppStore = create<AppStore>()(immer((set) => ({
    bright: false,
    freeLook: false,
    editMode: false,
    actions: {
        edit: () => set((state) => ({
            editMode: !state.editMode,
            bright: !state.editMode,
            freeLook: !state.editMode,
        })),
        brightLight: () => set((state) => {
            state.bright = !state.bright;
        }),
        freeLook: () => set((state) => {
            state.freeLook = !state.freeLook;
        }),
    }
})));

export const useAppActions = () => useAppStore(state => state.actions);
export const useAppBright = () => useAppStore(state => state.bright);
export const useAppFreeLook = () => useAppStore(state => state.freeLook);
export const useEditMode = () => useAppStore(state => state.editMode);
