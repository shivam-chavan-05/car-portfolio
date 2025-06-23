import React, { useRef } from 'react';
import { usePlane } from '@react-three/cannon';
import { Billboard, Text } from '@react-three/drei';
import Zones from './Zones';

const BOUNDARY_RADIUS = 60;

export default function World() {
  // Create an invisible physics ground plane
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  return (
    <>
      {/* Invisible ground plane: physics only, not rendered */}
      <Zones />

      {/* Circular boundary ring */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[BOUNDARY_RADIUS - 0.5, BOUNDARY_RADIUS + 0.5, 128]} />
        <meshBasicMaterial color="white" transparent opacity={0.5} />
      </mesh>

      {/* Sun and planets (move planets outside the boundary) */}
      <group position={[0, 50, -100]}>
        {/* Main yellow sphere */}
        <mesh>
          <sphereGeometry args={[20, 64, 64]} />
          <meshStandardMaterial
            color="yellow"
            emissive="yellow"
            emissiveIntensity={5}
          />
        </mesh>
        {/* Orange shade */}
        <mesh>
          <sphereGeometry args={[20.2, 64, 64]} />
          <meshStandardMaterial
            color="orange"
            emissive="orange"
            emissiveIntensity={2.5}
            transparent
            opacity={0.5}
          />
        </mesh>
        {/* Red sunspots */}
        <mesh position={[5, 3, 2]}>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshStandardMaterial
            color="red"
            emissive="red"
            emissiveIntensity={3}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh position={[-6, -2, 4]}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshStandardMaterial
            color="#ff6600"
            emissive="#ff6600"
            emissiveIntensity={2}
            transparent
            opacity={0.6}
          />
        </mesh>
        {/* Deep yellow spot */}
        <mesh position={[2, -4, -3]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={4}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
      {/* Sun (actual light) */}
      <pointLight
        position={[0, 50, -100]}
        intensity={3}
        distance={500}
        color="yellow"
        castShadow
      />

      {/* Example planets - all outside the boundary */}
      <mesh position={[BOUNDARY_RADIUS + 20, 0, -100]}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshStandardMaterial color="orange" emissive="yellow" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-BOUNDARY_RADIUS - 30, 20, -200]}>
        <sphereGeometry args={[6, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh position={[BOUNDARY_RADIUS + 40, -10, -300]}>
        <sphereGeometry args={[14, 32, 32]} />
        <meshStandardMaterial color="purple" />
      </mesh>
      {/* Add more planets as you like */}

      {/* Placard for developer info */}
      <Billboard position={[80, 10, -120]}>
        {/* Placard background */}
        <mesh>
          <planeGeometry args={[30, 12]} />
          <meshStandardMaterial color="#222" transparent opacity={0.5} />
        </mesh>
        {/* Placard text */}
        <Text
          position={[0, 0, 0.1]}
          fontSize={2}
          color="white"
          maxWidth={28}
          lineHeight={1.2}
          anchorX="center"
          anchorY="middle"
        >
          {`Hi, I'm [Your Name]!
I'm a passionate developer with experience in web, 3D, and interactive projects.
I love building creative solutions and exploring new technologies.
Drive up close to read more!`}
        </Text>
      </Billboard>
    </>
  );
}