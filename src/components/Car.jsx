import { useBox } from '@react-three/cannon';
import { forwardRef, useImperativeHandle, useEffect } from 'react';
import { useCarControls } from '../store';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const BOUNDARY_RADIUS = 60; // Must match World.jsx

const Car = forwardRef((props, ref) => {
  const [carRef, api] = useBox(() => ({
    mass: 1,
    position: [0, 1, 0],
    args: [1.5, 0.5, 3],
    angularDamping: 0.95, // much higher for less drift
    linearDamping: 0.7,   // higher for less sliding
  }));

  useImperativeHandle(ref, () => carRef.current);

  // Lock rotation on X and Z axes
  useEffect(() => {
    api.rotation.set(0, 0, 0);
    api.angularFactor.set(0, 1, 0);
  }, [api]);

  const { forward, backward, left, right } = useCarControls();
  const gltf = useGLTF('/car.glb'); // path to your model

  useFrame(() => {
    if (!carRef.current) return;

    // Boundary check
    const pos = carRef.current.position;
    const dist = Math.sqrt(pos.x * pos.x + pos.z * pos.z);
    if (dist > BOUNDARY_RADIUS) {
      api.position.set(0, 1, 0);
      api.velocity.set(0, 0, 0);
      api.angularVelocity.set(0, 0, 0);
    }

    // Car movement
    let rotation = new THREE.Quaternion();
    carRef.current.getWorldQuaternion(rotation);
    let euler = new THREE.Euler().setFromQuaternion(rotation, 'YXZ');
    let angle = euler.y;

    const force = 100;   // Lower speed, more control
    const torque = 10;  // Easier turning
    let forwardVec = new THREE.Vector3(-Math.sin(angle), 0, -Math.cos(angle));

    // Apply movement
    if (forward) api.applyForce(forwardVec.clone().multiplyScalar(force).toArray(), [0, 0, 0]);
    if (backward) api.applyForce(forwardVec.clone().multiplyScalar(-force * 0.7).toArray(), [0, 0, 0]);
    if (left) api.applyTorque([0, torque, 0]);
    if (right) api.applyTorque([0, -torque, 0]);

    // Simulate friction/brake when not pressing forward/backward
    if (!forward && !backward) {
      api.velocity.subscribe(([vx, vy, vz]) => {
        api.velocity.set(vx * 0.95, vy, vz * 0.95);
      })();
    }

    // Clamp angular velocity for stability
    api.angularVelocity.subscribe(([x, y, z]) => {
      const maxAngular = 2;
      const clampedY = Math.max(-maxAngular, Math.min(maxAngular, y));
      api.angularVelocity.set(0, clampedY, 0);
    })();
  });

  return (
    <group ref={carRef} dispose={null}>
      {/* Rotate the car 180 degrees to face forward */}
      <primitive object={gltf.scene} scale={1.5} rotation={[0, Math.PI, 0]} />
    </group>
  );
});

export default Car;