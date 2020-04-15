/*
 */
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../libs/runtime/runtime'
import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/aysncWx.js'
Page({
        /**
         * 页面的初始数据
         */
        data: {
            //缓存中的收货地址
            address: [],
            //缓存中的购物车数组
            cart: [],
            //商品总数量
            total: 0,
            //商品总价格
            totalPay: 0
        },
        onLoad() {
            //获取缓存中的收货地址
            const address = wx.getStorageSync('address');
            // 获取缓存中的购物车数组
            const cart = wx.getStorageSync('cart') || [];
            //过滤购物车数组，选取 checked 为true的
            let checkedCart = cart.filter((item) => {
                return item.checked
            });
            //获取商品的总数量
            let total = 0;
            //获取商品的总价格
            let totalPay = 0
            checkedCart.forEach((item) => {
                total += item.num;
                totalPay += item.num * item.goods_price;
            });
            this.setData({
                address,
                total,
                totalPay,
                cart: checkedCart
            });
            console.log(this.data.address)
        },

        //点击支付按钮
        handleOrderPay() {
            // 获取用户的 token
            let token = wx.getStorageSync('token')
                //如果用户 token 不存在的情况下
            if (!token) {
                //就跳转到授权页面
                wx.navigateTo({
                    url: '/pages/auth/index',
                });
                return
            }
        }
    })
    //创建订单
    //     const header = { Authorization: token };
    //     //准备请求体参数 order price 
    //     const order_price = this.data.totalPay;
    //     const consignee_addr = this.data.address.all;
    //     const cart = this.data.cart;
    //     let goods = [];
    //     cart.forEach(v => goods.push({
    //         goods_id: v.goods_id,
    //         goods_number: v.num,
    //         goods_price: v.goods_price
    //     }))
    //     const orderParams = { order_price, consignee_addr, goods };
    //     //准备发送请求

//     const { order_number } = await request({ url: '/my/orders/create', method: "post", data: orderParams, header });
//     const { pay } = await request({ url: '/my/orders/req_unifiedorder', method: 'post', header, data: { order_number } });
//     const res = wx.requestPayment({ url: 'my/orders/chkOrder', method: 'post', header, dat: { order_number } });
//     //支付成功后手动删除已经支付了的商品
//     let newCart = wx.getStorageSync('cart');
//     newCart = newCart.filter(v => !v.checked);
//     wx.getStorageSync("cart", newCart);
//     wx.navigateTo({ url: /pages/order / index });
// }

// })
// wx.requestPayment({
//     timeStamp: '',
//     nonceStr: '',
//     package: '',
//     signType: '',
//     paySign: '',
//     success: (result) => {

//     },
//     fail: () => {},
//     complete: () => {} })