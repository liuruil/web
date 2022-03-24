import { Message,Notification } from 'element-ui';

/**
 * 根据类型推导类型和标题，注意这里可以简化书写，如's' === 'success' === 'S'
 * @param {String} type
 */
const getType = (type) => {
  let titleInfer = '';
  let typeInfer = '';
  switch (type) {
    case 'success':
    case 'S':
    case 's':
      titleInfer = '成功';
      typeInfer = 'success';
      break;
    case 'warning':
    case 'W':
    case 'w':
      titleInfer = '提示';
      typeInfer = 'warning';
      break;
    case 'error':
    case 'E':
    case 'e':
      titleInfer = '错误';
      typeInfer = 'error';
      break;
    case 'info':
    case 'I':
    case 'i':
      titleInfer = '提示';
      typeInfer = 'info';
      break;
  }
  return {
    titleInfer,
    typeInfer
  };
};

/**
 * 全局通知方法
 * @param {String} msg 通知消息(必须)
 * @param {String} type 通知类型(可选)
 * @param {String} title 通知标题(可选)
 */
export const notify = (msg, type = 's', title) => {
  let {
    titleInfer,
    typeInfer
  } = getType(type);
  if (title) {
    titleInfer = title;
  }
  Notification({
    title: titleInfer,
    message: msg,
    type: typeInfer,
    position: 'bottom-right',
    duration: 1000
  });
};

/**
 * 轻提醒
 * @param {String} msg 提醒消息(必须)
 * @param {String} type 提醒类型(可选)
 */
export const message = (msg, type = 's') => {
  let {
    typeInfer
  } = getType(type);
  Message({
    message: msg,
    type: typeInfer,
    customClass: 'z-z-index',
    duration: 1000
  });
};
