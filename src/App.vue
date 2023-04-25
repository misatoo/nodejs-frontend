<template>
  <router-view></router-view>
</template>

<script setup>
import { ref, onMounted, watch, toRaw, nextTick } from "vue";
import { useRoute } from "vue-router";

const emits = defineEmits([]);
</script>

<style lang="scss">
@import "@/styles/variables.scss";
</style>
