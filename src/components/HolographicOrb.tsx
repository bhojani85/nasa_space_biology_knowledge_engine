"use client"

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function HolographicOrb() {
  const orbRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
      orbRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
      orbRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3
    }
  })

  // Memoize geometry to prevent recreation
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 1), [])

  return (
    <mesh ref={orbRef} geometry={geometry}>
      <meshStandardMaterial
        color="#9ca3af"
        emissive="#6b7280"
        emissiveIntensity={0.4}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}