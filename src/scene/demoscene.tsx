import { FC } from "react";
import { Grid, KeyboardControls, OrbitControls, PerspectiveCamera, Plane } from '@react-three/drei'
import { GameMap } from "../map/GameMap";
import { useMapGen } from "../map/useMapGen";
import { PartySpatial, keyboardMap } from "../party/PartySpatial";
import { useDebugStores } from "../debugStores";
import { demoMap } from "./testmap";
import { useAppFreeLook, useAppBright as useBrightLight } from "../app/store/app.store";
import { MOUSE } from "three";
import { Mob } from "../mob/Mob";

// import { OrbitControls } from "three-stdlib";


export const DemoScene: FC = () => {
    const cells = useMapGen(demoMap);
    const freeLook = useAppFreeLook();
    const brightLight = useBrightLight();
    const [w, h] = [cells?.[0]?.length, cells.length];
    useDebugStores();
    return <KeyboardControls map={keyboardMap}>
        {freeLook
            ? <>
                <OrbitControls enablePan enableZoom mouseButtons={{ MIDDLE: MOUSE.ROTATE, RIGHT: MOUSE.PAN }} />
                <PerspectiveCamera makeDefault position={[0, 5, 5]} />
                <group position={[w / 2 - 0.5, 0, h / 2 - 0.5]}>
                    <Plane
                        args={[w, h, w, h]}
                        onClick={console.log}
                        rotation-x={-Math.PI / 2} 
                        material-color={0xffffff}
                        material-transparent
                        material-opacity={0.4}
                    />
                    <Grid args={[w, h]} />
                </group>
            </>
            : <PartySpatial offset={[0, 1, 0]} />
        }
        <ambientLight intensity={Math.PI} color={brightLight ? "#ffffff" : "#331133"} />
        <GameMap data={cells} position={[0, -0.01, 0]} />
        <Mob 
            initialPos={[5, 0]} 
            mobDef={{ name: "Groblin", texture: "mob/groblin.png", turnDelay: 2.2, aggroRange: 4, size: 1 }} 
        />

        <Mob 
            initialPos={[6, 6]} 
            mobDef={{ name: "Groblin", texture: "mob/groblin.png", turnDelay: 2.2, aggroRange: 4, size: 1 }} 
        />
    </KeyboardControls>;
};
