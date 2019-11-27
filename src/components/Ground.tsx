import React from "react";
import * as CANNON from "cannon";
import { useCannon } from "./Cannon";

const Ground = () => {
  // Register plane as a physics body with zero mass

  const ref = useCannon({ mass: 0 }, body => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(10, 0.001, 10)));
  });

  return <gridHelper ref={ref} args={[20, 20]} />;
};

export { Ground };
