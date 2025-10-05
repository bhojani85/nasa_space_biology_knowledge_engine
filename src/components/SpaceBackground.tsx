"use client"

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Stars() {
  const starsRef = useRef<THREE.Points>(null)

  useFrame((state: { clock: { getElapsedTime: () => number } }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
      starsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01
    }
  })

  // Memoize star positions - reduced from 5000 to 2000 for better performance
  const starPositions = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100
    }
    return positions
  }, [])

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2000}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#888888"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function Centroids() {
  const centroidsRef = useRef<THREE.Group>(null)

  useFrame((state: { clock: { getElapsedTime: () => any } }) => {
    if (centroidsRef.current) {
      const time = state.clock.getElapsedTime()
      centroidsRef.current.children.forEach((centroid: { position: { x: number; y: number; z: number }; rotation: { x: number; y: number } }, i: number) => {
        centroid.position.x = Math.sin(time * 0.3 + i) * 15
        centroid.position.y = Math.cos(time * 0.2 + i) * 10
        centroid.position.z = Math.sin(time * 0.25 + i) * 8 - 10
        centroid.rotation.x += 0.01
        centroid.rotation.y += 0.01
      })
    }
  })

  // Memoize shapes configuration
  const shapes = useMemo(() => [
    { geometry: <icosahedronGeometry args={[0.8, 0]} />, position: [0, 0, 0] },
    { geometry: <octahedronGeometry args={[1, 0]} />, position: [5, 3, -5] },
    { geometry: <tetrahedronGeometry args={[1.2, 0]} />, position: [-5, -3, -8] },
    { geometry: <boxGeometry args={[1.5, 1.5, 1.5]} />, position: [8, -2, -6] },
    { geometry: <dodecahedronGeometry args={[0.9, 0]} />, position: [-8, 4, -7] },
  ], [])

  return (
    <group ref={centroidsRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.position as [number, number, number]}>
          {shape.geometry}
          <meshStandardMaterial
            color="#9ca3af"
            emissive="#6b7280"
            emissiveIntensity={0.3}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

function Planet() {
  const planetRef = useRef<THREE.Mesh>(null)

  useFrame((state: { clock: { getElapsedTime: () => number } }) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <mesh ref={planetRef} position={[15, 5, -20]}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial
        color="#71717a"
        emissive="#52525b"
        emissiveIntensity={0.3}
        roughness={0.8}
      />
    </mesh>
  )
}

export default function SpaceBackground() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <Stars />
      <Centroids />
      <Planet />
    </>
  )
}