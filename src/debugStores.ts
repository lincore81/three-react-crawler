import { useMapStore } from "./gamemap/mapStore";
import { usePartyStore } from "./party/PartyStore";

export const useDebugStores = () => {
    const map = useMapStore();
    const party = usePartyStore();
    //@ts-ignore
    window.stores = {map, party};
};
