export const loginRouterName = 'login'; //登陆页面的路由

// 统一的密码加密方法
export function crypto(value) {
    return value;
}

// 状态码
export const statusCode = {
    success: 0,//成功状态
    noLogin: -99,//未登录
    loginTimeout: 10101,//登录超时
    errCode: 'errCode',//状态码
    internalServerError: 500 //服务器内部错误
};

export const codeResource = 0; //0-代表验证码来自前端 1-后端返回图片


// 全局分页参数常量
export const ID = 'id';
export const TOTAL = 'totalCount';
export const PAGE_SIZE = 'pageSize';
export const CURRENT_PAGE = 'currPage';
export const LIST = 'objectList';
export const pageSize = 10;
export const pageSizes = [10, 20, 50, 100];

// 默认logo路径
export const logo = require('../assets/images/logo.png');
