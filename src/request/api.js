import { http } from "./http.js";

// 用户、登录、注册
export const userLoginReq = (pa, opts) => http("POST", "/api/user/login", pa, opts); // 获取图片验证码
export const blogListReq = (pa, opts) => http("GET", "/api/blog/list", pa, opts);
export const sendSmsNvcReq = (pa, opts) => http("POST", "/api/sysUser/sendSmsNvc", pa, opts); // 发送短信验证码
export const forgetPwdReq = (pa, opts) => http("POST", "/api/sysUser/forgetPwd", pa, opts); // 登录页忘记密码
