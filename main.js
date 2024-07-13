import './style.css'
import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setY(30);
camera.rotateX(90);

renderer.render(scene, camera);

// Load textures
const sunTexture = new THREE.TextureLoader().load('2k_sun.jpg');
const mercuryTexture = new THREE.TextureLoader().load('2k_mercury.jpg');
const venusTexture = new THREE.TextureLoader().load('2k_venus.jpg');
const earthTexture = new THREE.TextureLoader().load('2k_earth.jpg');
const marsTexture = new THREE.TextureLoader().load('2k_mars.jpg');
const jupiterTexture = new THREE.TextureLoader().load('2k_jupiter.jpg');
const saturnTexture = new THREE.TextureLoader().load('2k_saturn.jpg');
const saturnRingTexture = new THREE.TextureLoader().load('2k_saturn_ring.jpg');
const uranusTexture = new THREE.TextureLoader().load('2k_uranus.jpg');
const neptuneTexture = new THREE.TextureLoader().load('2k_neptune.jpg');
const moonTexture = new THREE.TextureLoader().load('2k_moon.jpg');
const spaceTexture = new THREE.TextureLoader().load('2k_stars_milky_way.jpg');

// Set background
scene.background = spaceTexture;

// Add planets and moon
const sunRadius = 4;
const scaleFactor = 2;

// Sun
const sun = new THREE.Mesh(
    new THREE.SphereGeometry(sunRadius, 32, 32),
    new THREE.MeshStandardMaterial({
        map: sunTexture,
    })
)
scene.add(sun);

// Mercury
const mercury = new THREE.Mesh(
    new THREE.SphereGeometry(0.075, 32, 32),
    new THREE.MeshStandardMaterial({
        map: mercuryTexture,
    })
)
mercury.position.set(sunRadius + 0.38 * scaleFactor, 0, 0)
scene.add(mercury);

// Venus
const venus = new THREE.Mesh(
    new THREE.SphereGeometry(0.095, 32, 32),
    new THREE.MeshStandardMaterial({
        map: venusTexture,
    })
)
venus.position.set(sunRadius + 0.72 * scaleFactor, 0, 0)
scene.add(venus);

// Earth
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 32, 32),
    new THREE.MeshStandardMaterial({
        map: earthTexture,
    })
)
earth.position.set(sunRadius + 1 * scaleFactor, 0, 0)
scene.add(earth);

// Moon
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.02724, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
    })
)
moon.position.set(sunRadius + 1 * scaleFactor, 0, 0.2)
scene.add(moon);

// Mars
const mars = new THREE.Mesh(
    new THREE.SphereGeometry(0.0532, 32, 32),
    new THREE.MeshStandardMaterial({
        map: marsTexture,
    })
)
mars.position.set(sunRadius + 1.52 * scaleFactor, 0, 0)
scene.add(mars);

// Jupiter
const jupiter = new THREE.Mesh(
    new THREE.SphereGeometry(1.121, 32, 32),
    new THREE.MeshStandardMaterial({
        map: jupiterTexture,
    })
)
jupiter.position.set(sunRadius + 6.2 * scaleFactor, 0, 0)
scene.add(jupiter);

// Saturn
const saturn = new THREE.Mesh(
    new THREE.SphereGeometry(0.945, 32, 32),
    new THREE.MeshStandardMaterial({
        map: saturnTexture,
    })
)
saturn.position.set(sunRadius + 10.58 * scaleFactor, 0, 0)
scene.add(saturn);

//TODO Saturn's ring

// Uranus
const uranus = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 32, 32),
    new THREE.MeshStandardMaterial({
        map: uranusTexture,
    })
)
uranus.position.set(sunRadius + 19.14 * scaleFactor, 0, 0)
scene.add(uranus);

// Neptune
const neptune = new THREE.Mesh(
    new THREE.SphereGeometry(0.388, 32, 32),
    new THREE.MeshStandardMaterial({
        map: neptuneTexture,
    })
)
neptune.position.set(sunRadius + 30.2 * scaleFactor, 0, 0)
scene.add(neptune);

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 5, 0, 0);
// pointLight.position.set(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);

scene.add(pointLight, ambientLight);

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function movePlanets() {
    sun.rotateY(0.0000393);
    mercury.rotateY(0.0588);
    venus.rotateY(-0.244)
    earth.rotateY(0.001);
    mars.rotateY(0.00103);
    jupiter.rotateY(0.000415);
    saturn.rotateY(0.000445);
    uranus.rotateX(-0.00072);
    neptune.rotateY(0.000673);


}

function animate() {
    requestAnimationFrame(animate);

    // Move planets
    movePlanets();

    controls.update();

    renderer.render(scene, camera);
}

animate();