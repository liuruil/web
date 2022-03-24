// 登录页背景图图片预加载
export default function (dom, binding) {
    const img = new Image();
    img.onload = function () {
        dom.style.backgroundImage = 'url(' + binding.value + ')';
    };
    img.src = binding.value;
}