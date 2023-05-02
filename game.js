// Initialize the scene, camera, and renderer
var scene = new THREE.Scene();
// Set the background color of the scene
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a background to the scene
var texture = new THREE.TextureLoader().load('download(7).jpeg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4); // adjust the repeat factor to fit your image

var textureCube = new THREE.CubeTexture([
    texture, texture, texture, texture, texture, texture
]);
scene.background = textureCube;

// Create a cube with outlines
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var edges = new THREE.EdgesGeometry(geometry);
var lineMaterial = new THREE.LineBasicMaterial({color: 0x000000});
var cube = new THREE.LineSegments(edges, lineMaterial);
cube.add(new THREE.Mesh(geometry, material));
scene.add(cube);




// Position the camera and set the initial rotation and direction
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
		cube.position.add(direction.clone().multiplyScalar(-speed));
	}
	if (keyboard['KeyA']) {
		cube.position.add(new THREE.Vector3(-direction.z, 0, direction.x).normalize().multiplyScalar(speed));
	}
	if (keyboard['KeyS']) {
		cube.position.add(direction.clone().multiplyScalar(speed));
	}
	if (keyboard['KeyD']) {
		cube.position.add(new THREE.Vector3(direction.z, 0, -direction.x).normalize().multiplyScalar(speed));
	}
	
	// Rotate the camera smoothly based on keyboard input
	var delta = 0.02;
	if (keyboard['KeyE']) {
		rotation.x -= delta;
	}
	if (keyboard['KeyQ']) {
		rotation.x += delta;
	}
	camera.rotation.set(rotation.y, rotation.x, 0);
	direction.set(0, 0, -1).applyQuaternion(camera.quaternion);
	
	renderer.render(scene, camera);
}
animate();
