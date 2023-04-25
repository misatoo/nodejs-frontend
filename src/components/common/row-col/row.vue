<template>
  <div class="z-row" ref="zRowRef" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, provide } from 'vue'

export default defineComponent({
  name: 'z-row',
  props: {
    // 控制 z-col 的间距
    // 注意：如果加上 gutter 在占满浏览器宽度的情况下会出现滚动条.如果一定需要在占满浏览器宽度的情况下使用，建议在外侧包裹div并加上overflow:hidden
    gutter: {
      type: [Number, String],
      default: 0,
      validator(span) {
        if (isNaN(Number(span))) {
          console.warn(
            '[Zerolo warn]: Invalid prop: Prop gutter in <z-row></z-row> must be a number or a string can be parsed to number.'
          )
        }
        return true
      }
    },
    layout: {
      type: String,
      validator(layout) {
        if (layout && !['start', 'end', 'center', 'space-around', 'space-between'].includes(layout)) {
          console.warn(
            '[Zerolo warn]: Invalid prop: Prop layout in <z-row></z-row> must be one of the following props: [start, end, center, space-around, space-between].'
          )
        }
        return true
      }
    }
  },

  setup(props) {
    // gutter 需要传递到 z-col 中使用
    provide('gutter', props.gutter)

    // 将 z-row 的宽度左右延长 gutter/2，去掉左右的 gutter 边距
    const rowStyle = computed(() => {
      let style = {}
      if (props.gutter) {
        style = {
          ...style,
          marginLeft: -props.gutter / 2 + 'px',
          marginRight: -props.gutter / 2 + 'px'
        }
      }
      if (props.layout) {
        const justifyContent = ['start', 'end'].includes(props.layout) ? 'flex-' + props.layout : props.layout
        style = {
          ...style,
          justifyContent
        }
      }
      return style
    })

    // 去掉左右边距不能像下面这么写（去掉第一个孩子的左边距和最后的孩子的右边距），因为如果涉及到 z-col 换行的情况，下面的方式就不适用了
    // #region
    // const zRowRef = ref(null)
    // onMounted(() => {
    //   for (let i = 0; i < zRowRef.value.children.length; i++) {
    //     const element = zRowRef.value.children[i];
    //     if (i === 0) {
    //       element.style.paddingLeft = 0
    //     }
    //     if (i === zRowRef.value.children.length - 1) {
    //       element.style.paddingRight = 0
    //     }
    //   }
    // })
    // #endregion

    return {
      rowStyle
    }
  }
})
</script>

<style lang="scss" scoped>
.z-row {
  display: flex; // 利用 flex 布局控制 z-row 中的 z-span 处于一行
  flex-wrap: wrap;
}
</style>
