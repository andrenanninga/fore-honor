import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import { Controls } from "./OrbitControls";
import { Ground } from "./Ground";
import { Box } from "./Box";
import { PhysicsProvider } from "./Cannon";

const Scene = () => (
  <Canvas camera={{ position: new THREE.Vector3(5, 2, 5) }}>
    <PhysicsProvider>
      <Ground />

      <axesHelper />

      <Box position={[0, 5, 0]} />
      <Box position={[0.4, 4, 1]} />
      <Box position={[-0.4, 6, 0]} />
      <Box position={[1.1, 6, 2]} />

      <Controls />
    </PhysicsProvider>
  </Canvas>
);

export { Scene };
