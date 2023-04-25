<template>
  <div></div>
</template>

<script setup>
import { ref, onMounted, watch, toRaw, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const emits = defineEmits([]);
</script>

<style lang="scss" scoped></style>
