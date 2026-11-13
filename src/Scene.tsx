import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import type { Theme } from './useTheme'

interface StageNode {
  label: string
  info: string
  target: string
}

const STAGES: StageNode[] = [
  { label: 'React + TS', info: 'Thoughtful interfaces', target: 'projects' },
  { label: 'GraphQL', info: 'Typed data services', target: 'projects' },
  { label: 'C# / .NET', info: 'Reliable backend systems', target: 'experience' },
  { label: 'Event Grid', info: 'Event-driven workflows', target: 'skills' },
  { label: 'Service Bus', info: 'Resilient integrations', target: 'skills' },
  { label: 'Snowflake', info: 'Connected data platforms', target: 'projects' },
]

const POINTS = STAGES.map((_, index) => {
  const t = index / (STAGES.length - 1)
  return new THREE.Vector3(-2.75 + t * 5.5, Math.sin(t * Math.PI * 2) * 0.48, Math.cos(t * Math.PI * 1.5) * 0.2)
})

function Node({ stage, position, accent, index }: { stage: StageNode; position: THREE.Vector3; accent: string; index: number }) {
  const group = useRef<THREE.Group>(null)
  const [hover, setHover] = useState(false)

  useFrame(({ clock }, dt) => {
    const node = group.current
    if (!node) return
    const t = clock.elapsedTime
    node.position.y = position.y + Math.sin(t * 0.7 + index * 0.9) * 0.045
    node.rotation.y += dt * (hover ? 0.45 : 0.12)
    const scale = THREE.MathUtils.lerp(node.scale.x, hover ? 1.12 : 1, Math.min(1, dt * 7))
    node.scale.setScalar(scale)
  })

  const go = () => document.getElementById(stage.target)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <group ref={group} position={position}>
      <mesh
        onPointerOver={(event) => {
          event.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHover(false)
          document.body.style.cursor = ''
        }}
        onClick={(event) => {
          event.stopPropagation()
          go()
        }}
      >
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={hover ? 0.42 : 0.16}
          roughness={0.28}
          metalness={0.55}
        />
      </mesh>
      <mesh rotation={[0.35, 0, 0]}>
        <torusGeometry args={[0.28, 0.009, 8, 48]} />
        <meshBasicMaterial color={accent} transparent opacity={hover ? 0.8 : 0.36} />
      </mesh>
      <Html center position={[0, -0.5, 0]} style={{ pointerEvents: 'auto' }}>
        <a
          className={`orb-label${hover ? ' active' : ''}`}
          href={`#${stage.target}`}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
        >
          <strong>{stage.label}</strong>
          <small>{stage.info}</small>
        </a>
      </Html>
    </group>
  )
}

const PARTICLES = 36

function Flow({ curve, accent }: { curve: THREE.CatmullRomCurve3; accent: string }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const offsets = useMemo(() => Array.from({ length: PARTICLES }, (_, index) => index / PARTICLES), [])

  useFrame(({ clock }) => {
    const mesh = ref.current
    if (!mesh) return
    const progress = clock.elapsedTime * 0.035
    offsets.forEach((offset, index) => {
      dummy.position.copy(curve.getPointAt((offset + progress) % 1))
      dummy.scale.setScalar(0.45 + 0.3 * Math.sin((offset + progress) * Math.PI * 2))
      dummy.updateMatrix()
      mesh.setMatrixAt(index, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, PARTICLES]}>
      <sphereGeometry args={[0.018, 8, 8]} />
      <meshBasicMaterial color={accent} transparent opacity={0.62} />
    </instancedMesh>
  )
}

export default function Scene({ theme }: { theme: Theme }) {
  const accent = theme === 'dark' ? '#a7e8c1' : '#267c52'
  const curve = useMemo(() => new THREE.CatmullRomCurve3(POINTS, false, 'catmullrom', 0.32), [])

  return (
    <Canvas
      camera={{ position: [0, 0.15, 8.5], fov: 40 }}
      dpr={[1, 1.5]}
      role="img"
      aria-label="Interactive technology pipeline connecting frontend, backend, cloud, and data platforms"
    >
      <ambientLight intensity={theme === 'dark' ? 0.72 : 1.15} />
      <directionalLight position={[3, 4, 5]} intensity={1.7} />
      <pointLight position={[0, 1.5, 3]} intensity={8} color={accent} />
      <gridHelper args={[12, 24, accent, accent]} position={[0, -1.35, 0]} material-transparent material-opacity={0.11} />
      <mesh>
        <tubeGeometry args={[curve, 120, 0.012, 6, false]} />
        <meshBasicMaterial color={accent} transparent opacity={0.34} />
      </mesh>
      <Flow curve={curve} accent={accent} />
      {STAGES.map((stage, index) => (
        <Node key={stage.label} stage={stage} position={POINTS[index]} accent={accent} index={index} />
      ))}
      <OrbitControls
        target={[0, 0.05, 0]}
        enableZoom={false}
        enablePan={false}
        minAzimuthAngle={-0.35}
        maxAzimuthAngle={0.35}
        minPolarAngle={Math.PI / 2.4}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  )
}
