'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the current user has (\d+) contacts$/, function(num, cb) {
		async.times(num, function(n, next){
			cs.create({
				name: rand.getFullName(),
				email: rand.getEmail('addressbook.com'),
				phone: rand.getPhone(),
				tags: [{ text: rand.getWord({ formatted: false }) }]
			}).then(function(){
				next();
			});
		}, function(){
			cb();
		});
	});
};
