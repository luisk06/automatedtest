'use strict';

var Random = function() {
	this.getEmail = function(_domain) {
		return 'testingqrvey+' + chance.email((typeof _domain !== 'undefined') ? _domain : {
			domain: 'gmail.com'
		});
	};

	this.getRandomEmail = function(_domain) {
		return chance.email((typeof _domain !== 'undefined') ? _domain : {
			domain: 'gmail.com'
		});
	};

	this.getBoolean = function(_likelihood) {
		return chance.bool((typeof _likelihood !== 'undefined') ? _likelihood : {
			likelihood: 50
		});
	};

	this.getPass = function() {
		return this.getText(6);
	};

	this.getText = function(_size) {
		return chance.string({
			pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
			length: (typeof _size !== 'undefined') ? _size : 5
		});
	};

	this.getSentence = function(_words) {
		return chance.sentence({
			words: (typeof _words !== 'undefined') ? _words : 5
		});
	};

	this.getParagraph = function(_sentences) {
		return chance.paragraph({
			sentences: (typeof _sentences !== 'undefined') ? _sentences : 1
		});
	};

	this.getNumber = function(opt) {
		if (typeof opt !== 'undefined') {
			if (typeof opt.float === 'undefined') opt.float = false;
			if (typeof opt.min === 'undefined') opt.min = 1;
			if (typeof opt.max === 'undefined') opt.max = 100;
		} else {
			opt = {
				float: false,
				min: 1,
				max: 100
			};
		}

		if (!opt.float) {
			return chance.natural({
				min: opt.min,
				max: opt.max
			});
		} else {
			return chance.floating({
				fixed: 2,
				min: opt.min,
				max: opt.max
			});
		}
	};

	this.getName = function() {
		return chance.first();
	};

	this.getLastname = function() {
		return chance.last();
	};

	this.getFullName = function() {
		return chance.name();
	};

	this.getPhone = function(opt) {
		return chance.phone((typeof opt !== 'undefined') ? opt : {
			formatted: false
		});
	};

	this.getAddress = function() {
		return chance.address();
	};

	this.getBirthday = function() {
		return chance.birthday({
			string: true
		});
	};

	this.getAvatar = function(opt) {
		if (typeof opt !== 'undefined') {
			opt.protocol = (typeof opt.protocol !== 'undefined') ? opt.protocol : 'https';
		} else opt = { protocol: 'https' };

		return chance.avatar(opt);
	};

	this.getColor = function(opt) {
		opt = (typeof opt !== 'undefined')? opt : {format: 'hex'};
		return chance.color(opt);
	};

	this.getUrl = function() {
		return chance.url();
	};

	this.getCity = function() {
		return chance.city();
	};

	this.getCountry = function() {
		return chance.country({
			full: true
		});
	};

	this.getState = function(opt) {
		return chance.state((typeof opt !== 'undefined') ? opt : {
			full: true,
			country: 'us'
		});
	};

	this.getZip = function() {
		return chance.zip();
	};

	this.getDate = function(_isRaw) {
		if (!(typeof _isRaw !== 'undefined')) return chance.date({
			string: true
		});

		return chance.date({
			raw: true
		});
	};

	this.getFormatedDate = function(opt) {
		if (typeof opt !== 'undefined') {
			return chance.date({string: true});
		} else {
			return chance.date(opt);
		}
	};

	this.getMonth = function() {
		return chance.month();
	};

	this.getYear = function() {
		return parseInt(chance.year({
			min: 2017,
			max: 2100
		}));
	};

	this.getCreditCard = function(opt) {
		return chance.cc((typeof opt !== 'undefined') ? opt : {
			type: 'Mastercard'
		});
	};

	this.getExp = function() {
		return chance.exp();
	};

	this.getTime = function(_isRaw) {
		if (!(typeof _isRaw !== 'undefined')) return chance.hour({
			twentyfour: true
		}) + ':' + chance.minute() + ':' + chance.second();
		else return {
			hour: chance.hour({
				twentyfour: true
			}),
			minute: chance.minute(),
			second: chance.second()
		};
	};

	this.getPrefixName = function() {
		return chance.prefix();
	};

	this.getWord = function(_length) {
		return chance.n(chance.word, (typeof _length !== 'undefined') ? _length : 5).join(' ');
	};

	this.getN = function(chanceF, n, options) {
		return chance.n(chanceF, n, options);
	};

	this.getOne = function(_array){
		return chance.pickone(_array);
	};

	this.reSort = function(_array){
		return chance.shuffle(_array);
	};

	this.getSet = function(_array, num){
		return chance.pickset(_array, num);
	};
};

module.exports = new Random();
