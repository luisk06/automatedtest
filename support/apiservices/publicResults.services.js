'use strict';

var PublicResultsService = function() {

	this.getPublicResultsURL = function(qrveyID) {
		if (typeof qrveyID == 'undefined' || qrveyID == null) throw new Error('QrveyID must ve a value');

		var defer = protractor.promise.defer(),
			options = {
				method: 'GET',
				url: '/api/qrvey/results/publicurl?qrveyid=' +qrveyID
			};

		rs.sendInfo(options, function(_resp) {
			try {
				return defer.fulfill(JSON.parse(_resp));
			} catch (err) {
				logger.error('Error, no response in getPublicResultsURL public results function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};
};

module.exports = new PublicResultsService();
