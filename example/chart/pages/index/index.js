
var Chart = require("../../utils/chart.min.js");

const app = getApp()

Page({
    data: {
         },
    onLoad() {
      
    },
    gopie(){
        wx.navigateTo({
            url: '/pages/pie/pie',
        })
    },
    gobar(){
        wx.navigateTo({
            url: '/pages/bar/bar',
        })
    }
})
