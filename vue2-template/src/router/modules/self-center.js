// 个人中心路由模块
export default [
    {
        path: '/self-center',
        name: 'self-center',
        component: () => import('@/views/self-center/self-center-details'),
        meta: {
            navigate: [{
                label: '个人中心',
            }],
        },
    },
];