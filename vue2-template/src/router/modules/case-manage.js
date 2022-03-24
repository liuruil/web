// 案件管理模块路由
export default [
    {
        path: '/case-manage',
        name: 'case-manage',
        component: () => import('@/views/case-manage/case-manage-list'),
        meta: {
            navigate: [{
                label: '案件管理'
            }]
        }
    },
];