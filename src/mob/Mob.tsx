import { FC, useState } from "react";
import { Vec2i } from "../lib/spatial";
import { MobStandee } from "./MobStandee";
import { useBrain } from "./useBrain";
import { MobDef } from "./types";

export type MobProps = {
    initialPos: Vec2i;
    mobDef: MobDef;
}

export const Mob: FC<MobProps> = (props) => {
    const {initialPos, mobDef} = props;
    const [pos, setPos] = useState(initialPos);
    useBrain(pos, setPos, mobDef);
    return <MobStandee pos={pos} texture={mobDef.texture} />;
};
