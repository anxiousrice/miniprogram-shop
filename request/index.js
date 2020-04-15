//同时发送异步代码的次数
let ajaxTimes = 0;
export const request = (params) => {
    //使用支付时，自动添加头
    let header = {...params.header };
    if (params.url.includes("/my/")) {
        header["Authorization"] = wx.wx.getStorageSync("token");
    }
    ajaxTimes++ //发送一次请求就加一次
    // 在请求 数据回来之前 显示一个加载中
    wx.showLoading({
        title: '加载中',
    })

    //定义公共url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            header: header,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxTimes-- //请求完成一次 ，就减一次
                if (ajaxTimes === 0) {
                    //当所有的请求都完成时，就关闭 加载中 弹框
                    wx.hideLoading()
                }
            }
        });
    })
}