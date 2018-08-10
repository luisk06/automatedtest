'use strict';

var hooks = function () {
	this.Before(function (scenario, callback) {
		var world = this;
		world.scenario = scenario;
		callback();
	});
};

module.exports = hooks;