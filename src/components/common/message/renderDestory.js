import { createVNode, render } from 'vue'
import props from './props.js'

// 把组件变成虚拟节点，然后变成真实节点渲染到body上
export function renderDestory(MessageComponent, options, instances) {
  // 创建容器
  const container = document.createElement('div')
  // 虚拟节点vnode，并将参数传入
  const vm = createVNode(MessageComponent, options)
  // 渲染成真实节点并挂载到container上
  render(vm, container)
  // 将vm存起来，用来通过数量计算vm的顶部偏移量
  instances.push(vm)
  // 此时的 container 里面的 vm 已经变成了真实节点。不希望把container也渲染上去，所以拿到里面的message
  const MessageRealDom = container.firstElementChild
  // 将 container 插入到 body 里
  document.body.appendChild(MessageRealDom)

  // 最顶部消息框移除前，将其从instances中删除，并且重新计算下面消息框的totalOffset
  vm.props.onBeforeClose = ({ id, height }) => {
    const index = instances.findIndex(vm => vm.props.id === id)
    // console.log(index)
    // console.log(instances)
    if (index === -1) return

    instances.splice(index, 1)

    instances.forEach((vm, i) => {
      // 只向上移动当前移除的消息框下方的消息框，姜然起作用了！之前试了好多方法都写不出element plus上面鼠标悬浮消息框保留的功能
      if (i >= index) {
        vm.component.props._totalOffset -= height + props.elementOffset.default
      }
    })
  }

  // 从message组件里发射afterClose的方法，用下面的方式触发，并卸载container移除dom
  vm.props.onAfterClose = () => {
    render(null, container)
  }

  return vm
}
