import React, { useRef, Suspense, Component, useState } from 'react'
import { useGLTF } from "@react-three/drei";
import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'
//credit 3D https://sketchfab.com/ilyafom1
//credits https://www.youtube.com/watch?v=5ZCtTdwc4GI

const playstatus = 0;

function play(){
    var audio = new Audio('musictest.mp3');
    audio.play();
}

function Vinyl(props) {
  const groupradio = useRef()
  const { nodes, materials } = useGLTF('3DAssets/scene.gltf')
  const [active, setActive] = useState(false)

  useFrame(() => {
    groupradio.current.rotation.y = groupradio.current.rotation.y += 0.01;
  });

  return (
    <group 
    
    ref={groupradio} 
    {...props} 
    dispose={null}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}
        scale={active ? [1.25, 1.25, 1.25] : [1, 1, 1]}
        onPointerOver={(e) => setActive(!active)}
        onPointerOut={(e) => setActive(!active)}
        onClick={(e) => play()}
         >
          <mesh material={materials['Material.001']} geometry={nodes.defaultMaterial.geometry} />
          <mesh material={materials['Material.005']} geometry={nodes.defaultMaterial_1.geometry} />
          <mesh material={materials['Material.004']} geometry={nodes.defaultMaterial_2.geometry} />
          <mesh material={materials['Material.006']} geometry={nodes.defaultMaterial_3.geometry} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('3DAssets/scene.gltf')


class Disc extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
          <Suspense fallback={null}>
             <Vinyl position={[-100, 100, 10]} scale={[3, 3, 3]}/>
          </Suspense>
        )
    }
}

export default Disc;