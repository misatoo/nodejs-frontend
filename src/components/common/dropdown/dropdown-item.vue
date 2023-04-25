<template>
  <div class="z-dropdown-item">
    <slot></slot>
  </div>
</template>

<script setup>
defineOptions({ name: "z-dropdown-item" });
</script>

<style lang="scss" scoped>
.z-dropdown-item {
  display: flex;
  justify-content: center;
  padding: 5px 16px;
  // color: var(--el-text-color-regular);
}
.z-dropdown-item:hover {
  color: $primary-color;
  // background-color: var(--color-menu-hover-bg);
}
</style>
