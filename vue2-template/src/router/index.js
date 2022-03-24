import Vue from 'vue';
import VueRouter from 'vue-router';

import { notify } from '@/util/notify';

import { loginRouterName } from '../config';
import { getItemByArray } from '../util';
import routes from './router';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes
});

/**
 * @description 全局路由配置
 */
router.beforeEach((to, from, next) => {
  let wordTip = '';//提示语
  let goLogin = true; //是否需要回到登录页面
  if (!to.name) {//路径不存在的情况 输入错误的路径的情况
    wordTip = '您访问的路径不存在';
  } else if (to.meta.requireAuth === false) {//不需要权限的情况
    goLogin = false;
  } else { //需要权限
    let router = to.path;
    if (to.meta.navigate && to.meta.navigate[0].router) {//在二级菜单的情况下 只需要判断父级的情况
      router = to.meta.navigate[0].router;
    }
    if (!sessionStorage.getItem('token')) { //没有登录
      wordTip = '请登录后操作';
    } else if (!getItemByArray(router, JSON.parse(sessionStorage.getItem('menuList')), 'childNodes', 'resourceUri')) { //登录了但是没有存在于列表中
      wordTip = '您没有权限访问该路径';
    } else { //认证通过
      goLogin = false;
    }
  }
  goLogin && notify(wordTip, 'error');
  next(goLogin ? { name: loginRouterName } : undefined);
});

export default router;
