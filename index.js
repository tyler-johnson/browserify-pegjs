var PEG = require("pegjs"),
	through = require("through"),
	path = require("path");

module.exports = function(file, options) {
	if (path.extname(file) !== ".pegjs") return through();
	
	options = options || {};
	options.output = "source";

	var src = "";
	return through(write, end);

	function write(chunk) {
		src += chunk.toString("utf-8");
	}

	function end() {
		var contents = "module.exports = " + PEG.buildParser(src, options);
		this.emit("data", contents);
		this.emit("end");
	}
}