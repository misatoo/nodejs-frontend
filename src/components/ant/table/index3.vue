<template>
  <a-table bordered :data-source="dataSource" :columns="columns">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        <div class="editable-cell">
          <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
            <a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.key)" />
            <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || " " }}
            <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
          </div>
        </div>
      </template>
    </template>
  </a-table>
</template>
<script setup>
import { computed, defineComponent, reactive, ref } from "vue";
import { CheckOutlined, EditOutlined } from "@ant-design/icons-vue";
import { cloneDeep } from "lodash-es";

defineOptions({ name: "z-table" });

const columns = [
  {
    title: "name",
    dataIndex: "name",
    width: "30%",
  },
];
const dataSource = ref([
  {
    key: "0",
    name: "Edward King 0",
  },
  {
    key: "1",
    name: "Edward King 1",
  },
]);

const editableData = reactive({});

const edit = key => {
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};

const save = key => {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
  delete editableData[key];
};
</script>

<style lang="scss" scoped>
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
