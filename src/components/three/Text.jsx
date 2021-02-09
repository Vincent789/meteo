import React, { useRef, useState, Component } from 'react'
import * as THREE from 'three'
import { useFrame } from 'react-three-fiber'
import JSONfont from "../../fonts/Cocogoose.json";

function TextMesh(props, text, position) {
    const [hovered, setHover] = useState(false);
    const mesh = useRef();
    console.log("PROPS TEXT : "+props.text)
  
    // actions to perform in current frame
    useFrame(() => {
      //mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
      //mesh.current.geometry.center();
    });
    
    // load in font
    const font = new THREE.FontLoader().parse(JSONfont);
  
    // configure font mesh
    const textOptions = {
      font,
      size: 100,
      height: hovered ? 1 : 0
    };
    //qqch qui ne se fait pas dans le update !!!!!!!!!!!
  
    return (
      <mesh
        ref={mesh}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
        position={[-200, -50, -200]}
      >
        <textGeometry  attach="geometry" args={[props.text, textOptions]} />
        <meshBasicMaterial color={hovered ? 'black' : 'white'} />
      </mesh>
    );
}

class Text extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <TextMesh text={this.props.location}/>
        )
    }
}

export default Text;