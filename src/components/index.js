// common
import Dropdown from "./common/dropdown/index.vue";
import DropdownItem from "./common/dropdown/dropdown-item.vue";
import DropdownDivider from "./common/dropdown/dropdown-divider.vue";
import Row from "./common/row-col/row.vue";
import Col from "./common/row-col/col.vue";
import ZMessage from "./common/message/message.js";

// ant
import Menu from "./ant/menu/index.vue";
import Table from "./ant/table/index.vue";

const components = [Dropdown, DropdownItem, DropdownDivider, Row, Col, Menu, Table, ZMessage];

const install = app => {
  components.forEach(component => {
    app.component(component.name, component);
  });
};

export default {
  install,
};

// 导出vnode渲染组件
export { ZMessage };
