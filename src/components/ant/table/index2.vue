<template>
  <!-- <textarea name="" id="" cols="30" rows="10" v-model="aaaa" style="white-space: pre-wrap"></textarea>
  <div style="white-space: pre-wrap">{{ aaaa }}</div> -->
  <a-table
    :columns="columns"
    :data-source="data"
    size="small"
    bordered
    :customCell="onCellClick"
    @resizeColumn="handleResizeColumn"
  >
    <!-- record:行数据 -->
    <template #bodyCell="{ column, text, record }">
      <!-- 如果是双击编辑文字的列 -->
      <template v-if="column.dataIndex === 'content'">
        <div class="textarea-wrapper" v-if="editableData[`${record.id}_${column.dataIndex}`]">
          <textarea
            class="textarea"
            ref="textareaRef"
            v-if="editableData[`${record.id}_${column.dataIndex}`]"
            v-model="editableData[`${record.id}_${column.dataIndex}`].content"
            :rows="1"
            @input="onTextareaInput"
          />
        </div>
        <!-- 双击单元格后，将数据赋值给 editableData，editableData 有值了之后，会显示 textarea，此 div 隐藏 -->
        <div class="text-wrapper" v-else @dblclick="edit(`${record.id}_${column.dataIndex}`)">
          <div class="text" ref="textRef">{{ text || " " }}</div>
        </div>
      </template>

      <template v-if="column.dataIndex === 'module'">
        <div class="textarea-wrapper" v-if="editableData[`${record.id}_${column.dataIndex}`]">
          <textarea
            class="textarea"
            ref="textareaRef"
            v-if="editableData[`${record.id}_${column.dataIndex}`]"
            v-model="editableData[`${record.id}_${column.dataIndex}`].module"
            :rows="1"
            @input="onTextareaInput"
          />
        </div>
        <!-- 双击单元格后，将数据赋值给 editableData，editableData 有值了之后，会显示 textarea，此 div 隐藏 -->
        <div class="text-wrapper" v-else @dblclick="edit(`${record.id}_${column.dataIndex}`)">
          <div class="text">{{ text || " " }}</div>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { CheckOutlined, EditOutlined } from "@ant-design/icons-vue";
import { ref, reactive, nextTick, onMounted, onUnmounted } from "vue";
import { cloneDeep } from "lodash";

defineOptions({ name: "z-table" });

const textareaRef = ref(null);
const clickedCellHeight = ref(0);
const textRef = ref(null);

// 表格数据
const data = ref([
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
    content: "Sidney No. 1 Lake Park",
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
  onClick: e => {
    // 单击时记录点击的单元格的高度（双击无法记录，单元格会消失，被替换为textarea）
    // 在 text-wrapper 中包裹一个 text，text-wrapper 内部垂直居中，让 textarea 的高度等于 text 的高度，
    // 这样才能让 textarea 看起来居中。如果让 textarea 高度占满 text-wrapper，是无法垂直居中的，textarea 内部不支持垂直居中
    if (e.target.clientHeight) {
      const textEl = e.target.children[0];
      if (textEl) clickedCellHeight.value = textEl.clientHeight;
    }
  },
  onDblclick: e => {
    edit(`${record.id}_${column.dataIndex}`)
    // 双击时，将记录的单元格高度赋值给 textarea
    // console.log(record, rowIndex, column, e);
    if (textareaRef.value) {
      textareaRef.value.style.height = clickedCellHeight.value + "px";
      textareaRef.value.focus();
    }
  },
});

// 表格列信息
const columns = ref([
  {
    title: "序号",
    key: "key",
    dataIndex: "key",
    resizable: true,
    width: 50,

    customCell: onCellClick,
  },
  {
    title: "平台",
    key: "platform",
    dataIndex: "platform",
    resizable: true,
    width: 80,
    customCell: onCellClick,
  },
  {
    title: "菜单 / 模块",
    key: "module",
    dataIndex: "module",
    resizable: true,
    width: 100,
    customCell: onCellClick,
  },
  {
    title: "内容",
    key: "content",
    dataIndex: "content",
    resizable: true,
    width: 400,
    customCell: onCellClick,
  },
  {
    title: "处理人",
    key: "handlerName",
    dataIndex: "handlerName",
    resizable: true,
    width: 80,
    customCell: onCellClick,
  },
  {
    title: "状态",
    key: "status",
    dataIndex: "status",
    resizable: true,
    width: 80,
    customCell: onCellClick,
  },
  {
    title: "优先级",
    key: "priority",
    dataIndex: "priority",
    resizable: true,
    width: 70,
    customCell: onCellClick,
  },
  {
    title: "提出人",
    key: "proposer",
    dataIndex: "proposer",
    resizable: true,
    width: 80,
    customCell: onCellClick,
  },
  {
    title: "备注",
    key: "remark",
    dataIndex: "remark",
    resizable: true,
    width: 150,
    customCell: onCellClick,
  },
  {
    title: "提出日期",
    key: "createTime",
    dataIndex: "createTime",
    resizable: true,
    width: 150,
  },
]);

const editableData = reactive({});
const editableKey = ref("");

/**
 * 取出双击的单元格的内容，存到 editableData[editableKey]，同时记录 editableKey
 * @param {*} editKey
 */
const edit = editKey => {
  editableData[editKey] = cloneDeep(data.value.filter(item => editKey.split("_")[0] === item.id)[0]);
  editableKey.value = editKey;
};

/**
 * 根据鼠标点击位置判断是否执行保存操作
 * 如果点击在正在编辑的 textarea 外部，则触发保存操作
 * @param {*} e 鼠标的 click 事件
 */
const handleSaveOnMouseDown = e => {
  const triggerSave = textareaRef.value && !textareaRef.value.contains(e.target);
  if (triggerSave) {
    save(editableKey.value);
  }
};

/**
 * 将编辑后的单元格内容与所有表格数据合并，合并后删除 editableData[key] 属性
 * @param {*} key
 */
const save = editKey => {
  Object.assign(data.value.filter(item => editKey.split("_")[0] === item.id)[0], editableData[editKey]);
  delete editableData[editKey];
};

/**
 * 当 textarea 进行输入操作时，让 textarea 根据文字行数动态调整自身高度
 * 只能增加高度，不能减少高度，因为 scrollHeight 只能增加不会减少
 */
const onTextareaInput = e => {
  const scrollHeight = textareaRef.value.scrollHeight;
  textareaRef.value.style.height = scrollHeight + "px";
  // let text = e.target.value;
  // console.log(text.endsWith("\n"));
  // if (text.endsWith("\n")) {
  //   text = text.split("\n")[0];
  // }
  // console.log(text);
  // // text = text.replace("\r", "");
  // // text = text.replace("\r\n", "");
  // // text = text.replace("\n\r", "");
  // textareaRef.value.value = text;
};

/**
 * 当调整列宽
 * @param {*} w
 * @param {*} col
 */
const handleResizeColumn = (w, col) => {
  col.width = w;
};

onMounted(() => {
  /**
   * 监听鼠标 mousedown 事件。注意：不能监听 click 事件！！！
   * 如果监听 click 事件，有两个弊端：
   * ① 当点击在其他阻止冒泡的元素上时， click 监听不会触发
   * ② 当正在编辑 textarea，鼠标进行拖拽选中文字操作时，如果鼠标抬起的位置是在 textarea 外部，则会直接触发 click 监听进行保存操作
   */
  window.addEventListener("mousedown", handleSaveOnMouseDown);
});

onUnmounted(() => {
  window.removeEventListener("mousedown", handleSaveOnMouseDown);
});
</script>

<style lang="scss" scoped>
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

.textarea-wrapper {
  line-height: 0; // textarea 默认下方会有几个像素空隙，通过设置外层 div 的 line-height 为 0 来去除
}

.textarea {
  width: 100%;
  height: 100%;
  background-color: #fff; // 背景色改为白色
  border: none; // 去掉边框
  box-shadow: none; // 去掉阴影
  padding: $cell-padding;
  line-height: $line-height;
  resize: none; // 禁止调整大小
  font-family: none; // 禁用字体，否则 textarea 和退出编辑后的文本数字的字间距不同
  white-space: pre-wrap !important; // 保留文本的空格和换行！！必须设置！！
}

.textarea:focus {
  outline: none; // 去掉聚焦的边框线
  background-color: #fff; // 背景色改为白色
}

.text-wrapper {
  display: flex;
  align-items: center;
  // height: auto !important; // 兼容 Firefox 浏览器，如果用 height:100% 此元素无法被 .text 撑开高度
  // height: 100% !important; // 高度占满 td，否则点击到边上空白处会点击不到
  font-family: none; // 禁用字体，否则 textarea 和退出编辑后的文本数字的字间距不同
  background-color: pink;

  .text {
    padding: $cell-padding; // 将表格文本的 padding 设置成和 textarea 的 padding 一致
    pointer-events: none; // 去掉鼠标事件，使标签不接受鼠标事件，让点击直接穿透到下一层中
    white-space: pre-wrap !important; // 保留文本的空格和换行！！必须设置！！
    width: 100%;
    height: fit-content;
    // 让英文和数字换行
    white-space: normal; // 规定段落中的文本不进行换行
    word-break: break-all; // 允许单词中换行，在容器的最右边进行断开不会浪费空间
    word-wrap: break-word; // 防止长单词溢出，单词内部断句
    word-break: break-word; // 如果不想单词内断行可以进行单词间的断行
  }
}

:deep(table tbody tr:hover > td) {
  background: transparent !important;
}

::-webkit-scrollbar {
  width: 0; /* 竖向滚动条宽度 */
  height: 0; /* 横向滚动条高度 */
  transition: 0.3s all;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px; /* 滚动条样式 */
  background-color: rgba(144, 146, 152, 0.3); /* 滚动条颜色 */
  transition: 0.3s all;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144, 146, 152, 0.5); /* 滚动条悬浮颜色 */
  width: 0; /* 竖向滚动条宽度 */
  height: 0; /* 横向滚动条高度 */
  transition: 0.3s all;
  opacity: 0.5;
}
::-webkit-scrollbar-track-piece {
  background: transparent; /* 滚动条背景颜色 */
}

// 兼容 Firefox 浏览器
* {
  scrollbar-color: transparent #ffffff00; /* 滑块颜色  滚动条背景颜色 未生效 */
  scrollbar-width: thin; /* 滚动条宽度有三种：thin、auto、none */
}
::-webkit-scrollbar-corner {
  background-color: transparent;
}
</style>
