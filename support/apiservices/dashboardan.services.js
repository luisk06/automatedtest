'use strict';

var dashboardAnService = function() {

	this.getAll = function(_appID) {
		var defer = protractor.promise.defer(),
			options = {
				method: 'GET',
				url: '/api/dashboard/appid/' + _appID
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

	this.delete = function(_panelID) {
		var defer = protractor.promise.defer(),
			options = {
				method: 'DELETE',
				url: '/api/dashboard/' + _panelID,
			};

		rs.sendInfo(options, function(_resp) {
			try {
				return defer.fulfill();
			} catch (err) {
				logger.error('Error, no response in delete containers function.');
				logger.error(_resp);

				throw _resp;
			}
		});

		return defer.promise;
	};
};

module.exports = new dashboardAnService();