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

			// logger.log('this is the global configs', this._config);
		} else {
			throw 'It has already been started plugin';
		}

		return this;
	};
};

module.exports = new Config();