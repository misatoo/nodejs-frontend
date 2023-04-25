<template>
  <div class="login">
    <main class="main">
      <span class="website-title">派谕项目管理平台</span>
      <div style="width: 340px">
        <a-form layout="vertical" :model="formState" @finish="handleFinish" @finishFailed="handleFinishFailed">
          <a-form-item>
            <a-input v-model:value="formState.username" placeholder="Username">
              <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input v-model:value="formState.password" type="password" placeholder="Password">
              <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button block type="primary" html-type="submit" :disabled="formState.username === '' || formState.password === ''">
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </main>
    <footer></footer>
  </div>
  <!-- <a-button type="primary" @click="onClick">Primary Button</a-button> -->
</template>

<script setup>
import { ref, onMounted, watch, toRaw, nextTick } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getRandomNum } from "@/utils/shared";
import { userLoginReq } from "@/request/api";

const router = useRouter();
const store = useStore();

const onClickLoginBtn = () => {
  router.push("login");
};

const formState = ref({
  username: "",
  password: "",
});

const handleFinish = () => {
  userLoginReq(formState.value, { message: true }).then(res => {
    store.commit("user/setToken", getRandomNum());
    store.commit("user/setUserInfo", res);
    router.push("home");
  });
};

const handleFinishFailed = errors => {
  console.log(errors);
};
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  height: 100%;
  .main {
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-weight: bold;
    letter-spacing: 0.15rem;
    word-spacing: 0.3rem;
    transform: translateY(-5%);
    .website-title {
      display: block;
      margin-bottom: 80px;
      font-size: 40px;
    }
  }
}
</style>
