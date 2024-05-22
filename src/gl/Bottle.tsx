/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 public/rapp_final.glb 
*/

import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export function Bottle(props: any) {
  const { nodes, materials }: any = useGLTF('/rapp_final.glb')

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cylinder.geometry} material={materials.glass} />
      <mesh geometry={nodes.Cylinder002.geometry} material={materials.cap} />
      <mesh geometry={nodes.Cylinder001.geometry} material={materials.cap} />
      <mesh geometry={nodes.Plane.geometry} material={materials.cap} />
      <mesh geometry={nodes.Circle.geometry} material={materials.cap} />
      <mesh geometry={nodes.Circle006.geometry} material={materials.cap} />
    </group>
  )
}

useGLTF.preload('/rapp_final.glb')
