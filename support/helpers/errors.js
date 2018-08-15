'use strict';

var Errors = function() {
	this.fail_click = ' --> Error, al hacer click en ';
	this.notPresent = ' --> was not present when time ran out';
	this.notClickable = '  --> was not clickable when time ran out';
	this.notVisible = '  --> was not visible when time ran out';
	this.listErrs = {
		fail_click: ' --> Error, al hacer click en ',
		notPresent: ' --> was not present when time ran out',
		notClickable: '  --> was not clickable when time ran out',
		notVisible: '  --> was not visible when time ran out'
	};

	this.missingQuestion = ' --> The name of the question wasn\'t found after 5000 ms';

	this.scenarioError = null;

	this.elementNotFound = function(ele) {
		return 'Something happened when looking for ---> "' + ele + '", maybe you should check if it exists or if its used multiple times';
	};

	this.elementShouldNotExist = function(ele) {
		return 'The element ---> "' + ele + '", should not be displayed and it is, check the test flow';
	};

	this.incorrectPage = function(input, cb) {
		brw.getLocationAbsUrl().then(function(output) {
			if (input !== output) {
				return 'The page '.concat(input).concat(' was expected but').concat(output).concat(' is displayed instead');
			}
		}).then(cb);
	};

	this.isNotDisplayed = function(el, output) {
		if (true !== output) {
			return 'The element '.concat(el).concat(' was not displayed');
		}
	};

	this.unmatchingLength = function(input, output) {
		if (input !== output) {
			return ' '.concat('The length of the string was expected to be "').concat(input).concat('" but the length was "').concat(output).concat('"');
		}
	};

	this.unmatchingText = function(input, output) {
		if (input !== output) {
			return ' '.concat('The string was expected to be "').concat(input).concat('" but it was "').concat(output).concat('"');
		}
	};

	this.differentRgb = function(input, output, styleItem) {
		if (input !== output) {
			return ' '.concat(input).concat(' as rgb was selected to be applied in the ').concat(styleItem).concat(' but the html has ').concat(output);
		}
	};

	this.paginationIndividualResponses = function(input, output) {
		if (input !== output) {
			return ' '.concat(input).concat(' items in the pagination were expected but ').concat(output).concat(' are displayed');
		}
	};

	this.dateFilter = function(input, output) {
		if (input !== output) {
			return ' '.concat(input).concat(' date was filtered but ').concat(output).concat(' date is shown in the filtered answers');
		}
	};

	this.expressionFilter = function(input, output) {
		if (input !== output) {
			return ' '.concat(input).concat(' expression should be in the question filter but the filter has ').concat(output);
		}
	};

	this.answersFilter = function(input, output) {
		if (input !== output) {
			return ' '.concat(input).concat(' answers should be displayed but ').concat(output).concat(' were displayed');
		}
	};

	this.individualResponsesFilter = function(input, output) {
		if (input !== output) {
			return ' '.concat(input).concat(' individual responses should be displayed but ').concat(output).concat(' were displayed');
		}
	};

	this.totalAnswers = function(input, output) {
		if (input !== output) {
			return ' '.concat(input).concat(' is the total number of responses shown by the percentages and it should be at most ').concat(output);
		}
	};

	this.totalPercentage = function(input, output) {
		if (input !== output) {
			return ' '.concat(input).concat(' is the total sum of percentages shown in the answer chart but ').concat(output).concat(' should be the total sum');
		}
	};

	this.takeScreenshot = function() {
		var _this = this;
		brw.executeScript('document.body.style.zoom=\'50%\';');
		return brw.takeScreenshot().then(function(png) {
			brw.executeScript('document.body.style.zoom=\'100%\';');
			var decodedImage = new Buffer(png, 'base64').toString('binary');
			_this.scenarioError = decodedImage;
		});
	};

	this.handler = function(_name, _helper) {
		if (this.listErrs.hasOwnPropert(_name)) {
			var _handlerError = this.listErrs[_name];
			return _handlerError = (typeof _helper !== 'undefined') ? (_handlerError + _helper) : _handlerError;
		} else throw new Error('Error, la clave ingresada no existe');
	};

	this.get = function(_name, _helper) {
		var _err = this.handler(_name, _helper);
		if (_err == null) return _err;
		return new Error(_err);
	};

	this.missingQuestion = function() {
		return null;
	};
};

module.exports = new Errors();
