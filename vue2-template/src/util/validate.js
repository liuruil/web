import isEmail from 'validator/es/lib/isEmail';

// 验证不能输入中文
export function validateEnglish(prop) {
    return function (rules, value, callback) {
        const reg = /[\u4E00-\u9FA5]/ig;
        if (value === '') {
            callback(new Error(prop + '不能为空'));
        } else {
            if (reg.test(value)) {
                callback(new Error(prop + '不能输入中文'));
            } else {
                callback();
            }
        }
    };
}

// 验证电话号码规则
export function checkPhoneNum(prop = '手机号') {
    return (rule, value, callback) => {
        const reg = /^1(3|4|5|6|7|8)\d{9}$/;
        if (value === '') {
            callback(new Error('请输入' + prop));
        } else {
            if (!reg.test(value)) {
                callback(new Error(prop + '格式不正确'));
            } else {
                callback();
            }
        }
    };
}

// 验证邮箱
export function checkEmail(prop = '邮箱') {
    return (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入' + prop));
        } else {
            if (!isEmail(value)) {
                callback(new Error(prop + '格式不正确'));
            } else {
                callback();
            }
        }
    };
}

// 验证密码
export const validatePassword = (rule, value, callback) => {
    const passwordReg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![\W]+$).{8,16}$/;
    if (!value) {
        callback(new Error('请输入新密码'));
    } else {
        if (!passwordReg.test(value)) {
            callback(new Error('新密码必须包含字母和数字，并且在8~16个字符之间'));
        } else {
            callback();
        }
    }
};
