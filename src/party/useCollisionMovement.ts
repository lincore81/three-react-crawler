import { useMapStore } from "../gamemap/mapStore";
import { canPass, getCell } from "../gamemap/tools";
import { RelativeDir, offsetToCardinalDir, translateRelative } from "../spatial";
import { usePartyMapPos, usePartyLookDir, usePartyActions } from "./PartyStore";

/**
 * Check for map collision and move the player if possible.
 */
export const useCollidableMovement = () => {
    const position = usePartyMapPos();
    const lookDir = usePartyLookDir();
    const {move} = usePartyActions();
    const {cells} = useMapStore(); 
    return (moveDir: RelativeDir) => {
        const offset = translateRelative(moveDir, lookDir);
        const absoluteLookDir = offsetToCardinalDir(offset);
        if (canPass(cells, position, absoluteLookDir)) {
            move(moveDir);
        }

    }
};
