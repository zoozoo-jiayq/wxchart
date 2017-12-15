var babel = require("babel-core");
var UglifyJS = require("uglify-js")
var fs = require("fs");

babel.transformFile("./src/chart.js",(err,result)=>{
	var code = UglifyJS.minify(result.code);
	console.log(code);
	fs.writeFile("./dist/chart.min.js",code.code);
	fs.writeFile("./example/chart/utils/chart.min.js",code.code);
})