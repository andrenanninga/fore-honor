import * as CANNON from "cannon";
import * as THREE from "three";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useRender } from "react-three-fiber";

// Cannon-world context provider
const context = React.createContext<CANNON.World>(null);

function PhysicsProvider({ children }) {
  // Set up physics
  const [world] = useState(() => new CANNON.World());

  useEffect(() => {
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
    world.gravity.set(0, -9.82, 0);
  }, [world]);

  // Run world stepper every frame
  useRender(() => world.step(1 / 60), false);

  // Distribute world via context
  return <context.Provider value={world} children={children} />;
}

// Custom hook to maintain a world physics body
function useCannon({ ...props }, fn, deps = []) {
  const ref = useRef<THREE.Object3D>();
  // Get cannon world object
  const world = useContext(context);
  // Instanciate a physics body
  const [body] = useState(() => new CANNON.Body(props));

  useEffect(() => {
    // Call function so the user can add shapes
    fn(body);
    // Add body to world on mount
    world.addBody(body);
    // Remove body on unmount
    return () => world.remove(body);
  }, deps);

  useRender(() => {
    if (ref.current) {
      // Transport cannon physics into the referenced threejs object
      ref.current.position.set(
        body.position.x,
        body.position.y,
        body.position.z
      );
      ref.current.quaternion.set(
        body.quaternion.x,
        body.quaternion.y,
        body.quaternion.z,
        body.quaternion.w
      );
    }
  }, false);

  return [ref, body] as const;
}

export { PhysicsProvider, useCannon };
