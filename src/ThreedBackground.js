import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { CSS3DObject, CSS3DSprite, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import TextSprite from '@seregpie/three.text-sprite';


//Global vars
let control, orbit;
const message = "Metep";

class ThreedBackground extends Component {
  componentDidMount() {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xabfff5 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );



    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );

    
    const lightshadows = new THREE.PointLight( 0xf5a53d, 1, 200 ); // soft white light
    lightshadows.position.set( 0, 40, 3 );

    scene.add( lightshadows );


    //ORBIT
    const orbitcontrols = new OrbitControls( camera, renderer.domElement );
    
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max)) - Math.floor(Math.random() * Math.floor(max));
    }

    var forestNumber = []
    for (let i = 0; i < 1000; i++) {
      let treeNewPosX = getRandomInt(50);
      let treeNewPosZ = getRandomInt(50); 
      let object = {
        x: treeNewPosX,
        y: 0,
        z: treeNewPosZ
      }
      forestNumber.push(object)
    }

    console.log(forestNumber)

    var initialState = [
      {
        x: 6,
        y: 0,//0 obli
        z: 0,
      },
      {
        x: 11,
        y: 0,//0 obli
        z: 4,
      },
      {
        x: 9,
        y: 0,//0 obli
        z: 1,
      },
      {
        x: 12,
        y: 0,//0 obli
        z: 4,
      },
      {
        x: 13,
        y: 0,//0 obli
        z: 4,
      },
      {
        x: -4,
        y: 0,//0 obli
        z: 8,
      },
    ]
    
    //text
    /*let instance = new TextSprite({
      alignment: 'left',
      color: '#ffffff',
      fontFamily: 'helvetica, sans-serif',
      fontSize: 50,
      fontStyle: 'normal',
      fontWeight: 'bold',
      text: [
        'METEO',
      ].join('\n'),
    });
    scene.add(instance);*/
    
    
    const loader = new THREE.FontLoader();
				loader.load( 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function ( font ) {

					const color = 0xffffff;

					const matDark = new THREE.LineBasicMaterial( {
						color: color,
						side: THREE.DoubleSide
					} );

					const matLite = new THREE.MeshBasicMaterial( {
						color: color,
						transparent: true,
						opacity: 1,
						side: THREE.DoubleSide
					} );

					const shapes = font.generateShapes( message, 100 );

					const geometry = new THREE.ShapeGeometry( shapes );

					geometry.computeBoundingBox();

					const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

					geometry.translate( xMid, 0, 0 );

					// make shape ( N.B. edge view not visible )

					const text = new THREE.Mesh( geometry, matLite );
					text.position.z = - 150;
					scene.add( text );

					// make line shape ( N.B. edge view remains visible )

					const holeShapes = [];

					for ( let i = 0; i < shapes.length; i ++ ) {

						const shape = shapes[ i ];

						if ( shape.holes && shape.holes.length > 0 ) {

							for ( let j = 0; j < shape.holes.length; j ++ ) {

								const hole = shape.holes[ j ];
								holeShapes.push( hole );

							}

						}

					}

					shapes.push.apply( shapes, holeShapes );

					const lineText = new THREE.Object3D();

					for ( let i = 0; i < shapes.length; i ++ ) {

						const shape = shapes[ i ];

						const points = shape.getPoints();
						const geometry = new THREE.BufferGeometry().setFromPoints( points );

						geometry.translate( xMid, 0, 0 );

						const lineMesh = new THREE.Line( geometry, matDark );
						lineText.add( lineMesh );

					}

					scene.add( lineText );

				} ); //end load function */
    
    //terrain
    const terraingeometry = new THREE.PlaneGeometry( 100, 100, 32 );
    const terrainmaterial = new THREE.MeshBasicMaterial( {color: 0xabeb96, side: THREE.DoubleSide} );
    const terrainplane = new THREE.Mesh( terraingeometry, terrainmaterial );
    terrainplane.rotation.x = - Math.PI / 2 ;
    scene.add( terrainplane );

    //tree
    //fonction qui crée plusieurs arbres
    function treeAdder(positions) {
      positions.forEach(function (position) {
        var xset = position.x;
        var zset = position.z;

        const treegeometry = new THREE.ConeGeometry( 0.5, 4, 32 );
        const treematerial = new THREE.MeshPhysicalMaterial( {color: 0x854e00} );
        const treecone = new THREE.Mesh( treegeometry, treematerial );
        treecone.position.x = xset;
        treecone.position.z = zset;
        treecone.position.y = 2.5;

        const treegeometry2 = new THREE.ConeGeometry( 1.5, 5, 32 );
        const treematerial2 = new THREE.MeshPhysicalMaterial( {color: 0x13ad3c} );
        const treecone2 = new THREE.Mesh( treegeometry2, treematerial2 );
        treecone2.position.x = xset;
        treecone2.position.z = zset;
        treecone2.position.y = 3.5;

        scene.add( treecone );
        scene.add( treecone2 );
      }); 
    }  
    //Ajout des Arbres
    treeAdder(forestNumber)
    //cubeAdder(initialState)

    camera.position.y = 74;
    camera.position.z = 129;
    camera.rotation.x = -0.209;

    
    //orbitcontrols.update();

    var animate = function () {
      requestAnimationFrame( animate );
      //console.log('POSZ'+camera.position.z)
      //console.log('POSY'+camera.position.y)
      //console.log('ROTX'+camera.rotation.x)
      renderer.render( scene, camera );
    };
    animate();

    // === THREE.JS EXAMPLE CODE END ===
  }
  componentDidUpdate(){
    
  }
  render() {
    return (
      <div />
    )
  }
}
const rootElement = document.getElementById("root");


export default ThreedBackground;