'use strict';

function World() {
	this.qrveyQuestionName = null;

	this.visit = function(url, callback) {
		this.browser.visit(url, callback);
	};

	this.setQrveyQuestionName = function(name) {
		this.qrveyQuestionName = name;
		logger.log('name');
	};

	this.setQrveyQuestionName = function() {
		return this.qrveyQuestionName;
	};
}

module.exports = function() {
	this.World = World;
};
