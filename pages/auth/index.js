// pages/auth/index.js
// 引入封装的js 请求模块
import { request } from '../../request/index.js'
// 使用 es7 中的 async 和 await 方法
import regeneratorRuntime from '../../libs/runtime/runtime'
import { login, showToast } from "../../utils/aysncWx.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    async handleGetUserInfo(e) {
        // console.log(e);
        // 1 获取用书信息
        // 2 获取小程序登陆成功后的code
        // 3 发送请求， 获取用户的tOken
        try {
            const { encrytedData, rawData, iv, signature } = e.detail;
            const { code } = await login();
            const loginParams = { encrytedData, rawData, iv, signature };
            // console.log(code)
            const res = await request({ url: "/users/wxlogin", data: loginParams, method: "post" });
            console.log(res)
            wx.setStorageSync("token", token);
            wx.navigateBack({
                delta: 1
            });
        } catch (error) {
            console.log(error)
        }
    }
})