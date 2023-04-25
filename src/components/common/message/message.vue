<template>
  <transition name="z-message" @before-leave="beforeClose" @after-leave="afterClose">
    <div
      class="z-message"
      :class="messageClass"
      :style="messageStyle"
      v-show="visiable"
      ref="messageRef"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
    >
      <div class="z-message__prefix-icon">
        <img v-if="icon.icon === 'success'" src="./icons/success.png" />
        <img v-if="icon.icon === 'warning'" src="./icons/warning.png" />
        <img v-if="icon.icon === 'delete'" src="./icons/error.png" />
        <img v-if="icon.icon === 'prompt'" src="./icons/info.png" />
      </div>
      <div class="z-message__content">{{ message }}</div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, onUnmounted, watch, computed, nextTick } from "vue";
import props from "./props.js";

export default defineComponent({
  name: "z-message",
  props,
  setup(props, context) {
    const visiable = ref(false);

    const messageClass = computed(() => `z-message--${props.type}`);
    const messageStyle = computed(() => ({ top: props._totalOffset + "px" }));
    const icon = computed(() => {
      if (props.type === "success") {
        return { icon: "success", color: "#67C23A" };
      } else if (props.type === "warning") {
        return { icon: "warning", color: "#E6A23C" };
      } else if (props.type === "error") {
        return { icon: "delete", color: "#f26060" };
      } else if (props.type === "info") {
        return { icon: "prompt", color: "#969697" };
      } else {
        return {};
      }
    });

    let timer = ref(null);

    const startTimer = () => {
      if (props.duration === 0) return;
      timer.value = setTimeout(() => {
        visiable.value = false;
      }, props.duration);
    };

    const onMouseenter = () => {
      clearTimeout(timer.value);
    };

    const onMouseleave = () => {
      startTimer();
    };

    const beforeClose = () => {
      props.onClose && props.onClose();
      context.emit("beforeClose", {
        id: props.id,
        height: height.value,
      });
    };

    // 关闭之后发射 afterClose，给
    const afterClose = () => {
      context.emit("afterClose");
    };

    const onClickCloseIcon = () => {
      visiable.value = false;
    };

    const messageRef = ref(null);
    const height = ref(0);

    onMounted(() => {
      visiable.value = true;
      startTimer();
      nextTick(() => {
        height.value = messageRef.value.offsetHeight;
      });
    });

    onUnmounted(() => {
      clearTimeout(timer.value);
    });

    return {
      messageClass,
      visiable,
      messageStyle,
      beforeClose,
      afterClose,
      onMouseenter,
      onMouseleave,
      messageRef,
      height,
      icon,
      timer,
      onClickCloseIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
.z-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  padding: 12px 20px;
  width: fit-content;
  max-width: 80%;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
  color: #333;
  font-size: 14px;
  z-index: 1000000001;
  transition: top 0.27s ease-out;

  .z-message__prefix-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 15px;
    height: 15px;
    margin-right: 8px;
    margin-left: -2px;
    img {
      width: 15px;
      height: 15px;
    }
  }

  .z-message__suffix-icon {
    display: inline-flex;
    // vertical-align: middle;
    justify-content: center;
    align-items: center;
    width: 15px;
    height: 15px;
    margin-left: 5px;
    margin-right: -2px;
    color: #bbb;
    cursor: pointer;
    transition: 0.3s all;

    &:hover {
      color: #999;
      transition: 0.3s all;
    }
  }

  .z-message__content {
    display: inline;
    // white-space: normal;
    width: 100%;
    overflow-wrap: anywhere;
    // word-wrap: break-all;
    // word-break: break-all;
  }
}

// appendChild无法激活transition动画，通过给z-messag加上v-show，利用v-show触发
.z-message-enter-from {
  transform: translate(-50%, -100%);
  opacity: 0;
}

.z-message-leave-to {
  // 这里因为上面居中时定义了 translateX(-50%)，所以这里x也要加上这个才能保证垂直移动
  transform: translate(-50%, -100%);
  opacity: 0;
}

.z-message-enter-to,
.z-message-leave-from {
  transform: translate(-50%, 0);
  opacity: 1;
}

.z-message-enter-active {
  transition: opacity 0.1s ease-in, transform 0.15s ease;
}

.z-message-leave-active {
  transition: opacity 0.15s ease-in, transform 0.35s ease-out;
}
</style>
