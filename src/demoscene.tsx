import { FC } from "react";
import { Grid, KeyboardControls, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { GameMap } from "./gamemap/GameMap";
import { useMapGen } from "./gamemap/useMapGen";
import { PartySpatial, keyboardMap } from "./party/PartySpatial";
import { demoMap } from "./main";
import { MobStandee } from "./mob/MobStandee";
import { useDebugStores } from "./debugStores";




export const DemoScene: FC = () => {
    const mapData = useMapGen(demoMap);
    useDebugStores();
    return <KeyboardControls map={keyboardMap}>
        <PartySpatial offset={[0, 1, 0]} />
        <Grid
            args={[20, 20]}
            cellColor={0xcccccc}
            cellSize={1}
            sectionColor={0x999999}
            sectionSize={10}
            position={[0.5, 0, 0.5]}
        />
        <ambientLight intensity={Math.PI} color="#331133" />
        <GameMap data={mapData} position={[0, -0.01, 0]} />
        <MobStandee pos={[1, 0]} texture="mob/groblin.png" />
    </KeyboardControls>;
};
