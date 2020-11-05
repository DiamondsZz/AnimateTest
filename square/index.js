//场景
const scene = new THREE.Scene();
//相机
const camera = new THREE.PerspectiveCamera(
  75, //垂直视野角度
  window.innerWidth / window.innerHeight //宽高比
);

//渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
//材质
const material = new THREE.MeshBasicMaterial({ color: "red" });
//立方体
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 4;

//动画
const animate = function () {
  //动画帧
  requestAnimationFrame(animate);
  //旋转
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
