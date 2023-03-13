
// Format each object inputted as a string and add it to one long string
exports.sqlFormat = function(value) {
	let returnStr = "";

	for (let obj of value) {
        returnStr = returnStr.concat(JSON.stringify(obj) + "\n");
    };

  	return (returnStr);
};




