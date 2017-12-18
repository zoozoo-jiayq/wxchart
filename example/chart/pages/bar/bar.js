// pages/bar/bar.js

var Chart = require("../../utils/chart.min.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var chart = new Chart({
            id: "myCanvas",
            x: 50,
            y: 300,
            font: 10,
            data: [{ value: 20 },
            { value: 30 },
            { value: 40 },
            { value: 50 },
            { value: 20 },
            { value: 20 },
            { value: 20 },
            ]
        });
        chart.drawBar({
            size: {
                width: 300,
                height: 200
            },
            yAxis: {
                cursors: 4
            },
            xAxis: {
                data: ["星期-", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日",]
            }
        });
    }
})