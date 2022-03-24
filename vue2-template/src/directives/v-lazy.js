import bus from '../eventBus'
import { debounce } from '@/util'
import defaultImage from '../assets/1.webp'

// 懒加载图片队列
let images = []

// 默认图片高度
const minHeight = 160

function setImages() {
  for (const image of images) {
    setImage(image)
  }
}

function setImage(image) {
  // 先用默认图片代替
  image.dom.src = defaultImage

  // 获取浏览器视口的高度
  const documentRectHeight = document.documentElement.clientHeight
  const rect = image.dom.getBoundingClientRect()

  const height = rect.height || minHeight

  //   判断图片是否在视口中
  if (rect.top > -height && rect.top <= documentRectHeight) {
    const img = new Image()
    img.onload = function () {
      image.dom.src = image.src
      //   在图片数组中移除这个元素
      images = images.filter(i => i !== image)
    }
    img.src = image.src
  }
}

bus.$on('scroll', debounce(setImages, images))

export default {
  // 元素被插入到父元素
  inserted(el, binding) {
    const image = {
      dom: el,
      src: binding.value
    }
    images.push(image)
    setImage(image)
  },
  unbind(el) {
    //   移除的时候把图片从数组队列中去掉
    images = images.filter(i => i.dom !== el)
  }
}

{/* <img class="images" v-lazy="item.src" alt="" /> */ }
