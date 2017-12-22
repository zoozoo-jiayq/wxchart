/*
    options公共参数定义:
    {
        id:xxx,//必填，画板ID
        x:xxx,//必填，绘图位置的X轴坐标
        y:xx, //必填， 绘图位置的y轴坐标
        data:[{name:xxx,value:xxx,color:xxx}]//必填 数据列表，color可以为空
    }
*/
(function(module) {

    //构造函数
    function Chart(options) {
        this.defaultColors = ["#D53A35", "#2F4554", "#6AB0B8", "#D48265", "#91C7AE", "#6E7074", "#C4CCD3"];
        this.options = options;
    }
    //canvas的预处理
    Chart.prototype._beforeDraw = function() {
        var options = this.options;
        options.x ? options.x : options.x = 0;
        options.y ? options.y : options.y = 0;
        AssertTrue(options.id, "id属性不能为空");
        AssertTrue(options.data, "data属性不能为空");
        this.ctx = wx.createCanvasContext(options.id);
        
    }
    Chart.prototype._afterDraw = function() {
        this.ctx.draw();
    }

    function AssertTrue(express, desc) {
        if (!express) {
            console.error("chart.js:Assert false:" + desc);
            return;
        }
    }

    function Merge(source, dest) {
        for (var k in dest) {
            source[k] = dest[k];
        }
        return source;
    }

    /*
        画饼图
    */
    Chart.prototype._initPie = function() {
        AssertTrue(this.options.r, "半径r不能为空");
        //画圆按照逆时针画
        this.angle = 0; //0~2*PI,从3点方向开始顺时针方向增加
        this.at = 0; //0~360，从3点钟方向顺时针增加
        this.pointerAt = 0; //指针位置在当前饼图的中间位置

        var data = this.options.data;
        var sum = data.reduce((s, t) => s += t.value, 0);
        var ndata = data.map(d => {
            d.rate = d.value / sum
            return d;
        })
        this.data = ndata;
    }

    // params:{r:xx}
    Chart.prototype.drawPie = function(params) {
        Merge(this.options, params);
        this._beforeDraw();
        this._initPie();
        var options = this.options;
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
            this.ctx.setFontSize(d.font ? d.font : 12);
            this.ctx.setTextBaseline('middle');
            this.ctx.setTextAlign(align);
            this.ctx.fillText(d.name, pointerX, pointerY);
        })
        // this.ctx.setFontSize(20);
        // this.ctx.fillText("hello,world",150,300);
        this._afterDraw();
    }

    /*
        初始化XY轴
    */
    Chart.prototype._initXY = function() {
        AssertTrue(this.options.size, "size属性不能为空");
        AssertTrue(this.options.xAxis, "x轴定义不能为空");
        AssertTrue(this.options.yAxis, "y轴定义不能为空");
        AssertTrue(this.options.yAxis.cursors, "y轴指标数量不能为空");
        //柱子的最宽宽度为30px;
        this.options.xAxis.maxWidth = 30;
        //x轴每一格的宽度,单位是px
        this.options.xAxis.cursorStep = Math.floor(this.options.size.width / this.options.xAxis.data.length);
        var _data = this.options.data.slice();
        _data.sort((a, b) => b.value - a.value);
        var maxValue = _data[0].value;
        //y轴每一格的高度，单位是px
        this.options.yAxis.cursorStep = Math.floor(this.options.size.height / this.options.yAxis.cursors);
        //y轴指标精度
        this.options.yAxis.precise = Math.ceil(maxValue / this.options.yAxis.cursors);
        //先画x轴
        this.ctx.moveTo(this.options.x, this.options.y);
        this.ctx.lineTo(this.options.x + this.options.size.width, this.options.y);
        this.ctx.stroke();
        this.options.xAxis.start = this.options.xAxis.cursorStep / 2; //x轴节点的相对位置
        this.xpoints = new Array(); //x轴上的节点 
        this.options.xAxis.data.forEach(d => {
            this.xpoints.push(this.options.x + this.options.xAxis.start);
            this.ctx.moveTo(this.options.x + this.options.xAxis.start, this.options.y);
            this.ctx.lineTo(this.options.x + this.options.xAxis.start, this.options.y + 5);
            this.ctx.stroke();
            this.ctx.setTextAlign("center");
            this.ctx.setTextBaseline("bottom");
            this.ctx.setFontSize(this.options.font);
            this.ctx.fillText(d, this.options.x + this.options.xAxis.start, this.options.y + 15);
            this.options.xAxis.start += this.options.xAxis.cursorStep;
        })
        //画Y轴
        this.ctx.moveTo(this.options.x, this.options.y);
        this.ctx.lineTo(this.options.x, this.options.y - this.options.size.height);
        this.ctx.stroke();
        for (var i = 1; i <= this.options.yAxis.cursors; i++) {
            this.ctx.moveTo(this.options.x, this.options.y - this.options.yAxis.cursorStep * i);
            this.ctx.lineTo(this.options.x - 5, this.options.y - this.options.yAxis.cursorStep * i);
            this.ctx.stroke();
            this.ctx.setTextAlign("left");
            this.ctx.setTextBaseline("center");
            this.ctx.setFontSize(this.options.font);
            this.ctx.fillText(this.options.yAxis.precise * i, this.options.x - 35, this.options.y - this.options.yAxis.cursorStep * i);
        }
    }

    /*
        画柱状图
        options定义
        {
            size:{
                width:xx,
                height:xxx
            },
            xAxis:{
                data:["1月","2月",...]
            },
            yAxis:{
                cursors:3
            }
        }
    */
    Chart.prototype.drawBar = function(params) {
        Merge(this.options, params);
        this._beforeDraw();
        this._initXY();
        //画柱子
        console.log(this.xpoints);
        var barw = this.options.xAxis.cursorStep / 2;
        if (barw > this.options.xAxis.maxWidth) {
            barw = this.options.xAxis.maxWidth;
        }
        for (var i = 0; i < this.xpoints.length; i++) {
            var p = this.xpoints[i];
            this.ctx.moveTo(p + barw / 2, this.options.y);
            var h = this.options.data[i].value * this.options.size.height / (this.options.yAxis.precise * this.options.yAxis.cursors);
            this.ctx.lineTo(p + barw / 2, this.options.y - h);
            this.ctx.lineTo(p - barw / 2, this.options.y - h);
            this.ctx.lineTo(p - barw / 2, this.options.y);
            this.ctx.setFillStyle("#3398DB");
            this.ctx.fill();
        }
        this._afterDraw();
    }

    /*
        画散点图
        options定义
        {
            size:{
                width:xx,
                height:xxx
            },
            xAxis:{
                data:["1000","2000","3000",..]
            },
            yAxis:{
                cursors:3
            }
        }
        
    */

    Chart.prototype.drawScatter = function(params){
        Merge(this.options, params);
        this._beforeDraw();
        this._initXY();

        var data = this.options.data;
        this._scatter(data);
        for(var i=1; i<10; i++){
            this._scatter(this.options["data"+i]);
        }

        this._afterDraw();
    }
    Chart.prototype._scatter = function(data){
        if(data){
            var maxXAxis = this.options.xAxis.data[this.options.xAxis.data.length-1];
            data.forEach(d=>{
                var x = d.name*this.options.size.width/maxXAxis;
                var y = d.value*this.options.size.height/(this.options.yAxis.precise * this.options.yAxis.cursors);
                this.ctx.moveTo(this.options.x+x,this.options.y-y);
                this.ctx.arc(this.options.x+x,this.options.y-y,2,0,2 * Math.PI);
                this.ctx.fill();
            })
        }
    }


    module.exports = Chart;
})(module);