import * as THREE from 'three';

global.THREE = THREE
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/GLTFLoader';

module.export = function() {

    const scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    var loader = new GLTFLoader();
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor("#e5e5e5");
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
    
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    camera.position.z = 5;
    
    let light = new THREE.PointLight(0xFFFFFF, 1, 500)
    light.position.set(10, 0, 25);
    scene.add(light);
    
    
    loader.load( '../models/cat_and_rack/scene.gltf', function ( gltf ) {
    
        gltf.scene.position.set(0,-5,-5);
    
        scene.add( gltf.scene );
    
    }, undefined, function ( error ) {
    
        console.error( error );
    
    } );
    
    
    var fontLoader = new THREE.FontLoader();
    
    fontLoader.load( '../fonts/helvetiker_regular.typeface.json', function ( font ) {
    
        var geometry = new THREE.TextGeometry( 'Hello three.js!', {
            font: font,
            size: 3,
            height: 1
        } );
        
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var text = new THREE.Mesh( geometry, material );
        text.position.set(-5, 0, -5);
    
        scene.add( text );
    
    } );
    
    
    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
        
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }
    
    animate();
    
};
