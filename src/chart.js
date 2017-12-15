/*
    options公共参数定义:
    {
        id:xxx,//必填，画板ID
        x:xxx,//必填，绘图位置的X轴坐标
        y:xx, //必填， 绘图位置的y轴坐标
        data:[name:xxx,value:xxx,color:xxx]//必填 数据列表，color可以为空
    }
*/
(function (module) {
    function Chart(options) {
        this.defaultColors = ["#D53A35", "#2F4554", "#6AB0B8", "#D48265", "#91C7AE", "#6E7074","#C4CCD3"];
        this.options = options;
    }
    //画圆用到的初始化
    Chart.prototype._initPie = function () {
        //画圆按照逆时针画
        this.angle = 0;//0~2*PI,从3点方向开始顺时针方向增加
        this.at = 0;//0~360，从3点钟方向顺时针增加
        this.pointerAt = 0;//指针位置在当前饼图的中间位置
    }

    Chart.prototype.drawPie = function (params) {
        Merge(this.options, params);
        this._initPie();
        var options = this.options;
        this._beforeDraw(options);
        var colorIndex = 0;
        this.data.forEach(d => {
            this.ctx.beginPath();
            this.ctx.moveTo(options.x, options.y);
            var angle = this.angle + 2 * d.rate;
            this.ctx.arc(options.x, options.y, options.r, this.angle * Math.PI, angle * Math.PI);
            if (colorIndex > this.defaultColors.length - 1) {
                colorIndex = 0;
            }
            var color = null;
            if (d.color) {
                color = d.color;
            } else {
                color = this.defaultColors[colorIndex++];
            }
            this.ctx.setFillStyle(color);
            this.ctx.closePath();
            this.ctx.fill();
            this.pointerAt = this.at + 180 * d.rate;
            this.at += 360 * d.rate;
            this.angle = angle;
            //画指示线头
            this.ctx.beginPath();
            this.ctx.moveTo(this.options.x, this.options.y);
            var pointerX = this.options.x + (this.options.r + 30) * Math.cos(this.pointerAt * Math.PI / 180);
            var pointerY = this.options.y + (this.options.r + 30) * Math.sin(this.pointerAt * Math.PI / 180);
            this.ctx.lineTo(pointerX, pointerY);
            //设置基线
            var align = null;
            if (this.pointerAt <= 90 || this.pointerAt >= 270) {
                align = "left";
                pointerX += 10;
            } else {
                align = "right";
                pointerX -= 10;
            }
            this.ctx.lineTo(pointerX, pointerY);
            this.ctx.setStrokeStyle(color);
            this.ctx.stroke();
            //显示文字说明
            this.ctx.setFontSize(d.font?d.font:12);
            this.ctx.setTextBaseline('middle');
            this.ctx.setTextAlign(align);
            this.ctx.fillText(d.name, pointerX, pointerY);
        })
        // this.ctx.setFontSize(20);
        // this.ctx.fillText("hello,world",150,300);
        this._afterDraw();
    }

    Chart.prototype._beforeDraw = function (options) {
        options.x ? options.x : options.x = 0;
        options.y ? options.y : options.y = 0;
        AssertTrue(options.id);
        AssertTrue(options.data);
        this.ctx = wx.createCanvasContext(options.id);
        var data = options.data;
        var sum = data.reduce((s, t) => s += t.value, 0);
        var ndata = data.map(d => {
            d.rate = d.value / sum
            return d;
        })
        this.data = ndata;
    }
    Chart.prototype._afterDraw = function () {
        this.ctx.draw();
    }

    function AssertTrue(express) {
        if (!express) {
            console.error("chart.js:Assert false:" + express);
            return;
        }
    }
    function Merge(source, dest) {
        for (var k in dest) {
            source[k] = dest[k];
        }
        return source;
    }
    module.exports = Chart;
})(module);