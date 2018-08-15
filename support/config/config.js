'use strict';

var Config = function() {
	this._config = null;

	this.get = function(key) {
		return this._config[key];
	};

	this.set = function(key, value) {
		this._config[key] = value;
	};

	this.setup = function(_config) {
		if (this._config === null) {
			this._config = _config;

			this.set('QrveyId', 0);
		} else throw new Error('It has already been started plugin');

		return this;
	};
};

module.exports = new Config();