'use strict';

var Util = function() {

	this.getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	this.cleanArray = function(actual) {
		var newArray = new Array();
		for (var i = 0; i < actual.length; i++) {
			if (actual[i]) {
				newArray.push(actual[i]);
			}
		}
		return newArray;
	};

	this.arrayToMatrix = function(list, elementsPerSubArray) {
		var matrix = [],
			i, k;
		for (i = 0, k = -1; i < list.length; i++) {
			if (i % elementsPerSubArray === 0) {
				k++;
				matrix[k] = [];
			}
			matrix[k].push(list[i]);
		}

		return matrix;
	};

	this.hexToRgb = function(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	};
};

module.exports = new Util();
