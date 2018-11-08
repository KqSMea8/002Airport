import * as THREE from 'three';
import axios from 'axios';
import GeomConvert from './convert';
import { makeTextSprite } from './sprties';
let _ = require('lodash');
export default class GeomUtil {
  static getPoint (polygon) {
    return GeomConvert.getPolygonCenter(polygon);
  }
  static www (record) {
    let data = record.data.map((item) => {
      let spriteOrigin = makeTextSprite(item.properties.NAME_CHN != null ? item.properties.NAME_CHN : '',
        {
          fontsize: 40,
          borderColor: {r: 255, g: 0, b: 0, a: 0.4}, /* 边框黑色 */
          backgroundColor: {r: 255, g: 255, b: 255, a: 0}/* 背景颜色 */
        });
      spriteOrigin.center = new THREE.Vector2(0, 0);
      let x = item.geometry.coordinates[0];
      let y = item.geometry.coordinates[1];
      spriteOrigin.position.set(x, y, 1);
      // spriteOrigin.rotation.x = -Math.PI * 0.5;
      // window.scene.add(spriteOrigin);
      return spriteOrigin;
    });
    var group = new THREE.Group();
    // group.rotation.x = -Math.PI * 0.5;
    data.forEach(element => {
      group.add(element);
    });
    return group;
  }
  static qqq (record) {
    let data = record.data.map((item) => {
      let coords = item.geometry.coordinates[0][0];
      let firstPoint = coords[0];
      var shape = new THREE.Shape();

      // startpoint
      shape.moveTo(firstPoint[0], firstPoint[1]);
      coords.forEach(element => {
        shape.lineTo(element[0], element[1]);
      });
      let extrudedHeight = 2;
      if (item.properties.level == 210103) {
        // var geometry2 = new THREE.ShapeGeometry(shape);
        // var mesh2 = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({
        //   color: record.color
        // }));
        // return mesh2;
        return;
      } else if (item.properties.level == 210101 || item.properties.level == 210105 || item.properties.level == 210104 || item.properties.level == 210101) {
        return;
      }

      var extrudeSettings = {
        depth: extrudedHeight,
        bevelEnabled: false,
        bevelSegments: 2,
        curveSegments: 1,
        steps: 2,
        bevelSize: 1,
        bevelThickness: 1 };

      var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

      var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        color: record.color,
        transparent: true,
        opacity: 0.4
        //   wireframe: true
      }));
      let edges = new THREE.EdgesHelper(mesh, 0x1535f7);
      edges.rotation.x = -Math.PI * 0.5;
      // window.scene.add(edges);
      // straight line upwards

      return mesh;
    });
    var group = new THREE.Group();
    // group.rotation.x = -Math.PI * 0.5;
    data.forEach(element => {
      if (!(element instanceof THREE.Object3D)) {
        return;
      }
      group.add(element);
    });
    return group;
  }
  static loadJson (url) {
    let a = axios.get(url);
    return a.then((e) => {
      let classified = _.groupBy(e.data.features, (e) => {
        return e.properties.level;
      });
      let classifiedArr = [];
      for (let item in classified) {
        let record = {};
        record.num = item;
        record.data = classified[item];
        record.color = 0xFFFFFF * Math.random();
        classifiedArr.push(record);
      }
      let points = classifiedArr.map((item) => {
        let result = {};
        let groupedPoints = item.data.map((poly) => {
          let point = GeomUtil.getPoint(poly);
          point.properties = poly.properties;
          return point;
        });
        result.num = item.num;
        result.data = groupedPoints;
        return result;
        // return GeomUtil.getPoint(item.data[0]);
      });
      points.forEach((e) => {
        let result = GeomUtil.www(e);
        result.rotation.x = -Math.PI * 0.5;
        result.name = 'labels';
        window.scene.add(result);
        // var spriteMap = new THREE.TextureLoader().load('sprite.png');
        // var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
        // var sprite = new THREE.Sprite(spriteMaterial);
        // var geometry = new THREE.TextGeometry('Hello three.js!', {
        //   size: 80,
        //   height: 5,
        //   curveSegments: 12,
        //   bevelEnabled: true,
        //   bevelThickness: 10,
        //   bevelSize: 8,
        //   bevelSegments: 5
        // });
      });
      let result = classifiedArr.map((item) => {
        return GeomUtil.qqq(item);
        // let coords = item.geometry.coordinates[0][0];
        // let firstPoint = coords[0];
        // var shape = new THREE.Shape();

        // // startpoint
        // shape.moveTo(firstPoint[0], firstPoint[1]);
        // coords.forEach(element => {
        //   shape.lineTo(element[0], element[1]);
        // });
        // var extrudeSettings = { depth: 5, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

        // var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        // var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        //   color: 'red'
        // //   wireframe: true
        // }));
      }).reduce((total, num) => {
        return total.add(num);
      });
      result.rotation.x = -Math.PI * 0.5;
      return result;
      //   let data = e.data.features.map((item) => {
      //     let coords = item.geometry.coordinates[0][0];
      //     let firstPoint = coords[0];
      //     var shape = new THREE.Shape();

      //     // startpoint
      //     shape.moveTo(firstPoint[0], firstPoint[1]);
      //     coords.forEach(element => {
      //       shape.lineTo(element[0], element[1]);
      //     });
      //     let extrudedHeight = 8;
      //     if (item.properties.level === 210103) {
      //       var geometry2 = new THREE.ShapeGeometry(shape);
      //       var mesh2 = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({
      //         color: 0xFFFFFF * Math.random()
      //       }));
      //       return mesh2;
      //     } else if (item.properties.level === 210101 || item.properties.level === 210105) {
      //       return;
      //     }
      //     var extrudeSettings = { depth: extrudedHeight, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

      //     var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

      //     var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
      //       color: 0xFFFFFF * Math.random()
      //     //   wireframe: true
      //     }));
      //     // straight line upwards

      //     return mesh;
      //   });
      //   debugger;
      //   var group = new THREE.Group();
      //   group.rotation.x = -Math.PI * 0.5;
      //   data.forEach(element => {
      //     group.add(element);
      //   });
    //   return group;
    });
  }
}
