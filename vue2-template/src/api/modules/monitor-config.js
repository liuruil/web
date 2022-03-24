import fetch from '@/api/fetch';

// 监测配置规则列表
export function ruleList(params) {
    return fetch.post('/rule/list', params);
}

// 获取监测配置规则全部数据
export function ruleAllList(params) {
    return fetch.post('/rule/all/list', params);
}

// 创建监测配置规则
export function addRule(params) {
    return fetch.post('/rule/add', params);
}

// 更新监测配置规则
export function updateRule(params) {
    return fetch.post('/rule/update', params);
}

// 删除监测配置规则
export function deleteRule(params) {
    return fetch.post('/rule/delete', params);
}