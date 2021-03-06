import * as THREE from 'three';
import GeomUtil from './geometry';
require('three/examples/js/controls/OrbitControls');
export default class XD {
  constructor (domID, option) {
    this.dom = document.getElementById(domID);
    this.option = option;
    this.initScene();
  }
  init () {

  }
  initRender () {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(new THREE.Color('white'));
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
  }
  initAmbient () {
    this.ambient = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(this.ambient);
  }
  initSpotlight () {
    // add spotlight for the shadows
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(-40, 60, -10);
    this.spotLight.angle = Math.PI / 4;
    this.spotLight.penumbra = 0.05;
    this.spotLight.decay = 2;
    this.spotLight.distance = 200;
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 2048;
    this.spotLight.shadow.mapSize.height = 2048;
    this.spotLight.shadow.camera.near = 10;
    this.spotLight.shadow.camera.far = 200;
    this.spotLight.castShadow = true;
    this.scene.add(this.spotLight);
  }
  initHelper () {
    let lightHelper = new THREE.SpotLightHelper(this.spotLight);
    this.scene.add(lightHelper);
    let shadowCameraHelper = new THREE.CameraHelper(this.spotLight.shadow.camera);
    this.scene.add(shadowCameraHelper);
    this.scene.add(new THREE.AxesHelper(10));
  }
  initCamera () {
    this.camera = new THREE.PerspectiveCamera(45, this.dom.offsetWidth / this.dom.offsetHeight, 0.1, 10000);
    this.camera.position.x = -30;
    this.camera.position.y = 40;
    this.camera.position.z = 30;
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);
  }
  initControl () {
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener('change', this.animate.bind(this));
    this.controls.minDistance = 20;
    this.controls.maxDistance = 5000;
    this.controls.enablePan = true;
  }
  initScene () {
    var scene = new THREE.Scene();
    window.scene = scene;
    this.scene = scene;
    this.initAmbient();
    this.initCamera();
    this.initRender();
    this.initControl();
    // this.initSpotlight();
    // this.initHelper();
    // create the ground plane
    var material = new THREE.MeshPhongMaterial({ color: 0xf4f4f4, dithering: true });
    // var geometry = new THREE.PlaneBufferGeometry(2000, 2000);
    var shape = new THREE.Shape();
    shape.moveTo(-1000, -1000);
    shape.lineTo(-1000, 1000);
    shape.lineTo(1000, 1000);
    shape.lineTo(1000, -1000);
    shape.moveTo(-1000, -1000);
    var extrudeSettings = {
      depth: 1,
      bevelEnabled: false,
      bevelSegments: 2,
      curveSegments: 1,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    var mesh = new THREE.Mesh(geometry, material);
    let group = GeomUtil.loadJson('../../../static/data/baiyunjson/f2.geojson');
    group.then((e) => {
      scene.add(e);
    });

    mesh.position.set(0, -1, 0);
    mesh.rotation.x = -Math.PI * 0.5;
    mesh.receiveShadow = true;
    scene.add(mesh);
    this.dom.appendChild(this.renderer.domElement);
    this.renderer.render(scene, this.camera);
  }
  animate () {
    // requestAnimationFrame(this.animate.bind(this))
    this.renderer.render(this.scene, this.camera);
  }
}
window.name = 111;
let A = function () {
  this.name = 222;
  this.aaa = function () {
    aaa.apply(this);
  };
};
function aaa () {
  console.log(this.name);
}
let B = function () {
  this.name = 33;
  this.aaa = function () {

  };
};
function bbb () {

}
let xwq = new A();

xwq.aaa();
