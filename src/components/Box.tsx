import React from "react";
import * as CANNON from "cannon";
import random from "lodash/random";
import { useCannon } from "./Cannon";

const Box = ({ position }) => {
  // Register box as a physics body with mass
  const [ref, body] = useCannon({ mass: 0.001 }, body => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)));
    body.position.set(...position);
  });

  React.useEffect(() => {
    setInterval(() => {
      body.position.x += random(-0.5, 0.5);
      body.position.y += 4 + random(-0.5, 0.5);
      body.position.z += random(-0.5, 0.5);
      body.quaternion.x += random(-0.5, 0.5);
      body.quaternion.z += random(-0.5, 0.5);
    }, 4000);
  }, []);

  return (
    <mesh ref={ref}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
};

export { Box };
