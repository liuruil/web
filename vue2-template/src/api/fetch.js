import axios from 'axios';
import qs from 'qs';

import { loginRouterName, statusCode } from '@/config';
import { notify } from '@/util/notify';

import router from '../router';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 0,
});

service.interceptors.request.use(
  request => {
    if (sessionStorage.getItem('token')) {
      request.headers.token = sessionStorage.getItem('token');
    }
    request.data = qs.stringify(request.data);
    return request;
  },
  err => {
    return Promise.reject(err);
  });

service.interceptors.response.use(
  response => {
    if (response.data[statusCode.errCode] !== statusCode.success) {
      notify(response.data.msg, 'error');
    }
    if (response.data[statusCode.errCode] === statusCode.loginTimeout) {
      router.push({
        name: loginRouterName
      });
    }
    return response.data;
  },
  ({ response }) => {
    if (response.status === statusCode.internalServerError) {
      notify('服务器内部错误', 'error');
    }
    return {};
  });

export default service;
