var camera, //相机
  scene, //场景
  renderer, //渲染器
  mesh, //网格
  cubeSineDriver;

init();
animate();

function init() {
  stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = "absolute";
  stats.domElement.style.left = "0px";
  stats.domElement.style.top = "0px";
  document.body.appendChild(stats.domElement);
  //跟踪时间
  clock = new THREE.Clock();
  //渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  //场景
  scene = new THREE.Scene();
  //相机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight
  );
  camera.position.z = 1000;
  scene.add(camera);
  
  //网格
  mesh = new THREE.Mesh();
  cubeSineDriver = 0;

  //平面几何体
  textGeo = new THREE.PlaneGeometry(400, 400);
  THREE.ImageUtils.crossOrigin = ""; //Need this to pull in crossdomain images from AWS
  //文本材质
  textTexture = THREE.ImageUtils.loadTexture("img/quickText.png");
  //一种非光泽表面的材质，没有镜面高光。
  textMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    opacity: .6,
    //贴图
    map: textTexture,
    transparent: true,
  });
  //网格
  text = new THREE.Mesh(textGeo, textMaterial);
  text.position.z = 800;
  scene.add(text);

  //平行光
  //平行光是沿着特定方向发射的光。
  //这种光的表现像是无限远,从它发出的光线都是平行的。
  //常常用平行光来模拟太阳光 的效果; 太阳足够远，因此我们可以认为太阳的位置是无限远，所以我们认为从太阳发出的光线也都是平行的。
  light = new THREE.DirectionalLight(0xffffff, 0.5);
  light.position.set(-1, 0, 1);
  scene.add(light);
 
  //烟雾材质
  smokeTexture = THREE.ImageUtils.loadTexture("img/Smoke-Element.png");
  //一种非光泽表面的材质，没有镜面高光。
  smokeMaterial = new THREE.MeshLambertMaterial({
    color: 0x00dddd,
    //贴图
    map: smokeTexture,
    transparent: true,
  });
  //烟雾平面几何体
  smokeGeo = new THREE.PlaneGeometry(300, 300);
  //烟雾粒子
  smokeParticles = [];



  //生成烟雾粒子
  for (p = 0; p < 100; p++) {
    var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
    particle.position.set(
      Math.random() * 500 - 250,
      Math.random() * 500 - 250,
      Math.random() * 1000 - 100
    );
    particle.rotation.z = Math.random() * 360;
    scene.add(particle);
    smokeParticles.push(particle);
  }
  //添加渲染器
  document.body.appendChild(renderer.domElement);
}


//动画
function animate() {
  // note: three.js includes requestAnimationFrame shim
  stats.begin();
  delta = clock.getDelta();
  //动画帧
  requestAnimationFrame(animate);
  //执行烟雾
  evolveSmoke();
  //渲染
  render();
  stats.end();
}



//烟雾
function evolveSmoke() {
  var sp = smokeParticles.length;
  while (sp--) {
    smokeParticles[sp].rotation.z += delta * 0.2;
  }
}


//渲染
function render() {
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.01;
  cubeSineDriver += 0.01;
  mesh.position.z = 100 + Math.sin(cubeSineDriver) * 500;
  renderer.render(scene, camera);
}
