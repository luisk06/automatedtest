
global.getImage = function () {
	return fs.readFileSync('./support/logos/google.png', 'utf8');
};

global.hasClass = function (element, cls) {
	return element.getAttribute('class').then(function (classes) {
		return classes.split(' ').indexOf(cls) !== -1;
	});
};

global.scrollIntoElement = function (_el, _callBack) {
	return brw.executeScript('arguments[0].scrollIntoView();', _el.getWebElement()).then(function () {
		if (typeof _callBack !== 'undefined') {
			_callBack();
		}
	});
};

global.randomId = function (n) {
	var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
	var id = '';
	var randPos = 0;
	n = (typeof n !== 'undefined') ? n : 12;

	for (var i = 1; i <= n; i++) {
		randPos = Math.floor(Math.random() * charSet.length);
		id += charSet[randPos];
	}

	return id;
};

global.scrollToTop = function (position) {
	position = (typeof position === 'undefined')? 0 : position;
	return brw.executeScript('window.scrollTo(0,' + position + ');');
};

global.scrollAxisY = function (num) {
	return brw.executeScript('window.scrollTo(0,' + num + ');');
};

global.scrollToBottom = function () {
	return brw.executeScript('window.scrollTo(0,10000);');
};

global.abbrState = function (input, to) {

	var states = [
		['Arizona', 'AZ'],
		['Alabama', 'AL'],
		['Alaska', 'AK'],
		['Arizona', 'AZ'],
		['Arkansas', 'AR'],
		['California', 'CA'],
		['Colorado', 'CO'],
		['Connecticut', 'CT'],
		['Delaware', 'DE'],
		['Florida', 'FL'],
		['Georgia', 'GA'],
		['Hawaii', 'HI'],
		['Idaho', 'ID'],
		['Illinois', 'IL'],
		['Indiana', 'IN'],
		['Iowa', 'IA'],
		['Kansas', 'KS'],
		['Kentucky', 'KY'],
		['Kentucky', 'KY'],
		['Louisiana', 'LA'],
		['Maine', 'ME'],
		['Maryland', 'MD'],
		['Massachusetts', 'MA'],
		['Michigan', 'MI'],
		['Minnesota', 'MN'],
		['Mississippi', 'MS'],
		['Missouri', 'MO'],
		['Montana', 'MT'],
		['Nebraska', 'NE'],
		['Nevada', 'NV'],
		['New Hampshire', 'NH'],
		['New Jersey', 'NJ'],
		['New Mexico', 'NM'],
		['New York', 'NY'],
		['North Carolina', 'NC'],
		['North Dakota', 'ND'],
		['Ohio', 'OH'],
		['Oklahoma', 'OK'],
		['Oregon', 'OR'],
		['Pennsylvania', 'PA'],
		['Rhode Island', 'RI'],
		['South Carolina', 'SC'],
		['South Dakota', 'SD'],
		['Tennessee', 'TN'],
		['Texas', 'TX'],
		['Utah', 'UT'],
		['Vermont', 'VT'],
		['Virginia', 'VA'],
		['Washington', 'WA'],
		['West Virginia', 'WV'],
		['Wisconsin', 'WI'],
		['Wyoming', 'WY'],
	];

	if (to == 'abbr') {
		input = input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
		for (var i = 0; i < states.length; i++) {
			if (states[i][0] == input) {
				return (states[i][1]);
			}
		}
	} else if (to == 'name') {
		input = input.toUpperCase();
		for (i = 0; i < states.length; i++) {
			if (states[i][1] == input) {
				return (states[i][0]);
			}
		}
	}
};

global.findQuestion = function (_name) {
	return JSON.parse(fs.readFileSync('./support/models/newQuestions/' + _name + '.json', 'utf8'));
};

global.findModel = function (_name) {
	return JSON.parse(fs.readFileSync('./support/models/' + _name + '.json', 'utf8'));
};

global.findBranchs = function (_name) {
	return JSON.parse(fs.readFileSync('./support/models/branchs/' + _name + '.json', 'utf8'));
};

global.findAllQuestions = function (_name) {
	return JSON.parse(fs.readFileSync('./support/models/all_questions/' + _name + '.json', 'utf8'));
};

global.findCharts = function (_name) {
	return JSON.parse(fs.readFileSync('./support/models/chart_builder/' + _name + '.json', 'utf8'));
};

global.findAnswers = function (_name) {
	return JSON.parse(fs.readFileSync('./support/models/answers/' + _name + '.json', 'utf8'));
};

global.findBranchAnswers = function (_name) {
	return JSON.parse(fs.readFileSync('./support/models/answers/branchs/' + _name + '.json', 'utf8'));
};

global.findChartAnswers = function (_name) {
	return JSON.parse(fs.readFileSync('./support/models/answers/chart_builder/' + _name + '.json', 'utf8'));
};

global.findAllQuestionsAnswers = function (_name) {
	return JSON.parse(fs.readFileSync('./support/models/answers/all_questions/' + _name + '.json', 'utf8'));
};

global.findDataModel = function (_name) {
	return JSON.parse(fs.readFileSync('./support/models/example_data/' + _name + '.json', 'utf8'));
};

global.getIds = function (arr) {
	global.qrveyIds = [];

	for (var item in arr) {
		qrveyIds.push(item.id);
	}
};

global.getDateFormat = function (d) {
	// .toISOString().slice(0, 10).replace(/-/g, '/')
	if (typeof d !== 'object') d = new Date(d);

	try {
		var c = d.getDate();
		if (parseInt(c) < 10) c = '0' + c.toString();
		var m = d.getMonth() + 1;
		if (parseInt(m) < 10) m = '0' + m.toString();
		var y = d.getFullYear();

		return m + '/' + c + '/' + y;
	} catch (err) {
		logger.error('ERROR', err);
	}
};

global.toDate = function (str) {
	return new Date(str);
};

global.validField = function (_field, _name, _nameFunction) {
	if (typeof _field === 'undefined') {
		throw new Error('Undefined ' + _name + ' of Qrvey in ' + _nameFunction + ' function');
	}
};

global.trim_nulls = function (data) {
	var y;
	for (var x in data) {
		y = data[x];
		if (y === 'null' || y === null || y === '' || typeof y === 'undefined' || (y instanceof Object && Object.keys(y).length == 0)) {
			delete data[x];
		}
		if (y instanceof Object) y = trim_nulls(y);
	}
	return data;
};

global.gArray = function (num) {
	return Array.apply(null, { length: num }).map(function (item, i) {
		return i + 1;
	});
};

global.findHashInUrl = function (_url) {
	return _url.substring(_url.lastIndexOf('/') + 1, _url.lenght);
};

global.skipSync = function (_value) {
	brw.ignoreSynchronization = _value;
};

global.capitalize = function (str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

// global.Array.prototype.unique = function(a) {
// 	return function() {
// 		return this.filter(a);
// 	};
// }(function(a, b, c) {
// 	return c.indexOf(a, b + 1) < 0;
// });