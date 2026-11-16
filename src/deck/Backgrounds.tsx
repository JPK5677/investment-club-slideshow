import type { ReactNode } from 'react'
import { Dithering, GrainGradient, MeshGradient, NeuroNoise, Voronoi, Warp } from '@paper-design/shaders-react'

const G = '#0F3D2E', GD = '#0A2C21', GS = '#174D3B', GOLD = '#C9A227', GM = '#1F7A5A', CREAM = '#F7F4EC'
const fill = { width: '100%', height: '100%' } as const

/* One shader per slide, all in the green / gold / off-white palette, kept dark so cream text passes AA. */
export const backgrounds: ((speed: number) => ReactNode)[] = [
  s => <MeshGradient {...fill} colors={[GD, G, GM, GOLD, GS]} distortion={0.9} swirl={0.5} grainMixer={0.4} grainOverlay={0.25} speed={0.25 * s} />,
  s => <GrainGradient {...fill} colorBack={GD} colors={[G, GM, GOLD]} shape="wave" softness={0.8} intensity={0.55} noise={0.45} speed={0.3 * s} />,
  s => <NeuroNoise {...fill} colorBack={GD} colorMid={GS} colorFront={'#8A7420'} brightness={0.1} contrast={0.45} scale={1.2} speed={0.3 * s} />,
  s => <Warp {...fill} colors={[GD, G, GM, GS]} shape="stripes" shapeScale={0.5} softness={1} distortion={0.35} swirl={0.6} proportion={0.45} speed={0.2 * s} />,
  s => <Dithering {...fill} colorBack={GD} colorFront={GS} shape="wave" type="4x4" size={3} speed={0.3 * s} />,
  s => <Voronoi {...fill} colors={[GD, G, GS]} colorGap={GOLD} gap={0.012} distortion={0.3} glow={0.3} colorGlow={GM} speed={0.25 * s} />,
  s => <GrainGradient {...fill} colorBack={GD} colors={[G, GOLD, GM]} shape="ripple" softness={0.9} intensity={0.5} noise={0.4} speed={0.3 * s} />,
  s => <MeshGradient {...fill} colors={[GD, GM, G, CREAM, GOLD]} distortion={0.8} swirl={0.3} grainMixer={0.3} grainOverlay={0.2} speed={0.2 * s} />,
]

/* Static look for reduced motion: same palette, no WebGL. */
export const staticBackground = `radial-gradient(ellipse at 20% 15%, ${GM}66, transparent 55%), radial-gradient(ellipse at 85% 90%, ${GOLD}33, transparent 50%), ${G}`

