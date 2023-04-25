import { isString } from 'lodash'
import props from './props.js'
import { markTimestamp, debounce } from './debounce.js'
import { renderDestory } from './renderDestory.js'
import MessageComp from './message.vue'

const instances = [] // 存在在屏幕上的消息框vnode数组
let id = 0 // 每个消息框的id
let topmostOffset = 0

const Message = options => {
  if (isString(options)) return // 不能使用 Message('string') 的方式调用
  if (debounce(instances, options)) return // 判断是否需要执行防抖，需要执行的话直接返回

  if (!instances.length) {
    // 如果页面已存在其他消息框，则 topmostOffset 属性不生效
    topmostOffset = options.topmostOffset || props.topmostOffset.default
  }
  let totalOffset = topmostOffset
  instances.forEach(vm => {
    // 如果同步连续创建 Message，无法同步获取 offsetHeight，待解决
    totalOffset += vm.el.offsetHeight + props.elementOffset.default
  })

  options = {
    ...options,
    id: id++,
    _totalOffset: totalOffset,
    onClose: options.onClose || props.onClose.default
  }

  const vm = renderDestory(MessageComp, options, instances) // 渲染、销毁、移出计算后面弹出框高度
  markTimestamp(vm, options) // 防抖相关，标记 uid 和 timestamp
}

;['success', 'warning', 'error', 'info'].forEach(type => {
  Message[type] = function (message = '') {
    if (!isString(message)) return
    Message({ message, type })
  }
})

export default Message
