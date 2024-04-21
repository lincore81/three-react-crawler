import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { DemoScene } from './demoscene'
import { StrictMode } from 'react';
import './index.css';
import { MapDebugUi } from './gamemap/MapDebugUi';
import { MovementButtons } from './gui/MovementButtons';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div style={{ position: "relative" }}>
            <div style={{ zIndex: 10, padding: "8px", position: "absolute", top: 0, left: 0, background: "black", color: "white" }}>
                <MapDebugUi />
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
