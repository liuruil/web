// 登陆页面模块路由
export default {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    meta: {
        requireAuth: false,
    }
};