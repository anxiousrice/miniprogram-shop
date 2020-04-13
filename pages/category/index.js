// pages/category/index.js
import { request } from '../../request/index.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftMenuList: [],
        rightConentList: [],
        currentIndex: 0
    },
    cates: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //1、获取本地存储中的数据 (小程序中也是存在 本地存储 技术)
        const cates = wx.getStorageSync("cates");
        //2、判断
        if (!cates) {
            //如果不存在 发送请求获取数据
            this.getCates();
        } else {
            //有旧的数据 定义过期时间  10s 改成 5分钟
            if (Date.now() - cates.time > 1000 * 10) {
                //如果数据过期了 则重新发送请求
                this.getCates();
            } else {
                //如果数据还没过期 可以使用数据

                //将本地存储中的cates中的data 数据 保存到变量cates中;
                this.cates = cates.data;
                //给左边的菜单栏添加数据
                let leftMenuList = this.cates.map((item) => {
                    return item.cat_name
                });
                //给右边的内容区添加数据
                let rightConentList = this.cates[0].children;
                this.setData({
                    leftMenuList,
                    rightConentList
                });

            }
        }
    },
    getCates() {
        request({ url: "/categories" }).then((res) => {
            this.cates = res.data.message;

            //把接口的数据存入到本地存储中
            wx.setStorageSync("cates", { time: Date.now(), data: this.cates })

            //给左边的菜单栏添加数据
            let leftMenuList = this.cates.map((item) => {
                return item.cat_name
            });
            //给右边的内容区添加数据
            let rightConentList = this.cates[0].children;
            this.setData({
                leftMenuList,
                rightConentList
            });
        });
    },
    //左侧菜单的点击事件
    handleItemTap(e) {
        // 1、获取被点击的标题身上的索引
        // 2、给data中的currentIndex赋值就可以了
        // 3、根据不同的索引来渲染右侧的商品内容
        // console.log(e)
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentIndex: index
        });
        this.setData({
            //右侧的内容跟随者 索引index 的变化而切换
            rightConentList: this.cates[index].children,
            //将内容区滚动条 距离顶部的距离 重新设置为0;
            scrollTop: 0
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})