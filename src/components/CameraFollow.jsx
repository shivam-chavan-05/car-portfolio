import { useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function CameraFollow({ targetRef }) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const cameraTarget = useRef(new THREE.Vector3());
  const desiredOffset = new THREE.Vector3(0, 8, 18); // [x, y, z]: higher and behind

  useFrame(() => {
    if (targetRef.current) {
      // Get car's world position and orientation
      targetRef.current.getWorldPosition(targetPosition.current);
      const quaternion = targetRef.current.getWorldQuaternion(new THREE.Quaternion());

      // Calculate the desired camera position in world space
      const offset = desiredOffset.clone().applyQuaternion(quaternion);
      cameraTarget.current.copy(targetPosition.current).add(offset);

      // Smoothly interpolate camera position
      camera.position.lerp(cameraTarget.current, 0.07);

      // Look at a point slightly above the car's center for a better angle
      const lookAt = targetPosition.current.clone();
      lookAt.y += 2;
      camera.lookAt(lookAt);
    }
  });

  return null;
}