import fetch from '@/api/fetch';


// 案件管理列表
export function caseList(params) {
    return fetch.post('/case/list', params);
}

// 案件创建监测
export function createCase(params) {
    return fetch.post('/case/create', params);
}