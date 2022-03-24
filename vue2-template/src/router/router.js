import caseManageRouter from './modules/case-manage';
import loginRouter from './modules/login';
import monitorConfigRouter from './modules/monitor-config';
import myMonitorRouter from './modules/my-monitor';
import selfCenterRouter from './modules/self-center';
import userManageRouter from './modules/user-manage';
import workbenchRouter from './modules/workbench';
export default [
    {
        path: '/',
        name: '/',
        redirect: '/login'
    },
    loginRouter,
    {
        path: '/layout',
        name: 'layout',
        component: () => import('@/views/layout/layout-tlr'),
        children: [
            ...workbenchRouter,
            ...caseManageRouter,
            ...myMonitorRouter,
            ...monitorConfigRouter,
            ...userManageRouter,
            ...selfCenterRouter,
            {
                path: '/test',
                name: 'test',
                component: () => import('@/views/Test.vue'),
                meta: {
                    requireAuth: false,
                }
            }
        ]
    },
];