/*
* @Brief: 商业地图可视化 主文件
* @Author: 张文亮
* @Date: 2018-11-02 20:20:04
 * @Last Modified by: xwq
 * @Last Modified time: 2018-11-06 12:12:55
*/
<template>
  <div id="three"></div>
</template>
<script>
import XD from '../../js/three';
export default {
  mounted () {
    let a = new XD('three');
  },
  methods: {}
};
</script>
<style scoped>
  #three {
    height: 100%;
    width: 100%;
  }
</style>
