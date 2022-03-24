// 我的监测模块路由
export default [
    {
        path: '/my-monitor',
        name: 'my-monitor',
        component: () => import('@/views/my-monitor/my-monitor-list'),
        meta: {
            navigate: [{
                label: '我的监测'
            }]
        }
    },
];