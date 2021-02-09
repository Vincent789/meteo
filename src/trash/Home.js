import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree, extend, useLoader } from 'react-three-fiber'
import TextSprite from '@seregpie/three.text-sprite';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { softShadows, MeshWobbleMaterial, ContactShadows, Environment, useGLTF, useAnimations, Sky, Stars  } from "@react-three/drei";
import { useSprings, useSpring, a } from 'react-spring/three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import JSONfont from "../fonts/Cocogoose.json";


var night = false

//const hourtest = 12
function letItRain(){

}

function azimuth(){
  //Get current geographic hour
  var d = new Date();
  //get current hour
  var currenthour = d.getHours();
  console.log("CurrentHour :"+currenthour)

  //get by API
  let daystart = 6; //heure de début de journée
  let daylength = Math.round(12) //longueur du jour

  //currenthour = hourtest

  //Ex : Valeur de départ Azimuth: 0.1171
  //Ex : Valeur de fin Azimuth: 0.3882
  //Ex : longueur totale de la translation d'azimuth : 0.3882 - 0.1171
  let total = 0.5

  //déclaration de la valeur courante
  let azimuthNow

  azimuthNow = (total * (currenthour-daystart))/daylength

  //sets night to true if night it is
  if ( (currenthour > daylength + daystart)||(currenthour < daylength) ){
    night = true
    console.log(night)
  }

  console.log(azimuthNow)
  console.log("AZIMUTH NOW: "+azimuthNow)
  return azimuthNow
}

function inclination(){
  //Get current geographic hour
  var d = new Date();
  //get current hour
  var currenthour = d.getHours();
  //console.log(n)

  //get by API
  let daystart = 6; //heure de début de journée
  let daylength = Math.round(12) //longueur du jour
  let noon = daylength/2 + daystart //midi = la moitié de la journée de soleil + l'heure de démarrage
  //soit pour un jour d'ensoleillement de 11h = 11/2 + 6 = 11.5

  //currenthour = hourtest

  //Ex : Valeur de départ Inclination: 0.1171
  //Ex : Valeur de fin Inclination: 0.3882
  //Ex : longueur totale de la translation d'azimuth : 0.3882 - 0.1171
  let total = 0.5 - 0.388

  //déclaration de la valeur courante
  let inclinationNow

  if (currenthour < noon) {
    inclinationNow = (currenthour - daystart) * total / (daylength/2);
  }
  else
  {
    let diffHour = noon - (currenthour - noon)
    inclinationNow = (diffHour - daystart) * total / (daylength/2);
  }

  console.log("INCLINATION NOW: "+inclinationNow + 0.50)
  return inclinationNow + 0.50
  /*
  azimuth
  0.1171
  0.3882

  inclination
  0.5
  0.388
  0.5

  exposure
  0.1171   */
}

// soft Shadows
softShadows();

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.

extend({ OrbitControls });

//globals
var forestNumber = []
const numbertrees = 10
const numberclouds = 1000


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

function getTime(max) {

}

//testounet
//-----------------------
//-------------------
//----------------


const Rain = ({ position, color, args, numberrain }) => {

  var rainpositions = []
  for (let i = 0; i < numberrain; i++) {
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



const Snow = ({ position, color, args }) => {

  var snowpositions = []
  for (let i = 0; i < numberrain; i++) {
      let treeNewPosX = getRandomInt(45);
      let treeNewPosZ = getRandomInt(45); 
      let object = {
        x: treeNewPosX,
        y: 40+getRandomInt(10),
        z: treeNewPosZ
      }
      snowpositions.push(object)
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
      { snowpositions.map((d, index) =>  (
      <a.mesh
        position={[d.x, d.y, d.z]}
        key={index}
        onClick={() => setExpand(!expand)}
        scale={props.scale}
        castShadow>
        <sphereBufferGeometry attach='geometry' args={args} />
        <meshBasicMaterial color={color} />
      </a.mesh>
    ))}
    </group>
  );
};


function randomBetween(x){
  let numb = getRandomInt2(x)
  if ( numb > 13 || numb < -13 ){
    return numb
  }
  else {
    randomBetween(x)
  }
}

const treecolors = ['#2c9400', '#1b4f08', '#e6b522']
const cloudcolors = ['#ffffff']
const raincolors = ['#000000']
const randomtrees = i => {
  return {
    position: [randomBetween(48), 6, getRandomInt2(48)],
    color: treecolors[Math.round(Math.random() * (treecolors.length - 1))],
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
        intensity={0.1}
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
        <boxBufferGeometry args={[105, 3, 105]} />
        <meshStandardMaterial color={hovered ? '#a0bd68' : '#6c7d4a'} />
      </mesh>
    )
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) - Math.floor(Math.random() * Math.floor(max));
}

function CornField(props) {
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
      <boxBufferGeometry args={[20, 2,40]} />
      <meshStandardMaterial color={'#edce1f'} />
    </mesh>
  )
}

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
        <meshPhysicalMaterial color={hovered ? '#9cfffd' : '#00acee'} side={THREE.DoubleSide}/>
      </mesh>
    </group>
  )
}

function Hut(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/scene.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-502.64, 422.99, -132.71]}>
            <group
              name="������������_��������������_2"
              position={[-10.87, 231.34, -23.05]}
              rotation={[Math.PI / 2, -0.91, -Math.PI]}>
              <group position={[13.88, -40, -33.71]} rotation={[1.77, -0.46, -2.71]}>
                <mesh
                  material={materials.material_2}
                  geometry={nodes['������������_������_����������������2_0'].geometry}
                />
              </group>
              <mesh
                material={materials.material_2}
                geometry={nodes['������������_��������������_2_����������������2_0'].geometry}
              />
            </group>
            <group position={[21.39, -295, 98.38]}>
              <mesh
                material={materials.material}
                geometry={nodes['������������_������_2_����������������_0'].geometry}
              />
              <mesh
                material={materials.material}
                geometry={nodes['������������_������_2_����������������_0_1'].geometry}
              />
            </group>
            <group position={[-10.52, 63.66, -75.33]} rotation={[Math.PI, 0, Math.PI]}>
              <mesh material={materials.material_1} geometry={nodes['rr_����������������1_0'].geometry} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

export default function Home() {
    return (
      <Canvas style={{height:"100vh",width:"100vw",backgroundColor:"#abfff5"}}>
        <Sky
          distance={45000} // Camera distance (default=450000)
          inclination={inclination()} // Sun elevation angle from 0 to 1 (default=0)
          azimuth={azimuth()} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
          turbidity={20}
          rayleigh={4}
          exposure={1000}
        />
        <Stars
          radius={100} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={5000} // Amount of stars (default=5000)
          factor={4} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />
        <Lights />
        <CameraControls />
        <PlaneBox position={[3, 0, 0]} />
        <Feuillage />
        <Clouds />
        <TextMesh position={[-200, -70, -200]}/>
        <Rain
            color='grey'
            args={[0.3, 10, 0.3]}
            numberrain={100}
        />
        <Snow
            color='white'
            args={[1, 1, 1]}
        />
        <Suspense fallback={null}>
          <TwitterBird position={[100, 100, 10]} rotation={[-0.5, 0.5, 0]}/>
        </Suspense>
        <Suspense fallback={null}>
          <Hut scale={[0.02, 0.02, 0.02]} position={[2, 5, -20]}/>
        </Suspense>
        <CornField position={[0, 2, 20]}/>
      </Canvas>
    )
  }
  
/*



<Rain
            color='grey'
            args={[0.3, 10, 0.3]}
        />


<Stars
          radius={100} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={5000} // Amount of stars (default=5000)
          factor={4} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />


*/