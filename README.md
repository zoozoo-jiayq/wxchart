#基于微信小程序绘图API开发的一套报表显示工具
##API
	
	var chart = new Chart(options);
	//画饼图
    chart.drawPie(pieOptions);

##examle

![](https://github.com/zoozoo-jiayq/wxchart/blob/master/example.png?raw=true)
	
##options的定义
	
	{
	id:		字符串，必填，canvas的id
	x:		数值，必填，canvas显示位置的x坐标
	y:		数值，必填，canvas显示位置的y坐标
	font:	字符串，必填，canvas中文字的字体大小
	data:	[
				{
					name:	字符串，必填，数据描述
					value:	数值，必填
					color:	字符串，非必填，显示的颜色
				}
			]
		
	}
	
##pieOptions的定义
	
	{
		r:数值，必填，圆的半径
	}
