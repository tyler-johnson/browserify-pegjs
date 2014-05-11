var PEG = require("pegjs"),
	through = require("through"),
	path = require("path");

module.exports = function(options) {
	options = options || {};
	options.output = "source";
	options.extension = options.extension || ".pegjs";

	return function(file) {
		if (path.extname(file) !== options.extension) return through();

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
}