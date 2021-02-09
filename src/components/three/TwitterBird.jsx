import * as THREE from 'three'
import React, { useRef, Suspense, Component, useState } from 'react'
import { useGLTF, useAnimations } from "@react-three/drei";

function TwitterBird(props) {
    const groupbird = useRef()
    const { nodes, materials } = useGLTF('/twitter.glb')
  
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
  
    return (
      <group ref={groupbird} {...props} dispose={null}>
        <mesh 
          geometry={nodes.twitter.geometry} 
          rotation={[Math.PI / 2, 0, 0]}
          onClick={(e) => setActive(!active)}
          onPointerOver={(e) => setHover(true)}
          onPointerOut={(e) => setHover(false)}>
          <meshPhysicalMaterial color={hovered ? '#9cfffd' : '#00acee'} side={THREE.DoubleSide}/>
        </mesh>
      </group>
    )
}

useGLTF.preload('/Cottage.glb')
    
class Twitter extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
          <Suspense fallback={null}>
             <TwitterBird position={[100, 100, 10]} rotation={[-0.5, 0.5, 0]}/>
          </Suspense>
        )
    }
}

export default Twitter;