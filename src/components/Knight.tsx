import React from "react";
import { useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import * as CANNON from "cannon";
import { useCannon } from "./Cannon";

const Knight = () => {
  const arrow = React.useRef<THREE.Object3D>();

  const [ref, body] = useCannon({ mass: 0.001 }, body => {
    body.addShape(new CANNON.Sphere(0.5));
    body.position.y = 0.5;
  });

  const target = React.useRef<THREE.Object3D>();

  const vec = new THREE.Vector3();
  const pos = new THREE.Vector3();
  useFrame(({ camera, mouse, size }) => {
    vec.set(mouse.x, mouse.y, 0.5);
    vec.unproject(camera);
    vec.sub(camera.position).normalize();
    const distance = (0 - camera.position.y) / vec.y;
    pos.copy(camera.position).add(vec.multiplyScalar(distance));
    arrow.current.position.copy(ref.current.position);
    target.current.position.copy(pos);
    arrow.current.lookAt(pos);
    arrow.current.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
  });

  React.useEffect(() => {
    const handler = () => {
      const force = new CANNON.Vec3(
        body.position.x - pos.x,
        body.position.y - pos.y,
        body.position.z - pos.z
      ).scale(0.1);
      body.applyForce(force, new CANNON.Vec3(pos.x, 0.5, pos.z));
    };

    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry attach="geometry" args={[0.5]} />
        <meshNormalMaterial attach="material" wireframe />
      </mesh>

      <axesHelper ref={target} />

      <group ref={arrow} rotation={new THREE.Euler(0, 0, 0)}>
        <arrowHelper
          args={[
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(0, 0, 0),
            1,
            0x000000
          ]}
        />
      </group>
    </group>
  );
};

export { Knight };
