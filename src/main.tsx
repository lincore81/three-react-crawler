import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { DemoScene } from './scene/demoscene'
import { StrictMode } from 'react';
import './index.css';
import { MapDebugUi } from './gui/MapDebugUi';
import { MovementButtons } from './gui/MovementButtons';
import { SchedulerList } from './gui/SchedulerList';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div style={{ position: "relative" }}>
            <div style={{ zIndex: 10, padding: "8px", position: "absolute", top: 0, left: 0, background: "black", color: "white" }}>
                <MapDebugUi />
                <SchedulerList />
            </div>
            <div style={{ zIndex: 10, padding: "8px", position: "absolute", bottom: 0, left: 0}}>
                <MovementButtons />
            </div>
            <Canvas 
                style={{ width: "100vw", height: "100vh", backgroundColor: "#222" }}>
                <DemoScene />
            </Canvas>
        </div>
    </StrictMode>
);
