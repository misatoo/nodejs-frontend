<template>
  <div class="z-table">
    <table class="z-table-header">
      <thead class="z-table-thead">
        <tr class="z-table-thead-tr">
          <th class="z-table-thead-th" v-for="(column, index) in columns" :key="index" :style="columnStyle(column)">
            <div>{{ column.name }}</div>
          </th>
        </tr>
      </thead>
    </table>
    <table class="z-table-body">
      <tbody class="z-table-tbody">
        <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
          <td v-for="(column, colIndex) in columns" :key="colIndex" :style="columnStyle(column)">
            <div>{{ row[column.key] }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- <a-table
    :columns="columns"
    :data-source="tableData"
    size="small"
    bordered
    :scroll="{ x: 2000 }"
    :customCell="onCellClick"
    @resizeColumn="handleResizeColumn"
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.name === 'content'">
        <div
          class="editable-content"
          ref="ecRef"
          v-if="editableData[`${record.id}_${column.name}`]"
          :contenteditable="true"
          @keyup="onKeyup(`${record.id}_${column.name}`)"
          @blur="onSave(`${record.id}_${column.name}`)"
        ></div>
        <div class="text-wrapper" v-else @dblclick="edit(`${record.id}_${column.name}`)">
          <div class="text" ref="textRef" v-html="text"></div>
        </div>
        <div class="editable-content-border"></div>
      </template>
    </template>
  </a-table> -->
</template>

<script setup>
import { ref, reactive, nextTick, onMounted, onUnmounted } from "vue";
import { cloneDeep } from "lodash";
defineOptions({ name: "z-table" });

const ecRef = ref(null);
const textRef = ref(null);
const editableColumn = ref(["module", "content", "remark"]);

const columnStyle = column => {
  let style = {};
  if (column.width) {
    style.width = column.width + "px";
    style.minWidth = column.width + "px";
  }
  return style;
};

// 表格数据
const tableData = ref([
  {
    id: "1",
    platform: "api",
    module: "工单管理",
    content: "/api/inspectScheme/detail inspectPeriodTypeStr 的值是拼音或英文，应该是汉字",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["nice", "developer"],
  },
  {
    id: "2",
    platform: "web",
    module: "巡检任务",
    content: "London No. 1 Lake Park",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["loser"],
  },
  {
    id: "3",
    platform: "小程序",
    module: "工单管理",
    content: "",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["cool", "teacher"],
  },
  {
    id: "1",
    platform: "api",
    module: "工单管理",
    content: "/api/inspectScheme/detail inspectPeriodTypeStr 的值是拼音或英文，应该是汉字",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["nice", "developer"],
  },
  {
    id: "2",
    platform: "web",
    module: "巡检任务",
    content: "London No. 1 Lake Park",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["loser"],
  },
  {
    id: "3",
    platform: "小程序",
    module: "工单管理",
    content: "",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["cool", "teacher"],
  },
  {
    id: "1",
    platform: "api",
    module: "工单管理",
    content: "/api/inspectScheme/detail inspectPeriodTypeStr 的值是拼音或英文，应该是汉字",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["nice", "developer"],
  },
  {
    id: "2",
    platform: "web",
    module: "巡检任务",
    content: "London No. 1 Lake Park",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["loser"],
  },
  {
    id: "3",
    platform: "小程序",
    module: "工单管理",
    content: "",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["cool", "teacher"],
  },
  {
    id: "1",
    platform: "api",
    module: "工单管理",
    content: "/api/inspectScheme/detail inspectPeriodTypeStr 的值是拼音或英文，应该是汉字",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["nice", "developer"],
  },
  {
    id: "2",
    platform: "web",
    module: "巡检任务",
    content: "London No. 1 Lake Park",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["loser"],
  },
  {
    id: "3",
    platform: "小程序",
    module: "工单管理",
    content: "",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["cool", "teacher"],
  },
  {
    id: "1",
    platform: "api",
    module: "工单管理",
    content: "/api/inspectScheme/detail inspectPeriodTypeStr 的值是拼音或英文，应该是汉字",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["nice", "developer"],
  },
  {
    id: "2",
    platform: "web",
    module: "巡检任务",
    content: "London No. 1 Lake Park",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["loser"],
  },
  {
    id: "3",
    platform: "小程序",
    module: "工单管理",
    content: "",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["cool", "teacher"],
  },
  {
    id: "1",
    platform: "api",
    module: "工单管理",
    content: "/api/inspectScheme/detail inspectPeriodTypeStr 的值是拼音或英文，应该是汉字",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["nice", "developer"],
  },
  {
    id: "2",
    platform: "web",
    module: "巡检任务",
    content: "London No. 1 Lake Park",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["loser"],
  },
  {
    id: "3",
    platform: "小程序",
    module: "工单管理",
    content: "",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["cool", "teacher"],
  },
  {
    id: "1",
    platform: "api",
    module: "工单管理",
    content: "/api/inspectScheme/detail inspectPeriodTypeStr 的值是拼音或英文，应该是汉字",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["nice", "developer"],
  },
  {
    id: "2",
    platform: "web",
    module: "巡检任务",
    content: "London No. 1 Lake Park",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["loser"],
  },
  {
    id: "3",
    platform: "小程序",
    module: "工单管理",
    content: "",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["cool", "teacher"],
  },
  {
    id: "1",
    platform: "api",
    module: "工单管理",
    content: "/api/inspectScheme/detail inspectPeriodTypeStr 的值是拼音或英文，应该是汉字",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["nice", "developer"],
  },
  {
    id: "2",
    platform: "web",
    module: "巡检任务",
    content: "London No. 1 Lake Park",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["loser"],
  },
  {
    id: "3",
    platform: "小程序",
    module: "工单管理",
    content: "",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["cool", "teacher"],
  },
  {
    id: "1",
    platform: "api",
    module: "工单管理",
    content: "/api/inspectScheme/detail inspectPeriodTypeStr 的值是拼音或英文，应该是汉字",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["nice", "developer"],
  },
  {
    id: "2",
    platform: "web",
    module: "巡检任务",
    content: "London No. 1 Lake Park",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["loser"],
  },
  {
    id: "3",
    platform: "小程序",
    module: "工单管理",
    content: "",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["cool", "teacher"],
  },
  {
    id: "1",
    platform: "api",
    module: "工单管理",
    content: "/api/inspectScheme/detail inspectPeriodTypeStr 的值是拼音或英文，应该是汉字",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["nice", "developer"],
  },
  {
    id: "2",
    platform: "web",
    module: "巡检任务",
    content: "London No. 1 Lake Park",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["loser"],
  },
  {
    id: "3",
    platform: "小程序",
    module: "工单管理",
    content: "",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["cool", "teacher"],
  },
  {
    id: "1",
    platform: "api",
    module: "工单管理",
    content: "/api/inspectScheme/detail inspectPeriodTypeStr 的值是拼音或英文，应该是汉字",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["nice", "developer"],
  },
  {
    id: "2",
    platform: "web",
    module: "巡检任务",
    content: "London No. 1 Lake Park",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["loser"],
  },
  {
    id: "3",
    platform: "小程序",
    module: "工单管理",
    content: "",
    handlerName: "刘基新",
    status: "未开始",
    priority: "一般",
    proposer: "李沅圃",
    createTime: "2023-04-21 14:32",
    tags: ["cool", "teacher"],
  },
]);

// 鼠标点击单元格的回调方法
const onCellClick = (record, rowIndex, column) => ({
  onClick: e => {},
  onDblclick: e => {
    // 双击时，将光标位置设置在文字最后
    if (ecRef.value) {
      // https://blog.csdn.net/qq_16992475/article/details/126811145
      // https://blog.csdn.net/weixin_38099055/article/details/108483748
      var range = document.createRange();
      range.selectNodeContents(ecRef.value);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  },
});

// 表格列信息
const columns = ref([
  {
    name: "序号",
    key: "id",
    resizable: true,
    width: 200,
    customCell: onCellClick,
  },
  {
    name: "平台",
    key: "platform",
    resizable: true,
    width: 80,
    customCell: onCellClick,
  },
  {
    name: "模块",
    key: "module",
    resizable: true,
    width: 100,
    customCell: onCellClick,
  },
  {
    name: "内容",
    key: "content",
    resizable: true,
    width: 400,
    minWidth: 400,
    customCell: onCellClick,
  },
  {
    name: "处理人",
    key: "handlerkey",
    resizable: true,
    width: 80,
    customCell: onCellClick,
  },
  {
    name: "状态",
    key: "status",
    resizable: true,
    width: 80,
    customCell: onCellClick,
  },
  {
    name: "优先级",
    key: "priority",
    resizable: true,
    width: 70,
    customCell: onCellClick,
  },
  {
    name: "提出人",
    key: "proposer",
    resizable: true,
    width: 80,
    customCell: onCellClick,
  },
  {
    name: "备注",
    key: "remark",
    resizable: true,
    width: 150,
    customCell: onCellClick,
  },
  {
    name: "提出日期",
    key: "createTime",
    resizable: true,
    width: 150,
  },
]);

const editableData = reactive({});

/**
 * 取出双击的单元格的内容，存到 editableData[editableKey]
 * @param {*} editableKey
 */
const edit = editableKey => {
  const columnName = editableKey.split("_")[1];
  editableData[editableKey] = cloneDeep(tableData.value.filter(item => editableKey.split("_")[0] === item.id)[0]);
  nextTick(() => {
    ecRef.value.innerHTML = editableData[editableKey][columnName];
  });
};

const onKeyup = editableKey => {
  if (ecRef.value) {
    editableData[editableKey] = ecRef.value.innerHTML;
    console.log(ecRef.value.innerHTML);
  }
};

/**
 * 将编辑后的单元格内容与所有表格数据合并，合并后删除 editableData[key] 属性
 * @param {*} key
 */
const onSave = editableKey => {
  onKeyup(editableKey);
  const editRowId = editableKey.split("_")[0];
  const columnName = editableKey.split("_")[1];
  tableData.value.forEach(rowData => {
    if (rowData.id === editRowId) {
      rowData[columnName] = editableData[editableKey];
    }
  });
  delete editableData[editableKey];
};

/**
 * 当调整列宽
 * @param {*} w
 * @param {*} col
 */
const handleResizeColumn = (w, col) => {
  col.width = w;
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
$table-height: 100%;
$table-width: 100%;
$header-height: 40px;
.z-table {
  position: relative;
  overflow-x: scroll;
  width: $table-width;
  height: $table-height;
  border-collapse: collapse;
  border: 1px solid #e9e9e9;
  border-radius: 3px;

  .z-table-header {
    // position: sticky;
    // top: 0;
    width: $table-width; // 必须设置，否则 theader 与 tbody 元素宽度对不齐
    .z-table-thead {
      display: table-header-group;
      .z-table-thead-tr {
        .z-table-thead-th {
          padding: 0 5px;
          height: $header-height;
          text-align: left;
          white-space: normal; // 英文数字换行。规定段落中的文本不进行换行
          word-break: break-all; // 英文数字换行。允许单词中换行，在容器的最右边进行断开不会浪费空间
          word-wrap: break-word; // 英文数字换行。防止长单词溢出，单词内部断句
          word-break: break-word; // 英文数字换行。如果不想单词内断行可以进行单词间的断行
          background-color: #f8f8f8;
          border-right: 1px solid #e9e9e9;
          border-bottom: 1px solid #e9e9e9;
          &:last-child {
            border-right: none;
          }
        }
      }
    }
    // z-index: 1;
  }

  .z-table-body {
    width: $table-width;
    height: calc($table-height - $header-height);
    background-color: fff;
    overflow: auto;
    .z-table-tbody {
      tr {
        border-bottom: 1px solid #e9e9e9;
        &:last-child {
          border: none;
        }
        td {
          padding: 5px;
          border-right: 1px solid #e9e9e9;
          &:last-child {
            border: none;
          }
        }
      }
    }
  }
}

// 用来统一 ant 表格和 textarea 的行高，否则 textarea 的行高和表格的不一致会导致文字高度变化
$line-height: 20px;
$cell-padding: 5px;

// 自定义设置标题行样式
:deep(tr .ant-table-cell) {
  padding: $cell-padding !important;
  line-height: $line-height;
}

// 自定义设置内容行样式
:deep(tbody .ant-table-cell) {
  padding: 0 !important;
  height: 1px; // 重要！！必须给 td 设置一个高度，否则内部元素高度无法占满！！ant-table-cell 是个 td
  line-height: $line-height;
}

// 注意不能设置伪类，否则回车会空两行，不知道为啥
.editable-content {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff; // 背景色改为白色
  vertical-align: middle;
  padding: $cell-padding;
  line-height: $line-height;
  font-family: none; // 禁用字体，否则 textarea 和退出编辑后的文本数字的字间距不同
  &:focus {
    outline: none; // 去掉聚焦的边框线
    outline: 2px solid #58b1ff;
    z-index: 1;
    // background-color: #dbfbf2; // 背景色改为白色
  }
}

.text-wrapper {
  display: flex;
  align-items: center;
  height: auto !important; // 兼容 Firefox 浏览器，如果用 height:100% 此元素无法被 .text 撑开高度
  height: 100% !important; // 高度占满 td，否则点击到边上空白处会点击不到
  font-family: none; // 禁用字体，否则 textarea 和退出编辑后的文本数字的字间距不同
  // background-color: pink;

  .text {
    padding: $cell-padding; // 将表格文本的 padding 设置成和 textarea 的 padding 一致
    pointer-events: none; // 去掉鼠标事件，使标签不接受鼠标事件，让点击直接穿透到下一层中
    white-space: pre-wrap !important; // 保留文本的空格和换行！！必须设置！！
    width: 100%;
    height: 100%;

    // 让英文和数字换行
    white-space: normal; // 规定段落中的文本不进行换行
    word-break: break-all; // 允许单词中换行，在容器的最右边进行断开不会浪费空间
    word-wrap: break-word; // 防止长单词溢出，单词内部断句
    word-break: break-word; // 如果不想单词内断行可以进行单词间的断行
    // background-color: yellowgreen;
  }
}

// :deep(table tbody tr:hover > td) {
//   background: transparent !important;
// }

// ::-webkit-scrollbar {
//   width: 0; /* 竖向滚动条宽度 */
//   height: 0; /* 横向滚动条高度 */
//   transition: 0.3s all;
// }
// ::-webkit-scrollbar-thumb {
//   border-radius: 10px; /* 滚动条样式 */
//   background-color: rgba(144, 146, 152, 0.3); /* 滚动条颜色 */
//   transition: 0.3s all;
// }
// ::-webkit-scrollbar-thumb:hover {
//   background-color: rgba(144, 146, 152, 0.5); /* 滚动条悬浮颜色 */
//   width: 0; /* 竖向滚动条宽度 */
//   height: 0; /* 横向滚动条高度 */
//   transition: 0.3s all;
//   opacity: 0.5;
// }
// ::-webkit-scrollbar-track-piece {
//   background: transparent; /* 滚动条背景颜色 */
// }

// // 兼容 Firefox 浏览器
// * {
//   scrollbar-color: transparent #ffffff00; /* 滑块颜色  滚动条背景颜色 未生效 */
//   scrollbar-width: thin; /* 滚动条宽度有三种：thin、auto、none */
// }
// ::-webkit-scrollbar-corner {
//   background-color: transparent;
// }
</style>
