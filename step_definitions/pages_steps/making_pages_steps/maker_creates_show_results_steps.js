module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user delete all the pages$/, function (cb) {
		webpage.waits(500).then(function(){
			user.findsAll('.pages-list li').count().then(function(num) {
				logger.log('Elementos----', num);

				var i = 0;
				async.times(num, function(n, next) {
					i = n + 1;
					user.findsAll('.dropDashDropped').get(0).click().then(function(){

						return user.findsAll('.opt-delete').get(0).click();
					}).then(function(){
						return user.finds('.spec-delete-process-confirm').click();
					}).then(function(){
						if(i == num) cb();
						logger.log('Intem---', i);

						next();
					});
				});
			});
		});
	});

	Then(/^the dashboard of pages is empty$/, function (cb) {
		expect(user.findsAll('.pages-list li').count()).to.eventually.be.equal(1).and.notify(cb);
	});
	// creatingResultActions
};