import React from "react";
import { extend, useThree, useFrame } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const Controls = () => {
  const controls = React.useRef<OrbitControls>();
  const { camera, gl } = useThree();

  useFrame(() => {
    controls.current.update();
  });

  return (
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.5}
    />
  );
};

export { Controls };
