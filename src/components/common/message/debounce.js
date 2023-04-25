import props from './props.js'
/**
 * 判断是否需要防抖;
 * 通过 uid 从 instances 中找出对应的 vm，判断时间差是否小于 message 的停留时间
 * 小于代表需要执行防抖，返回 true
 * 大于代表不需要执行防抖，返回 false
 * 如果未设置 debounce，返回 false
 * 如果未设置 uid，则找不到对应 vm，无法判断，返回 undefined
 */
export function debounce(instances, options) {
  if (!(options.debounce && options.uid)) return
  return instances.some(vm => {
    if (vm.el._uid === options.uid) {
      return Date.now() - vm.el.timestamp < options.duration || props.duration.default
    }
  })
}

// 给 Message 的原生 dom 标记 uid 和 出现的时间毫秒数
export function markTimestamp(vm, options) {
  vm.el.timestamp = Date.now()
  vm.el._uid = options.uid
}
