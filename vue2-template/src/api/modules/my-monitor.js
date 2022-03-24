import fetch from '@/api/fetch';

// 我的监测列表
export function myMonitorList(params) {
    return fetch.post('/my-monitor/list', params);
}

// 我的监测停用
export function disableMyMonitor(params) {
    return fetch.post('/my-monitor/disable', params);
}

// 我的监测启用
export function enableMyMonitor(params) {
    return fetch.post('/my-monitor/enable', params);
}

// 我的监测删除
export function deleteMyMonitor(params) {
    return fetch.post('/my-monitor/delete', params);
}

// 我的监测详情
export function myMonitorDetails(params) {
    return fetch.post('/my-monitor/details', params);
}