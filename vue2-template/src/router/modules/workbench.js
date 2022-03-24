// 工作台模块路由
export default [
    {
        path: '/workbench',
        name: 'workbench',
        component: () => import('@/views/workbench/workbench-list'),
        meta: {
            navigate: [{
                label: '工作台'
            }]
        }
    }
];