import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree, extend, useLoader } from 'react-three-fiber'
import TextSprite from '@seregpie/three.text-sprite';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { softShadows, MeshWobbleMaterial, ContactShadows, Environment, useGLTF  } from "@react-three/drei";
import { useSprings, useSpring, a } from 'react-spring/three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import JSONfont from "./fonts/Cocogoose.json";
// soft Shadows
softShadows();

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.

extend({ OrbitControls });

//globals
var forestNumber = []
const numbertrees = 1000
const numberclouds = 100
const numberrain = 50


//text
function TextMesh(props) {
    const [hovered, setHover] = useState(false);
    const mesh = useRef();
  
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
        {...props}
        ref={mesh}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      >
        <textGeometry attach="geometry" args={["LYON", textOptions]} />
        <meshBasicMaterial color={hovered ? 'black' : 'white'} />
      </mesh>
    );
  }
  

function getRandomInt2(max) {
    return Math.floor(Math.random() * Math.floor(max)) - Math.floor(Math.random() * Math.floor(max));
}


//testounet
//-----------------------
//-------------------
//----------------


const Rain = ({ position, color, args }) => {

  var rainpositions = []
  for (let i = 0; i < 40; i++) {
      let treeNewPosX = getRandomInt(45);
      let treeNewPosZ = getRandomInt(45); 
      let object = {
        x: treeNewPosX,
        y: 40+getRandomInt(10),
        z: treeNewPosZ
      }
      rainpositions.push(object)
  }


  //ref to target the mesh
  const group = useRef();

  //useFrame allows us to re-render/update on each frame
  useFrame(() => {
    if (group.current.position.y >= -40){
      group.current.position.y = group.current.position.y -= 1.2
    }
    else
    {
      group.current.position.y = 5;
    }
  });

  //Basic expand state
  const [expand, setExpand] = useState(false);
  // React spring expand animation
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });
  return  (
    <group ref={group}>
      { rainpositions.map((d, index) =>  (
      <a.mesh
        position={[d.x, d.y, d.z]}
        key={index}
        onClick={() => setExpand(!expand)}
        scale={props.scale}
        castShadow>
        <boxBufferGeometry attach='geometry' args={args} />
        <meshBasicMaterial color={color} />
      </a.mesh>
    ))}
    </group>
  );
};





//test
//-----------------------
//-------------------
//----------------
/*function Gltf(){
  const gltf = useLoader(
    GLTFLoader,
    "/scene.gltf",
    loader => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco-gltf/");
      loader.setDRACOLoader(dracoLoader);
    }
  );
}*/


const treecolors = ['#2c9400', '#1b4f08', '#e6b522']
const cloudcolors = ['#ffffff']
const raincolors = ['#000000']
const randomtrees = i => {
  const r = Math.random()
  return {
    position: [getRandomInt2(48), 6, getRandomInt2(48)],
    color: treecolors[Math.round(Math.random() * (treecolors.length - 1))],
  }
}

const randomrain = i => {
    const r = Math.random()
    return {
      position: [getRandomInt2(48), getRandomInt2(45), getRandomInt2(48)],
      color: raincolors[Math.round(Math.random() * (raincolors.length - 1))],
    }
}


const randomclouds = i => {
    const r = Math.random()
    return {
      position: [getRandomInt2(48), 50 + getRandomInt2(15), getRandomInt2(48)],
      color: cloudcolors[Math.round(Math.random() * (cloudcolors.length - 1))],
    }
}

const datatrees = new Array(numbertrees).fill().map(() => {
  return {
    color: treecolors[Math.round(Math.random() * (treecolors.length - 1))],
    args: [2, 7, 10]
  }
})

const dataclouds = new Array(numberclouds).fill().map(() => {
    return {
      color: cloudcolors[Math.round(Math.random() * (cloudcolors.length - 1))],
      args: [20, 10, 20],
    }
})

const datarain = new Array(numberrain).fill().map(() => {
  return {
    color: cloudcolors[Math.round(Math.random() * (cloudcolors.length - 1))],
    args: [0.2, 10, 0.2],
  }
})


function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    //mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

/*   DEMAIN IMPORTANT
function Model({ url }) {
  const { scene } = useLoader(GLTFLoader, url, draco())
  return <primitive object={scene} dispose={null} />
}*/

function Feuillage() {
    const [springs, set] = useSprings(numbertrees, i => ({
      from: randomtrees(i),
      ...randomtrees(i),
    }))
    return datatrees.map((d, index) => (
      <a.mesh key={index} {...springs[index]} castShadow receiveShadow>
        <coneBufferGeometry attach="geometry" args={d.args} />
        <a.meshPhysicalMaterial attach="material" color={springs[index].color} />
      </a.mesh>
    ))
}

function Clouds() {
    const [springs2, set] = useSprings(numberclouds, i => ({
      from: randomclouds(i),
      ...randomclouds(i),
    }))
    return dataclouds.map((d, index) => (
      <a.mesh key={index} {...springs2[index]} castShadow receiveShadow>
        <boxBufferGeometry attach="geometry" args={d.args} />
        <a.meshPhysicalMaterial attach="material" color={springs2[index].color} roughness={0} opacity={0.8} transparent={true} />
      </a.mesh>
    ))
}

/*
Experimental rain with wobble effect

function Rain({color, speed}) {
  const [springs3, set] = useSprings(numberrain, i => ({
    from: randomrain(i),
    ...randomrain(i),
  }))
  return datarain.map((d, index) => (
    <a.mesh key={index} {...springs3[index]} castShadow receiveShadow>
      <boxBufferGeometry attach="geometry" args={d.args} />
      <MeshWobbleMaterial
        color={color}
        speed={speed}
        attach='material'
        factor={0.6}
      />
    </a.mesh>
  ))
}
*/

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement },
  } = useThree();

  camera.position.y = 100;
  camera.position.z = 180;

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      //enableZoom={false}
      //maxAzimuthAngle={Math.PI / 4}
      //maxPolarAngle={Math.PI}
      //minAzimuthAngle={-Math.PI / 4}
      //minPolarAngle={0}
    />
  );
};

function Lights() {
  return (
    <group>
      <pointLight intensity={1} />
      <ambientLight intensity={0.3} />
      <spotLight
        castShadow
        intensity={1}
        angle={Math.PI / 7}
        position={[150, 150, 250]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  )
}


function PlaneBox(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
      //mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    })
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? [1, 1, 1] : [1, 1, 1]}
        onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}>
        <boxBufferGeometry args={[105, 0, 105]} />
        <meshStandardMaterial color={hovered ? '#a0bd68' : '#6c7d4a'} />
      </mesh>
    )
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) - Math.floor(Math.random() * Math.floor(max));
}

/*function Cones(props) {
    // This reference will give us direct access to the mesh
    //const mesh = useRef()
    // Set up state for the hovered and active state
    //const [hovered, setHover] = useState(false)
    //const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    
  

    for (let i = 0; i < 1000; i++) {
        let treeNewPosX = getRandomInt(50);
        let treeNewPosZ = getRandomInt(50); 
        let object = {
          key: getRandomInt(10000),
          x: treeNewPosX,
          y: 0,
          z: treeNewPosZ
    }
    forestNumber.push(object)
    console.log(forestNumber)
    useFrame(() => {
      //mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    })
    return (
        <mesh>  
            <coneBufferGeometry args={[1, 2, 10]}/>
            <meshNormalMaterial />
        </mesh>
    )
    }
}*/


function TwitterBird(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/twitter.glb')

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh 
        geometry={nodes.twitter.geometry} 
        rotation={[Math.PI / 2, 0, 0]}
        onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}>
        <meshPhysicalMaterial color={hovered ? 'black' : '#00acee'} side={THREE.DoubleSide}/>
      </mesh>
    </group>
  )
}

function Church(props) {
  
}



export default function ClickableCube() {
    return (
      <Canvas style={{height:"100vh",width:"100vw",backgroundColor:"#abfff5"}}>
        <Lights />
        <CameraControls />
        <PlaneBox position={[3, 0, 0]} />
        <Feuillage />
        <Clouds />
        <TextMesh position={[-200, -70, -200]}/>
        <Rain
            color='grey'
            args={[0.3, 10, 0.3]}
        />
        <Suspense fallback={null}>
          <TwitterBird position={[100, 100, 10]} rotation={[-0.5, 0.5, 0]}/>
        </Suspense>
      </Canvas>
    )
  }
