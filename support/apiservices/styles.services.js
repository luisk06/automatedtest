'use strict';

var StylesService = function() {

	this.getAll = function() {
		var defer = protractor.promise.defer(),
			options = {
				method: 'GET',
				url: '/api/styles'
			};

		rs.sendInfo(options, function(_resp) {
			try {
				return defer.fulfill(JSON.parse(_resp));
			} catch (err) {
				logger.error('Error, no response in getAll styles function.');
				logger.error(_resp);

				throw _resp;
			}
		});

		return defer.promise;
	};

	this.delete = function(_styleID) {
		var defer = protractor.promise.defer(),
			options = {
				method: 'DELETE',
				url: '/api/styles/' + _styleID,
			};

		rs.sendInfo(options, function(_resp) {
			try {
				return defer.fulfill();
			} catch (err) {
				logger.error('Error, no response in delete style function.');
				logger.error(_resp);

				throw _resp;
			}
		});

		return defer.promise;
	};

};

module.exports = new StylesService();
