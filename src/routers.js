import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/common/Login';
import NotFound from '@/components/common/404.vue';
import Home from '@/components/common/Home';
// 组件引用
import AccurateMarket from './components/accurate-marketing/AccurateMarket';
import ViewByDay from './components/business-data-overview/overview-by-day/ViewByDay';
import ViewByWeek from './components/business-data-overview/overview-by-week/ViewByWeek';
import ViewByMonth from './components/business-data-overview/overview-by-month/ViewByMonth';
import ViewByYear from './components/business-data-overview/overview-by-year/ViewByYear';
import BusinessView from './components/business-overview/BusinessView';
import Cockpit from './components/cockpit/Cockpit';
import ContractView from './components/contract-overview/ContractView';
import MapVisual from './components/map-visualization/MapVisual';
import PassengerFlow from './components/passenger-flow/PassengerFlow';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      name: '',
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    },
    {
      path: '/',
      component: Home,
      children: [{
        path: 'viewbyday',
        name: '经营报告-日',
        component: ViewByDay
      }]
    },
    {
      path: '/',
      component: Home,
      children: [{
        path: 'viewbyweek',
        name: '经营报告-周',
        component: ViewByWeek
      }]
    },
    {
      path: '/',
      component: Home,
      children: [{
        path: 'viewbymonth',
        name: '经营报告-月',
        component: ViewByMonth
      }]
    },
    {
      path: '/',
      component: Home,
      children: [{
        path: 'viewbyyear',
        name: '经营报告-年',
        component: ViewByYear
      }]
    },
    {
      path: '/',
      component: Home,
      children: [{
        path: 'contract',
        name: '合约概览',
        component: ContractView
      }]
    },
    {
      path: '/',
      component: Home,
      children: [{
        path: 'business',
        name: '营业概览',
        component: BusinessView
      }]
    },
    {
      path: '/',
      component: Home,
      children: [{
        path: 'marketing',
        name: '精准营销准备',
        component: AccurateMarket
      }]
    },
    {
      path: '/',
      component: Home,
      children: [{
        path: 'flow',
        name: '客流情况',
        component: PassengerFlow
      }]
    },
    {
      path: '/',
      component: Home,
      children: [{
        path: 'cockpit',
        name: '驾驶舱',
        component: Cockpit
      }]
    },
    {
      path: '/',
      component: Home,
      children: [{
        path: 'mapview',
        name: '商业地图可视化',
        component: MapVisual
      }]
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
});
