import fetch from '@/api/fetch';

// 工作台列表
export function workbenchList(params) {
    return fetch.post('/workbench/list', params);
}

// 工作台详情
export function workbenchDetail(params) {
    return fetch.post('/workbench/details', params);
}

// 工作台标记已读
export function workbenchRead(params) {
    return fetch.post('/workbench/read', params);
}