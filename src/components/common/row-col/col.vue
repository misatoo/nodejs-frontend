<template>
  <div class="z-col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref, computed, inject } from 'vue'

export default defineComponent({
  name: 'z-col',
  props: {
    // 控制 z-col 占 96 份中的多少份
    span: {
      type: [Number, String],
      default: 96,
      validator(span) {
        if (isNaN(Number(span))) {
          console.warn(
            '[Zerolo warn]: Invalid prop: Prop span in <z-col></z-col> must be a number or a string that can be parsed to number.'
          )
        }
        return true
      }
    },
    // 控制左侧偏移量
    offset: {
      type: [Number, String],
      default: 0,
      validator(span) {
        if (isNaN(Number(span))) {
          console.warn(
            '[Zerolo warn]: Invalid prop: Prop offset in <z-col></z-col> must be a number or a string that can be parsed to number.'
          )
        }
        return true
      }
    },
    // 媒体查询
    xs: Number,
    sm: Number,
    md: Number,
    lg: Number,
    xl: Number
  },

  setup(props) {
    const colClass = computed(() => {
      let classes = []
      classes.push(`z-col-span-${props.span}`)
      if (props.offset) {
        classes.push(`z-col-offset-${props.offset}`)
      }
      ;['xs', 'sm', 'md', 'lg', 'xl'].forEach(mediaType => {
        props[mediaType] && classes.push(`z-col-${mediaType}-span-${props[mediaType]}`) // z-col-sx-span-5
      })
      return classes
    })

    // 获取从 <z-row></z-row> 中传递过来的 gutter
    const gutter = ref(0)
    gutter.value = inject('gutter')
    const colStyle = computed(() => {
      if (gutter.value) {
        return {
          paddingLeft: gutter.value / 2 + 'px',
          paddingRight: gutter.value / 2 + 'px'
        }
      } else {
        return {}
      }
    })

    return {
      colClass,
      gutter,
      colStyle
    }
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';

.z-col {
  // sass 语法，通过循环 1-96 创造出对应的宽度
  @for $i from 1 through 96 {
    &-span-#{$i} {
      width: calc($i / 96) * 100%;
    }

    &-offset-#{$i} {
      margin-left: calc($i / 96) * 100%;
    }
  }

  // 适配不同尺寸屏幕
  // sass 语法，调用函数
  @include res(xs) {
    @for $i from 1 through 96 {
      &-xs-span-#{$i} {
        width: calc($i / 96) * 100%;
      }

      &-xs-offset-#{$i} {
        margin-left: calc($i / 96) * 100%;
      }
    }
  }

  @include res(sm) {
    @for $i from 1 through 96 {
      &-sm-span-#{$i} {
        width: calc($i / 96) * 100%;
      }
    }
  }

  @include res(md) {
    @for $i from 1 through 96 {
      &-md-span-#{$i} {
        width: calc($i / 96) * 100%;
      }
    }
  }

  @include res(lg) {
    @for $i from 1 through 96 {
      &-lg-span-#{$i} {
        width: calc($i / 96) * 100%;
      }
    }
  }

  @include res(xl) {
    @for $i from 1 through 96 {
      &-xl-span-#{$i} {
        width: calc($i / 96) * 100%;
      }
    }
  }
}
</style>
