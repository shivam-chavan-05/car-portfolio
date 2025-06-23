import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Suspense, useRef } from 'react';
import { Stars } from '@react-three/drei';
import Car from './components/Car';
import World from './components/World';
import UI from './components/UI';
import CameraFollow from './components/CameraFollow';
import { useCarControls } from './store';
import './styles.css';

export default function App() {
  const carRef = useRef();
  const controls = useCarControls();

  return (
    <>
      <Canvas shadows camera={{ position: [0, 5, 15], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
          <Stars radius={300} depth={100} count={10000} factor={7} saturation={0} fade />
          <Physics gravity={[0, -9.8, 0]}>
            <World />
            <Car ref={carRef} />
          </Physics>
          <CameraFollow targetRef={carRef} controls={controls} />
        </Suspense>
      </Canvas>
      <UI />
    </>
  );
}