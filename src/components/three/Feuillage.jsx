import * as THREE from 'three'
import React, { useRef, Component, useState } from 'react'
import { useGLTF } from "@react-three/drei";
import { a } from 'react-spring/three'
import getRandomInt from './utils/getRandomInt'
import randomBetween from './utils/randomBetween'

function Feuillage(props, color, numbertrees) {
    console.log(props.color)

    var treepositions = []
    for (let i = 0; i < props.numbertrees; i++) {
        let treeNewPosX = randomBetween(45);
        let treeNewPosZ = getRandomInt(45); 
        let object = {
          x: treeNewPosX,
          y: 8,
          z: treeNewPosZ
        } 
        treepositions.push(object)
    }

    
    console.log("TREEPOSITIONS :"+treepositions)
    const grouptrees = useRef();

    //Basic expand state
    const [expand, setExpand] = useState(false);
  
    return  (
      <group ref={grouptrees}>
        { treepositions.map((d, index) =>  (
        <a.mesh
          position={[d.x, d.y, d.z]}
          key={index}
          onClick={() => setExpand(!expand)}
          scale={[ 5, 15, 5 ]}
          castShadow>
          <coneBufferGeometry attach="geometry" args={d.args} />
          <a.meshPhysicalMaterial attach="material" color={props.color} />
        </a.mesh>
      ))}
      </group>
    );
}

useGLTF.preload('/Cottage.glb')
    
class Trees extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Feuillage numbertrees={300} color={this.props.treecolor}/>
        )
    }
}

export default Trees;