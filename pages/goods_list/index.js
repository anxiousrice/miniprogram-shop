// pages/goods_list/index.js
//js网络请求模块
import { request } from '../../request/index.js'
//使用 es7 中的 async 和 await 方法
import regeneratorRuntime from '../../libs/runtime/runtime'
Page({

    /**
     * 页面的初始数据
     * 添加下拉刷新
     */
    data: {
        tabs: [{
                id: 0,
                value: "综合",
                isActive: true
            },
            {
                id: 1,
                value: "销量",
                isActive: false
            },
            {
                id: 2,
                value: "价格",
                isActive: false
            }
        ],
        //商品列表数据
        goodsList: []
    },
    queryParams: {
        query: '',
        cid: '',
        pagenum: 1, //当前的页码值
        pagesize: 10 //每页显示多少条数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.queryParams.cid = options.cid || '';
        this.queryParams.query = options.query || '';
        this.getGoodsList()
    },
    async getGoodsList() {
        const { data: res } = await request({ url: "/goods/search", data: this.queryParams });
        let total = res.message.total;
        //   总页数就等于
        this.totalPages = Math.ceil(total / this.queryParams.pagesize)
            //   console.log(res)
            //   console.log(this.totalPages)
        this.setData({
            //这里是为了防止加载下一页数据的时候 ， 下一页数据覆盖上一页数据 , 所以这里采取的是 用 解构 拼接下一页数组
            goodsList: [...this.data.goodsList, ...res.message.goods]
        });
    },

    //标题点击 子组建传递
    handletabsItemChange(e) {
        //   console.log(e);
        let index = e.detail.index;
        //修改原数组
        let { tabs } = this.data;
        tabs.forEach((item) => {
            return item.id === index ? item.isActive = true : item.isActive = false;
        });
        //赋值到data中
        this.setData({
            tabs
        });
    },
    //监听用户下拉触底事件 加载下一页数据
    onReachBottom() {
        if (this.queryParams.pagenum == this.totalPages || this.pagenum > this.totalPages) {
            wx.showToast({
                title: '没有下一页数据了',
            });

        } else {
            this.queryParams.pagenum++;
            this.getGoodsList();
        }
    },
    onPullDownRefresh() {

    }
})