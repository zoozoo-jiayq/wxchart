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
            data: [{ value: 20 ,name:100},
            { value: 30 ,name:200},
            { value: 40 ,name:350},
            { value: 50 ,name:400},
            { value: 20 ,name:450},
            { value: 20 ,name:500},
            { value: 20 ,name:560},
            ]
        });
        chart.drawScatter({
            size: {
                width: 300,
                height: 200
            },
            yAxis: {
                cursors: 4
            },
            xAxis: {
                data: [100, 300,500, 700]
            }
        });
    }
})