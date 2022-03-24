// 用户管理模块路由
export default [
    {
        path: '/user-manage',
        name: 'user-manage',
        component: () => import('@/views/user-manage/user-list'),
        meta: {
            navigate: [{
                label: '用户管理'
            }]
        }
    },
    {
        path: '/user-add',
        name: 'user-add',
        component: () => import('@/views/user-manage/user-add'),
        meta: {
            navigate: [{
                label: '用户管理',
                router: '/user-manage'
            },
            {
                label: '新建用户',
            }],
            activeMenu: '/user-manage'
        }
    },
    {
        path: '/user-edit',
        name: 'user-edit',
        component: () => import('@/views/user-manage/user-add'),
        meta: {
            navigate: [{
                label: '用户管理',
                router: '/user-manage'
            },
            {
                label: '编辑用户',
            }],
            activeMenu: '/user-manage'
        }
    },
];