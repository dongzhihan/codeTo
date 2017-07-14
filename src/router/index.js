import Vue from 'vue';
import Router from 'vue-router';
import index from '../components/index.vue';
import bedDetail from '../components/pages/bedDetail.vue';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/bedDetail/:id',
      name: 'bedDetail',
      component: bedDetail
    }
  ]
});
