"use client"

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import HolographicOrb from './HolographicOrb'
import SpaceBackground from './SpaceBackground'

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ 
          alpha: true, 
          antialias: false, // Disable for better performance
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Performance degradation threshold
        frameloop="demand" // Only render when needed
      >
        <SpaceBackground />
        <HolographicOrb />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping={false} // Disable for better performance
        />
      </Canvas>
    </div>
  )
}