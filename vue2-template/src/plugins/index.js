import * as echarts from 'echarts';

import { statusCode } from '@/config';
import { notify } from '@/util/notify';

export default {
    install(Vue) {
        // Vue的原型上添加一些额外的属性
        Vue.prototype.$$_notify = notify;
        Vue.prototype.$$_echarts = echarts;
        Vue.prototype.$$_errCode = statusCode.errCode;
        Vue.prototype.$$_successCode = statusCode.success;//成功的状态码
    }
};