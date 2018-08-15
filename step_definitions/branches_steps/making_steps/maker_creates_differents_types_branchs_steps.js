'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user selects if answer is "([^"]*)" in "([^"]*)"$/, function(typeOfOption, typeOfQuestion, cb) {
		var idx = -1;

		maker.finds('.spec-branch-ifansweris-dropdown').click();

		if(typeOfQuestion == 'multiple choice' || typeOfQuestion == 'ranking'){
			if(typeOfOption === 'equal') idx = 0;
			else if(typeOfOption === 'does not equal') idx = 1;
			else if(typeOfOption === 'contains') idx = 2;
			else if(typeOfOption === 'does not contain') idx = 3;
		}else if(typeOfQuestion == 'lookup'){
			if(typeOfOption === 'contains') idx = 0;
			else if(typeOfOption === 'does not contain') idx = 1;
		}

		var counter = maker.findsAll('.spec-branch-ifansweris-dropdown .options');

		counter.count().then(function(count){
			if(count > 0) counter.get(idx).click().then(cb);
			else maker.finds('.spec-branch-ifansweris-optionlist .options').click().then(cb);
		});

	});

	When(/^the user selects the (\d+) answer for "([^"]*)" option in the (\d+) box$/, function(numberOfQuestion, typeOfQuestion, numberBox, cb) {
		maker.finds('.spec-branch-singleselection-options-dropdown').click();
		webpage.waits(2000);

		var el = maker.findsAll('.spec-question-container-' + numberBox + ' .spec-branch-singleselection-options-dropdown .options span');

		el.count().then(function(_count){
			// console.log('count', _count);
			if(_count == 1){
				maker.findsAll('.spec-question-container-' + numberBox + ' .spec-branch-singleselection-options-dropdown .options span').get(numberOfQuestion).click().then(cb);
			} else if(_count > 1) {
				maker.finds('.spec-question-container-' + numberBox + ' .spec-branch-singleselection-options-dropdown .options span').click().then(cb);
			} else throw new Error('There arent elements to click');
		});
	});

	When(/^the user clicks on add new box button on branchs$/, function(cb) {
		maker.finds('.spec_branchs_add_box_option').click().then(cb);
	});

	When(/^the user wirte an option to "([^"]*)" question$/, function(typeOfQuestion, cb) {
		var randomWord = null;

		if(typeOfQuestion == 'lookup' || typeOfQuestion == 'word_expression'){
			randomWord = rand.getWord();
		}else if(typeOfQuestion == 'email'){
			randomWord = rand.getEmail();
		}else if(typeOfQuestion == 'long_text'){
			randomWord = rand.getParagraph();
		}else if(typeOfQuestion == 'short_text'){
			randomWord = rand.getSentence();
		}else if(typeOfQuestion == 'address' || typeOfQuestion == 'us_address'){
			randomWord = rand.getAddress();
		}else if(typeOfQuestion == 'name'){
			randomWord = rand.getName();
		}else if(typeOfQuestion == 'phone'){
			randomWord = rand.getPhone();
		}

		element(by.css('spec-branchs-add-word')).sendKeys(randomWord).then(cb);
	});
};