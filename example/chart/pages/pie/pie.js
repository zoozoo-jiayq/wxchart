
var Chart = require("../../utils/chart.min.js");

const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad() {
        var chart = new Chart({
            id: "myCanvas",
            x: 180,
            y: 150,
            font:10,
            data: [{ name: "测试1222", value: 20 }, 
            { name: "测试23333", value: 30 }, 
            { name: "测试333333", value: 40 }, 
            { name: "测试4444444", value: 50 }, 
            { name: "测试1222", value: 20 }, 
            { name: "测试1222", value: 20 }, 
            { name: "测试1222", value: 20 }, 
            { name: "测试1222", value: 20 }, 
            { name: "测试5555", value: 60 }, 
            { name: "测试6666", value: 70 }, 
            { name: "测试1222", value: 20 }, 
            { name: "测试1222", value: 20 }, 
            { name: "测试1222", value: 20 }, 
            { name: "测试1222", value: 20 }, 
            { name: "测试1222", value: 20 }, 
            { name: "测试1222", value: 20 }]
        });
       chart.drawPie({r:80});
    }
})
