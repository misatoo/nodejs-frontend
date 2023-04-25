// 此文件对应老的睿服务结构的接口

import axios from "axios";
import store from "@/store";
import { isObject } from "lodash";
import { ZMessage } from "@/components";

// https://blog.csdn.net/lwc_1234/article/details/122841458
axios.defaults.baseURL = import.meta.env.VITE_BE_BASE_URL;
axios.defaults.timeout = 10000;
axios.defaults.retry = 3;
axios.defaults.retryDelay = 1000;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8' // 全局header

// 请求
export function http(method, url, params = {}, opts) {
  let options = {
    loading: false, // 是否显示loading
    message: false, // 是否显示成功提示弹窗
    errMsg: true, // 是否显示错误提示弹窗
    manual: false, // 是否手动处理
    pagination: false, // 是否有分页查询（返回格式不同）
    headers: {}, // 自定义header，会自动和全局header合并
  };

  if (isObject(opts)) {
    options = { ...options, ...opts };
  }

  return new Promise((resolve, reject) => {
    let axiosRequest;

    if (method === "GET") {
      axiosRequest = axios.get(url, {
        params,
        headers: options.headers,
      });
    } else if (method === "POST") {
      axiosRequest = axios.post(url, params, {
        headers: options.headers,
      });
    }

    axiosRequest
      .then(result => {
        if (!result) return console.log("接口请求出错");
        let res = result?.data;
        if (options.manual) {
          // 如果手动处理
          resolve(res);
        } else {
          // 如果自动处理
          if (res?.errno === 1) {
            // 如果结果成功
            if (options.message) {
              ZMessage({
                message: res.message,
                type: "success",
                uid: url + JSON.stringify(params) + res.message,
                debounce: true,
              });
            }
            if (options.pagination) {
              resolve({
                data: res.data,
                pageInfo: {
                  total: res.pageInfo.total,
                },
              });
            } else {
              resolve(res.data);
            }
          } else {
            // 结果不成功
            if (options.errMsg) {
              console.log(res);
              console.log(res?.message);
              if (res?.message) {
                console.log(res.message);
                ZMessage({
                  message: res?.message,
                  type: "error",
                  uid: url + JSON.stringify(params) + res?.message,
                  debounce: true,
                });
              }
            }
            reject(res);
          }
        }
      })
      .catch(err => {
        // 调用不成功时，错误信息统一在响应拦截器中打印。
        reject(err);
      });
  });
}

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // console.log('config', config)
    if (store.getters.token) {
      // 如果存在token但是已过期，登出并跳转到登录页
      // if (isTokenTimeout()) {
      //   store.dispatch('user/logout')
      //   removeItem(TOKEN_TIMEOUT_SPAN)
      //   return Promise.reject(new Error('token已失效'))
      // }
      config.headers.Authorization = "Bearer " + store.getters.token;
    }
    // console.log('请求拦截器 config', config)
    return config;
  },
  err => {
    console.log("请求拦截器 err", err);

    return Promise.error(err);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  res => {
    if (res && res.status === 200) {
      return res;
    } else {
      return Promise.reject(res);
    }
  },
  err => {
    // console.log('响应拦截器 err ', err)

    // 没有网络
    if (err?.code === "ERR_NETWORK") {
      ZMessage({ message: "网络无法连接，请检查网络情况", type: "error" });
    }

    // 响应超时
    if (err?.code === "ECONNABORTED") {
      ZMessage({ message: "请求超时，请重新再试", type: "error" });
      // 网上的例子不好用，config对象不是同一个，不行要存到本地
      // const { config } = err
      // console.log(config)
      // ZMessage({ message: '请求超时，正在重连', type: 'error' })
      // config.__retryCount = 0
      // if (config.retry && config.__retryCount < config.retry) {
      //   config.__retryCount += 1
      //   setTimeout(() => {
      //     return axios(config)
      //   }, config.retryDelay)
      // }
    }

    if (err && err.response && err.response.status) {
      switch (err.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          store.dispatch("user/logout");
          break;

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          ZMessage({
            message: "登录过期，请重新登录",
            type: "error",
            uid: err.response.data.msg,
            debounce: true,
          });
          // 清除token
          // localStorage.removeItem('token')
          // store.commit('loginSuccess', null)
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          // setTimeout(() => {
          //   router.replace({
          //     path: '/login',
          //     query: {
          //       redirect: router.currentRoute.fullPath
          //     }
          //   })
          // }, 1000)
          break;

        // 404请求不存在
        case 404:
          ZMessage({
            message: "请求地址不存在",
            type: "error",
            uid: err.response.data.msg,
            debounce: true,
          });
          break;

        // 其他错误，直接抛出错误提示
        default:
          ZMessage({
            message: err.response.data.msg,
            type: "error",
            uid: err.response.data.msg,
            debounce: true,
          });
      }
      return Promise.reject(err.response);
    }
  }
);
