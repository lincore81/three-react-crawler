import { FC } from "react";
import { usePartyActions } from "../party/PartyStore";
import { useCollidableMovement } from "../party/useCollisionMovement";


export const MovementButtons: FC = () => {
    const { rotate } = usePartyActions();
    const move = useCollidableMovement();

    const turnLeft = '↰';
    const turnRight = '↱';
    const forward = '↑';
    const backward = '↓';

    return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
        <div />
        <button style={{ fontSize: "large" }} onClick={() => move('forward')}>{forward}</button>
        <div />
        <button style={{ fontSize: "large" }} onClick={() => rotate('left')}>{turnLeft}</button>
        <button style={{ fontSize: "large" }} onClick={() => move('backward')}>{backward}</button>
        <button style={{ fontSize: "large" }} onClick={() => rotate('right')}>{turnRight}</button>
        <div style={{ fontFamily: "sans-serif", fontSize: "small", color: "gainsboro", gridColumn: "1 / span 3" }}>Or use WASD/arrow keys</div>
    </div>;
};
