// 处理vue-router在跳转时自己启动debug模式控制台会报Uncaught (in promise)的问题
import Router from 'vue-router';
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}; 