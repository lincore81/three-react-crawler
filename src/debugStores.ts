import { useAppActions, useAppStore } from "./app/store/app.store";
import { useMapStore } from "./map/mapStore";
import { usePartyStore } from "./party/PartyStore";
import { useScheduleStore } from "./schedule/schedule.store";

export const useDebugStores = () => {
    const map = useMapStore();
    const party = usePartyStore();
    const app = useAppActions();
    const schedule = useScheduleStore();
    //@ts-ignore
    window.stores = {map, party, schedule};
    //@ts-ignore
    window.brightlight = app.brightLight;
    //@ts-ignore
    window.freelook = app.freeLook;
    //@ts-ignore
    window.edit = app.edit;
    
};
