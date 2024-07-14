import './style.css'
import * as THREE from 'three';
// import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { texture } from 'three/examples/jsm/nodes/Nodes.js';

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
const saturnRingTexture = new THREE.TextureLoader().load('saturn_ring.png');
const uranusTexture = new THREE.TextureLoader().load('2k_uranus.jpg');
const uranusRingTexture = new THREE.TextureLoader().load('uranus_ring.png');
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
    new THREE.MeshBasicMaterial({
        map: sunTexture,
    })
)
scene.add(sun);

const mercury = createPlanet(0.075, mercuryTexture, 0.38);
const venus = createPlanet(0.095, venusTexture, 0.72);
const earth = createPlanet(0.1, earthTexture, 1);
// TODO Add moon to earth
// Moon
// const moon = new THREE.Mesh(
//     new THREE.SphereGeometry(0.02724, 32, 32),
//     new THREE.MeshStandardMaterial({
//         map: moonTexture,
//     })
// )
// moon.position.set(sunRadius + 1 * scaleFactor, 0, 0.2)
// scene.add(moon);
const mars = createPlanet(0.0532, marsTexture, 1.52);
const jupiter = createPlanet(1.121, jupiterTexture, 6.2);
const saturn = createPlanet(0.945, saturnTexture, 10.58, {
    innerRadius: 1.1,
    outerRadius: 2,
    texture: saturnRingTexture
});
saturn.mesh.rotateZ(0.466); // Saturn is tilted 26.7 degrees or 0.466 radians
const uranus = createPlanet(0.4, uranusTexture, 19.14, {
    innerRadius: 0.6,
    outerRadius: 0.8,
    texture: uranusRingTexture
});
uranus.mesh.rotateX(1.7064084); // Rotate uranus because it rotates on a different axis than the rest of the planets
const neptune = createPlanet(0.388, neptuneTexture, 30.2);

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 5, 0, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);

scene.add(pointLight, ambientLight);

// Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function createPlanet(radius, texture, position, ring) {
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 32, 32),
        new THREE.MeshStandardMaterial({
            map: texture,
        })
    )
    mesh.position.set(sunRadius + position * scaleFactor, 0, 0)
    const object = new THREE.Object3D();
    object.add(mesh);
    if (ring) {
        const ringMesh = new THREE.Mesh(
            new THREE.RingGeometry(
                ring.innerRadius,
                ring.outerRadius,
                32
            ),
            new THREE.MeshStandardMaterial({
                map: ring.texture,
                side: THREE.DoubleSide
            })
        );
        ringMesh.rotateX(1.57079633)
        mesh.add(ringMesh);
    }
    scene.add(object);

    return {mesh, object};
}

function movePlanets() {
    sun.rotateY(0.0000393);
    mercury.mesh.rotateY(0.00062075);
    mercury.object.rotateY(0.000415);
    venus.mesh.rotateY(-0.00015);
    venus.object.rotateY(0.000163);
    earth.mesh.rotateY(0.0365);
    earth.object.rotateY(0.0001);
    mars.mesh.rotateY(0.035437);
    mars.object.rotateY(0.0000532);
    jupiter.mesh.rotateY(0.087952);
    jupiter.object.rotateY(0.0000084);
    saturn.mesh.rotateY(0.0818691);
    saturn.object.rotateY(0.0000034);
    uranus.mesh.rotateY(-0.05069);
    uranus.object.rotateY(0.00000119);
    neptune.mesh.rotateY(0.054235);
    neptune.object.rotateY(0.000000611);
}

function animate() {
    requestAnimationFrame(animate);

    // Move planets
    movePlanets();

    controls.update();

    renderer.render(scene, camera);
}

animate();