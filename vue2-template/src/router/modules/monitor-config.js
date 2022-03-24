// 监测配置模块路由
export default [
    {
        path: '/monitor-config',
        name: 'monitor-config',
        component: () => import('@/views/monitor-config/monitor-config-list'),
        meta: {
            navigate: [{
                label: '监测配置'
            }]
        }
    },
];