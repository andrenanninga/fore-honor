import React from "react";
import * as CANNON from "cannon";
import { useCannon } from "./Cannon";

const Box = ({ position }) => {
  // Register box as a physics body with mass
  const ref = useCannon({ mass: 1 }, body => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)));
    body.position.set(...position);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
};

export { Box };
