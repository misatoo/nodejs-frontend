<template>
  <div>404</div>
</template>

<script setup>
import { ref, onMounted, watch, toRaw, nextTick } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const emits = defineEmits([]);
</script>

<style lang="scss" scoped></style>
