<template>
  <div class="z-dropdown" ref="dropdownRef">
    <div class="z-dropdown-panel">
      <slot></slot>
    </div>
    <div class="z-dropdown-popup" v-if="visiable" @click.stop>
      <div class="z-dropdown-popup-inner" @click.stop="onItemSelect">
        <slot name="dropdown"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

defineOptions({ name: "z-dropdown" });

const visiable = ref(false);
const dropdownRef = ref(null);

// 点击按钮，显示弹窗
const onButtonClick = () => {
  visiable.value = !visiable.value;
};

// 如果点击了 dropdown 以外的区域，关闭弹窗
const close = e => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    visiable.value = false;
  }
};

// 监听点击事件关闭弹窗
watch(visiable, newValue => {
  if (newValue) {
    document.body.addEventListener("click", close);
  } else {
    document.body.removeEventListener("click", close);
  }
});

// 点击选项
const onItemSelect = () => {
  visiable.value = !visiable.value;
};

const onMouseMove = e => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    visiable.value = false;
  } else {
    visiable.value = true;
  }
};

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove);
});
</script>

<style lang="scss" scoped>
// 系统选择
.z-dropdown {
  position: relative;
  font-size: 14px;
  user-select: none;
  z-index: 9999;
  cursor: pointer;

  .z-dropdown-panel {
    display: flex;
    align-items: center;
    padding: 6px;
    border-radius: 5px;
    transition: 0.2s background-color;
    &:hover {
      // background-color: var(--el-color-primary-light-1);
    }
  }
  .z-dropdown-popup {
    overflow: auto;
    position: absolute;
    top: 30px;
    right: 5px;
    padding: 5px 0;
    width: max-content; // 使用absolute时让宽度可以超出父元素的宽度
    max-height: 400px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #e8e8e8;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    cursor: default;
    .z-dropdown-popup-inner {
      cursor: pointer;
    }
  }
}
</style>
