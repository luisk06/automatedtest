'use strict';

var Logger = function() {
	this.colors = require('colors');

	this.settings = {
		isDebug: false
	};

	this.custommizeColors = function(obj) {
		return this.colors.setTheme(obj);
	};

	this.activateDebug = function(_val) {
		this.settings['isDebug'] = _val;
	};

	this.isDebug = function() {
		return this.settings.isDebug;
	};

	this.writeLog = function(_value, _title) {
		if (this.isDebug()) {
			if (typeof _title === 'undefined') {
				console.log(_value);
			} else {
				console.log(_value, _title);
			}
		}

		return this;
	};

	this.log = function(_value, _title) {
		return this.writeLog(this.colors.underline(_value), _title);
	};

	this.info = function(_value, _title) {
		return this.writeLog(this.colors.cyan(_value), _title);
	};

	this.error = function(_value, _title) {
		return this.writeLog(this.colors.red(_value), _title);
	};

	this.warn = function(_value, _title) {
		return this.writeLog(this.colors.yellow(_value), _title);
	};

	this.debug = function(_value, _title) {
		return this.writeLog(this.colors.magenta(_value), _title);
	};

	this.count = function(_value) {
		if (this.isDebug()) {
			console.count(_value);
		}

		return this;
	};

	this.trace = function(_value, _title) {
		if (typeof _title === 'undefined') {
			console.trace(_value);
		} else {
			console.trace(_value, _title);
		}

		return this;
	};
};

module.exports = new Logger();
