var babel = require("babel-core");
var UglifyJS = require("uglify-js")
var fs = require("fs");

babel.transformFile("./src/chart.js",(err,result)=>{
	if(err){
		console.log(err);
	}else{	
		var code = UglifyJS.minify(result.code);
		fs.writeFile("./dist/chart.min.js",code.code);
		fs.writeFile("./example/chart/utils/chart.min.js",code.code);
	}
})