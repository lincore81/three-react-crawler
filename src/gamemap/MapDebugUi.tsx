import { FC } from "react";
import { usePartyMapPos } from "../party/PartyStore";
import { useMapCells } from "./mapStore";

export const MapDebugUi: FC = () => {
    const cells = useMapCells();
    const partyPos = usePartyMapPos();
    const mapStr = cells.map((row, y) => row.map((cell, x) => {
        if (x === partyPos[0] && y === partyPos[1]) return '@';
        return cell.value ? '.' : '#';
    }).join('')).join('\n');
    return !!cells.length && <div style={{fontSize: "small"}}>
        <p>Data:</p>
        <pre>{mapStr}</pre>
    </div>;
};
