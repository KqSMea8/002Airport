import * as THREE from 'three';
var map = new THREE.TextureLoader().load('../../../../static/111.png');
// console.log(loader);
// loader.load('../../../../static/111.png', (texture) => {
//   console.log(texture);
// });
export function makeTextSprite (message, parameters) {
  if (parameters === undefined) parameters = {};

  let fontface = parameters.hasOwnProperty('fontface')
    ? parameters['fontface'] : 'Arial';

    /* 字体大小 */
  let fontsize = parameters.hasOwnProperty('fontsize')
    ? parameters['fontsize'] : 18;

    /* 边框厚度 */
  let borderThickness = parameters.hasOwnProperty('borderThickness')
    ? parameters['borderThickness'] : 4;

    /* 边框颜色 */
  let borderColor = parameters.hasOwnProperty('borderColor')
    ? parameters['borderColor'] : { r: 0, g: 0, b: 0, a: 1.0 };

    /* 背景颜色 */
  let backgroundColor = parameters.hasOwnProperty('backgroundColor')
    ? parameters['backgroundColor'] : { r: 255, g: 255, b: 255, a: 1 };

    /* 创建画布 */
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');

  /* 字体加粗 */
  context.font = 'Bold ' + fontsize + 'px ' + fontface;

  /* 获取文字的大小数据，高度取决于文字的大小 */
  let metrics = context.measureText(message);
  let textWidth = metrics.width;

  /* 背景颜色 */
  //   context.fillStyle = 'rgba(' + backgroundColor.r + ',' + backgroundColor.g + ',' +
  //         backgroundColor.b + ',' + backgroundColor.a + ')';

  /* 边框的颜色 */
  context.strokeStyle = 'rgba(' + borderColor.r + ',' + borderColor.g + ',' +
          borderColor.b + ',' + borderColor.a + ')';
  context.lineWidth = borderThickness;

  /* 绘制圆角矩形 */
  roundRect(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness + 32, fontsize * 1.4 + borderThickness, 6);

  /* 字体颜色 */
  context.fillStyle = 'rgba(0, 0, 0, 1.0)';
  context.fillText(message, borderThickness + 64, fontsize + borderThickness);

  /* 画布内容用于纹理贴图 */
  let texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  let spriteMaterial = new THREE.SpriteMaterial({
    depthWrite: false
    // map: texture
    // color: new THREE.Color('rgb(255, 255, 255,0)')
  });
  let sprite = new THREE.Sprite(spriteMaterial);

  //   var material = new THREE.SpriteMaterial({ map: map, color: 0xffffff, fog: true });
  //   var sprite = new THREE.Sprite(material);

  //   console.log(sprite);

  /* 缩放比例 */
  //   sprite.scale.set(10, 5, 0);
  sprite.scale.set(6, 3, 0);

  return sprite;
}
function roundRect (ctx, x, y, w, h, r) {
  ctx.beginPath();
  var img = new Image();
  let path = '../../../../static/img/icon/' + padding4(Math.floor(Math.random() * 80), 3) + '.png';
  console.log(path);
  img.src = path;
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
  };
//   ctx.moveTo(x + r, y);
//   ctx.lineTo(x + w - r, y);
//   ctx.quadraticCurveTo(x + w, y, x + w, y + r);
//   ctx.lineTo(x + w, y + h - r);
//   ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
//   ctx.lineTo(x + r, y + h);
//   ctx.quadraticCurveTo(x, y + h, x, y + h - r);
//   ctx.lineTo(x, y + r);
//   ctx.quadraticCurveTo(x, y, x + r, y);
//   ctx.closePath();
//   ctx.fill();
//   ctx.stroke();
}
function padding4 (num, length) {
  // 这里用slice和substr均可
  return (Array(length).join('0') + num).slice(-length);
}
export function isOverlap (sprite1, sprite2) {
  var x1 = sprite1.positon.x;
  var y1 = sprite1.positon.y;
  var w1 = sprite1.material.map.image.width;
  var h1 = sprite1.material.map.image.height;
  var x2 = sprite2.positon.x;
  var y2 = sprite2.positon.y;
  var w2 = sprite2.material.map.image.width;
  var h2 = sprite2.material.map.image.height;
  if (Math.abs(x2 - x1) > (w1 + w2) / 2 && Math.abs(y2 - y1) > (h1 + h2) / 2) {
    return true;
  }
  // if (x1 >= x2 && x1 >= x2 + w2) {
  //   return false;
  // } else if (x1 <= x2 && x1 + w1 <= x2) {
  //   return false;
  // } else if (y1 >= y2 && y1 >= y2 + h2) {
  //   return false;
  // } else if (y1 <= y2 && y1 + h1 <= y2) {
  //   return false;
  // } else {
  //   return true;
  // }
}
