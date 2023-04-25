<template>
  <div class="home">
    <nav class="nav-bar">
      <div class="nav-bar-left"></div>
      <div class="nav-bar-right">
        <z-dropdown class="personal-settings">
          <div class="clickable-area">
            <!-- <img class="profile-img" :src="avatarUrl" alt="" @error="onImageError" /> -->
            <div class="text">{{ $store.getters.userInfo.username }}</div>
            <!-- <el-icon class="icon" :size="13" color="#f0f0f0"><CaretBottom /></el-icon> -->
          </div>
          <template #dropdown>
            <z-dropdown-item @click="onOpenPersonalCenter">个人中心</z-dropdown-item>
            <z-dropdown-divider></z-dropdown-divider>
            <z-dropdown-item divided @click="handleLogout">退出登录</z-dropdown-item>
          </template>
        </z-dropdown>
      </div>
    </nav>
    <main class="main">
      <aside class="side-bar">
        <z-menu></z-menu>
      </aside>
      <section class="section">
        <router-view class="section-router-view"></router-view>
      </section>
    </main>
    <footer></footer>
  </div>
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
    router.back();
  });
};

const handleFinishFailed = errors => {
  console.log(errors);
};

onMounted(() => {
  console.log(store.getters.userInfo);
});
</script>

<style lang="scss" scoped>
$nav-bar-height: 50px;
$side-bar-width: 220px;
.home {
  position: relative;
  height: 100vh;
  // display: flex;
  // flex-direction: column;
  .nav-bar {
    display: flex;
    align-items: center;
    width: 100vw;
    height: $nav-bar-height;
    border-bottom: 1px solid #e3e3e3;
    background-color: #fff;
    .nav-bar-left {
      flex: 1;
    }
    .nav-bar-right {
      .login-button {
        margin-right: 20px;
        cursor: pointer;
      }
      .user-info {
        margin-right: 20px;
      }
    }
  }
  .main {
    display: flex;
    width: 100vw;
    height: calc(100vh - $nav-bar-height);
    .side-bar {
      overflow-y: auto;
      width: $side-bar-width;
      height: 100%;
    }
    .section {
      padding: 12px;
      width: calc(100vw - $side-bar-width);
      height: 100%;
    }
  }
}
</style>
