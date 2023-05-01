// Initialize the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube with a texture
var geometry = new THREE.BoxGeometry(1, 1, 1);
var texture = new THREE.TextureLoader().load('texture.png');
var material = new THREE.MeshBasicMaterial({map: texture});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Load a 3D model
var loader = new THREE.GLTFLoader();
loader.load('./Strawberry_gltf.gltf', function(gltf) {
    var model = gltf.scene.children[0];
    var texture = new THREE.TextureLoader().load('texture.png');
    var material = new THREE.MeshBasicMaterial({map: texture});
    model.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            child.material = material;
        }
    });
    scene.add(model);
});

// Position the cube and camera, and set the initial rotation and direction
cube.position.set(0, 0, -5);
camera.position.set(0, 0, 5);
var direction = new THREE.Vector3(0, 0, -1);
var rotation = new THREE.Vector2(0, 0);

// Add keyboard controls
var keyboard = {};
function onKeyDown(event) {
    keyboard[event.code] = true;
}
function onKeyUp(event) {
    keyboard[event.code] = false;
}
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

// Animate the cube and render the scene
function animate() {
    requestAnimationFrame(animate);
    
    // Move the cube based on keyboard input
    var speed = 0.1;
    if (keyboard['KeyW']) {
        cube.position.add(direction.clone().multiplyScalar(speed));
    }
    if (keyboard['KeyA']) {
        cube.position.add(new THREE.Vector3(-direction.z, 0, direction.x).normalize().multiplyScalar(speed));
    }
    if (keyboard['KeyS']) {
        cube.position.add(direction.clone().multiplyScalar(-speed));
    }
    if (keyboard['KeyD']) {
        cube.position.add(new THREE.Vector3(direction.z, 0, -direction.x).normalize().multiplyScalar(speed));
    }
    
    // Rotate the camera smoothly based on keyboard input
    var delta = 0.02;
    if (keyboard['KeyE']) {
        rotation.y -= delta;
    }
    if (keyboard['KeyQ']) {
        rotation.y += delta;
    }
    camera.rotation.set(-rotation.y, rotation.x, 0);
    direction.set(0, 0, -1).applyQuaternion(camera.quaternion);
    
    renderer.render(scene, camera);
}
animate();
