import { FC } from "react";
import { useCurrentActor, useQueue, useTurn } from "../schedule/schedule.store";

export const SchedulerList: FC = () => {
    const queue = useQueue();
    const currentActor = useCurrentActor();
    const turn = useTurn();
    return <div style={{background: "black", color: "white", fontFamily: "monospace"}}>
        <strong>Turn Scheduler</strong>
        <div>&gt; @{turn.toFixed(2)} {currentActor?.substring(0, 20) ?? "none"}</div>
        <div style={{display: "grid", gridTemplateColumns: "8ch 1fr", gap: "4px"}}>
            {queue.map((item, i) => 
                <> 
                    <div key={`${i}-time`}>@{item.time.toFixed(2)}</div>
                    <div key={`${i}-uuid`}>{item.uuid.substring(0, 20)}</div>
                </>
            )}
        </div>

    </div>;
};
