'use strict';

var NameServices = function() {

	this.functionName = function() {
		var defer = protractor.promise.defer();
                
		defer.fulfill();

		return defer.promise;
	};
};

module.exports = new NameServices();
