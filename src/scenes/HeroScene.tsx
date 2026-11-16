import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import type { Group } from 'three'

/* Rising low-poly gold bars with a coin on top. No HDR files: plain lights keep it offline. */
const bars = [0.8, 1.2, 1.0, 1.7, 2.2, 2.9]

function Chart({ still }: { still: boolean }) {
  const group = useRef<Group>(null)
  useFrame((_, dt) => {
    if (group.current && !still) group.current.rotation.y += dt * 0.35
  })
  return (
    <group ref={group} rotation={[0.25, -0.6, 0]} position={[0, -1.1, 0]}>
      {bars.map((h, i) => (
        <mesh key={i} position={[(i - 2.5) * 0.7, h / 2, 0]}>
          <boxGeometry args={[0.5, h, 0.5]} />
          <meshStandardMaterial color="#C9A227" flatShading metalness={0.1} roughness={0.5} />
        </mesh>
      ))}
      <Float speed={still ? 0 : 2} floatIntensity={still ? 0 : 0.6} rotationIntensity={0}>
        <mesh position={[2.45, 3.3, 0]} rotation={[Math.PI / 2, 0, 0.3]}>
          <cylinderGeometry args={[0.55, 0.55, 0.12, 10]} />
          <meshStandardMaterial color="#E3C458" flatShading metalness={0.2} roughness={0.4} />
        </mesh>
      </Float>
    </group>
  )
}

export default function HeroScene({ still }: { still: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0.8, 9.5], fov: 38 }}
      dpr={[1, 1.75]}
      frameloop={still ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true }}
      aria-label="Rising gold bar chart"
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[4, 6, 5]} intensity={3.2} color="#fff3d0" />
      <directionalLight position={[-5, 2, -3]} intensity={1} color="#7fd1a8" />
      <Chart still={still} />
    </Canvas>
  )
}

