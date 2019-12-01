import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import { Controls } from "./OrbitControls";
import { Ground } from "./Ground";
import { Box } from "./Box";
import { Knight } from "./Knight";
import { PhysicsProvider } from "./Cannon";

const Scene = () => (
  <Canvas camera={{ position: new THREE.Vector3(5, 2, 5) }}>
    <PhysicsProvider>
      <Ground />

      <axesHelper />

      <Knight />

      <Controls />
    </PhysicsProvider>
  </Canvas>
);

export { Scene };
