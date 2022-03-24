import fetch from '@/api/fetch';

// 登录接口
export function userLogin(params) {
  return fetch.post('/user/login', params);
}

// 退出登录
export function userLogout(params) {
  return fetch.post('/user/logout', params);
}

// 获取验证码
export function userVCode(params) {
  return fetch.get('/user/v-code', { params });
}

// 更新密码
export function userResetPwd(params) {
  return fetch.post('/user/reset-pwd', params);
}