/*
 * @Brief: 左侧多级菜单
 * @Author: 张文亮
 * @Date: 2018-10-18 09:38:03
 * @Last Modified by: 张文亮
 * @Last Modified time: 2018-11-07 08:52:08
 */
<template>
  <div class="navMenu">
    <el-menu v-for="(navMenu,index) in navMenus" v-bind:key="index" width="auto"
          background-color="#314D7C" class="el-menu-vertical-demo"
          text-color="#88B6FB"  active-text-color="#D2FF57" router >
        <!-- 最后一级菜单 -->
      <el-menu-item v-if="!navMenu.childs&&navMenu.entity" :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.value" :route="navMenu.entity.value">
        <i :class="navMenu.entity.icon"></i>
        <span slot="title">{{navMenu.entity.alias}}</span>
      </el-menu-item>
      <!-- 此菜单下还有子菜单 -->
      <el-submenu  v-if="navMenu.childs&&navMenu.entity"
                  :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name">
        <div slot="title">
          <i :class="navMenu.entity.icon"></i>
          <span> {{navMenu.entity.alias}}</span>
        </div>
        <!-- 递归 -->
        <NavMenu :navMenus="navMenu.childs"></NavMenu>
      </el-submenu >
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: {
    navMenus: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
    };
  },
  methods: {

  },
  computed: {

  },
  mounted () {

  }
};
</script>

<style scoped>
.navMenu{
  height: 100%;
}
.navMenu .el-menu{
    border-right: solid 0px #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
}
.navMenu span{
  display: inline-block;
  overflow: hidden;
  width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}
.navMenu i{
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}
</style>
