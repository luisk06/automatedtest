'use strict';

var RequestService = function() {

	this.sendInfo = function(_options, _callback) {
		var baseUrl = configer.get('url');

		logger.log('URL', baseUrl + _options.url);
		if (typeof baseUrl !== 'undefined') {
			var options = {
				url: baseUrl + _options.url,
				method: _options.method,
				headers: {
					'Content-Type': 'application/json'
				}
			};

			if (typeof _options.headers !== 'undefined') {
				options.headers = _options.headers;

				if(_options && _options.headers && _options.headers['content-type'] === 'application/json'){
					options.json = _options.data;
				} else if (typeof _options.json !== 'undefined') {
					options.body = _options.data;
					options.json = true;
				} else {
					options.form = _options.data;
				}
			} else if (typeof _options.data !== 'undefined') {
				options.body = _options.data;
			}

			logger.log('-------------------------------');
			logger.info('options', options);

			try {
				if(options.body.answers){
					logger.info('options', options.body.answers);
				}
			} catch (error) {
				// console.log('Not have answers to show');
			}

			logger.log('-------------------------------');

			request(options, function(error, response, body) {
				if (error) throw 'Request Fail: ' + error;

				logger.info('response:', body);

				_callback(body, error);
			});
		} else throw 'Undefined the Url in the config';
	};

	this.sendCustomUrlInfo = function(_options, _callback) {
		if (configer.get('url') != 'login' && !configer.get('isLogged')) {
			throw 'Not logged in';
		} else {
			logger.info('The user is logged');
		}

		if (typeof configer.get('url') !== 'undefined') {
			var options = {
				url: _options.url,
				method: _options.method,
				headers: {
					'Content-Type': 'application/json'
				}
			};

			if (typeof _options.headers !== 'undefined') {
				options.headers = _options.headers;

				if (typeof _options.json !== 'undefined') {
					options.json = true;
				} else {
					options.form = _options.data;
				}
			}

			if (_options.method == 'GET'){
				delete _options.body;
			}

			logger.log('-------------------------------');
			logger.info('options', options);
			logger.log('-------------------------------');

			request(options, function(error, response, body) {
				if (error) throw 'Request Fail: ' + error;

				logger.info('response:', body);

				_callback(body, error);
			});
		} else throw 'Undefined the Url in the config';
	};
};

module.exports = new RequestService();
