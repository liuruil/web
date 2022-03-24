/**
 * 判断是否为IE浏览器
 * @returns 
 */
export function isIE() {
    return window.navigator.userAgent.toLowerCase().indexOf('trident') > -1 ? true : false;
}