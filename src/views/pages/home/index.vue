<template>
  <div class="container">
    <z-table></z-table>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, toRaw, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

defineOptions({ name: "z-budget-projects-select" });

const store = useStore();
const route = useRoute();

const emits = defineEmits([]);
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
