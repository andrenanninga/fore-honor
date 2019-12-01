import React from "react";
import * as THREE from "three";
import * as CANNON from "cannon";
import { useCannon } from "./Cannon";

type Props = {
  size?: number;
};

const Ground = ({ size = 50 }) => {
  // Register plane as a physics body with zero mass

  const [ref] = useCannon({ mass: 0 }, body => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(size / 2, 0.001, size / 2)));
  });

  return (
    <group ref={ref}>
      <gridHelper args={[size, size]} />;
    </group>
  );
};

export { Ground };
