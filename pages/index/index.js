import { request } from "../../request/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [],
        navList: [],
        floorList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // wx.request({
        //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //     data: '',
        //     header: {},
        //     method: 'GET',
        //     dataType: 'json',
        //     responseType: 'text',
        //     success: (result) => {
        //         this.setData({
        //             swiperList: result.data.message
        //         })
        //     },
        //     fail: function(res) {},
        //     complete: function(res) {},
        // })

        // request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata" }).then(result => {
        //     this.setData({
        //         swiperList: result.data.message
        //     })
        // })
        this.getSwiperList();
        this.getNavList();
        this.getFloorList();
    },


    getSwiperList() {
        request({ url: "/home/swiperdata" }).then(result => {
            this.setData({
                swiperList: result.data.message
            })
        })
    },
    getNavList() {
        request({ url: "/home/catitems" }).then(result => {
            this.setData({
                navList: result.data.message
            })
        })
    },
    getFloorList() {
        request({ url: "/home/floordata" }).then(result => {
            this.setData({
                floorList: result.data.message
            })
        })
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