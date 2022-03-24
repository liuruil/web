import fetch from '@/api/fetch';

// 用户列表
export function userList(params) {
    return fetch.post('/user/list', params);
}

// 用户添加
export function addUser(params) {
    return fetch.post('/user/add', params);
}

// 用户更新
export function updateUser(params) {
    return fetch.post('/user/update', params);
}

// 用户停用
export function freezeUser(params) {
    return fetch.post('/user/freeze', params);
}

// 用户启用
export function unfreezeUser(params) {
    return fetch.post('/user/unfreeze', params);
}