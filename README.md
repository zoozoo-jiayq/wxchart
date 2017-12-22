#基于微信小程序绘图API开发的一套报表显示工具
##API
	
	//画饼图
	var pie = new Chart(options);	
    pie.drawPie(pieOptions);
	//画柱状图
	var bar = new Chart(options);
	bar.drawBar(barOptions);
	//画散点图
	var scatter = new Chart(options);
	scatter.drawScatter(scatterOptions);

##examle

![](https://github.com/zoozoo-jiayq/wxchart/blob/master/pie.png?raw=true)
![](https://github.com/zoozoo-jiayq/wxchart/blob/master/bar.png?raw=true)
![](https://github.com/zoozoo-jiayq/wxchart/blob/master/scatter.png?raw=true)
	
##options的定义
	
	{
	id:		字符串，必填，canvas的id
	x:		数值，必填，canvas显示位置的x坐标
	y:		数值，必填，canvas显示位置的y坐标
	font:	字符串，必填，canvas中文字的字体大小
	data:	[
				{
					name:	字符串/数值，如果图标有XY轴系统，则name表示X轴坐标，在饼图中name表示该区域的名字
					value:	数值，必填
					color:	字符串，非必填，显示的颜色
				}
			]
		
	},
	data1:[],对于散点图来说可以同时配置多个data
	
##pieOptions的定义
	
	{
		r:数值，必填，圆的半径
	}

##barOptions的定义
	
	size: {
		width:300,
	//必填，数值，柱状图的宽度
		height:200
 	//必填，数值,柱状图的高度
	},

	yAxis: {
		cursors: 4 //Y轴的标尺数量
	},
	xAxis: {
		data: ["星期-", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]//X轴的标尺值
	}

##scatterOptions散点图的定义和barOptions的定义相同