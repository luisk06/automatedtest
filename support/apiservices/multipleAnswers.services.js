'use strict';

var MultipleAnswersService = function() {

	this.createAnswersForSurvey = function(user, num) {
		validField('survey', 'type Of Qrvey', 'createAnswersForSurvey');

		var j = num,
			options = {},
			appID = configer.get('AppID'),
			defer = protractor.promise.defer();

		var answerModel = findAllQuestionsAnswers('survey'),
			qrveyID = null,
			qstring = null,
			possibleAnswersMC = null,
			possibleAnswersYN = null,
			possibleAnswersDT = null,
			possibleAnswersWE = null,
			possibleAnswersLU = null,
			possibleAnswersIM = null,
			possibleAnswersID = null,
			possibleAnswersUAL2 = null,
			qrveyanswerid = null,
			qrveyanswerid2 = null,
			qrveyanswerid3 = null,
			qrveyanswerid4 = null,
			qrveyanswerid5 = null,
			qrveyanswerid6 = null,
			qrveyanswerid7 = null,
			qrveyanswerid8 = null,
			qrveyanswerid9 = null,
			qrveyanswerid10 = null,
			qrveyanswerid11 = null,
			qrveyanswerid12 = null,
			qrveyanswerid13 = null,
			qrveyanswerid14 = null,
			qrveyanswerid15 = null,
			qrveyanswerid16 = null,
			qrveyanswerid17 = null;

		qs.createAllQuestions(appID, user, 'survey').then(function(_data) {
			var possibleAnswersUSaddress = findDataModel('usaAddresses');

			qrveyID = configer.get('QrveyId');
			qstring = findHashInUrl(_data.url);
			possibleAnswersMC = ['A', 'B', 'C', 'D'];
			possibleAnswersYN = ['Yes', 'No'];
			possibleAnswersDT = ['01/01/2001', '02/02/2002', '03/03/2003', '04/04/2004', '05/05/2005', '01/02/2003', '06/05/2004', '10/11/2002', '12/02/2002'];
			possibleAnswersWE = ['Happy', 'Depressed', 'Angry', 'Beautiful', 'Nice'];
			possibleAnswersLU = ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'];
			possibleAnswersIM = ['https://automatedqastg.qrvey.com/app/images/icn/mini-timer@2x.png', 'https://automatedqastg.qrvey.com/app/images/icn/logo-qrvey.png'];
			possibleAnswersID = ['TW5S8BIKa0', 'TW5S8BIKa1'];
			possibleAnswersUAL2 = ['HOUSE 1', 'HOUSE 2', 'HOUSE 3'];
			qrveyanswerid = configer.get('QrveyAnswerId');
			qrveyanswerid2 = configer.get('QrveyAnswerId2');
			qrveyanswerid3 = configer.get('QrveyAnswerId3');
			qrveyanswerid4 = configer.get('QrveyAnswerId4');
			qrveyanswerid5 = configer.get('QrveyAnswerId5');
			qrveyanswerid6 = configer.get('QrveyAnswerId6');
			qrveyanswerid7 = configer.get('QrveyAnswerId7');
			qrveyanswerid8 = configer.get('QrveyAnswerId8');
			qrveyanswerid9 = configer.get('QrveyAnswerId9');
			qrveyanswerid10 = configer.get('QrveyAnswerId10');
			qrveyanswerid11 = configer.get('QrveyAnswerId11');
			qrveyanswerid12 = configer.get('QrveyAnswerId12');
			qrveyanswerid13 = configer.get('QrveyAnswerId13');
			qrveyanswerid14 = configer.get('QrveyAnswerId14');
			qrveyanswerid15 = configer.get('QrveyAnswerId15');
			qrveyanswerid16 = configer.get('QrveyAnswerId16');
			qrveyanswerid17 = configer.get('QrveyAnswerId17');

			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;
			answerModel.answers[0].id = qrveyanswerid;
			answerModel.answers[1].id = qrveyanswerid2;
			answerModel.answers[2].id = qrveyanswerid3;
			answerModel.answers[3].id = qrveyanswerid4;
			answerModel.answers[4].id = qrveyanswerid5;
			answerModel.answers[5].id = qrveyanswerid6;
			answerModel.answers[6].id = qrveyanswerid7;
			answerModel.answers[7].id = qrveyanswerid8;
			answerModel.answers[8].id = qrveyanswerid9;
			answerModel.answers[9].id = qrveyanswerid10;
			answerModel.answers[10].id = qrveyanswerid11;
			answerModel.answers[11].id = qrveyanswerid12;
			answerModel.answers[12].id = qrveyanswerid13;
			answerModel.answers[13].id = qrveyanswerid14;
			answerModel.answers[14].id = qrveyanswerid15;
			answerModel.answers[15].id = qrveyanswerid16;
			answerModel.answers[16].id = qrveyanswerid17;

			dos.cycle(function(cb){
				return cb(null, j >= 0);
			}, function(next) {

				// for (i = 0; i < num; i++) {
				answerModel.answers[0].data = [];
				answerModel.answers[1].data = [];
				answerModel.answers[2].data = [];
				answerModel.answers[3].data = [];
				answerModel.answers[4].data = [];
				answerModel.answers[5].data = [];
				answerModel.answers[6].data = [];
				answerModel.answers[7].data = [];
				answerModel.answers[8].data = [];
				answerModel.answers[9].data = [];
				answerModel.answers[10].data = [];
				answerModel.answers[11].data = [];
				answerModel.answers[11].data_ansid = [];
				answerModel.answers[12].name = [];
				answerModel.answers[13].data = [];
				answerModel.answers[14].data = [];
				answerModel.answers[15].address = [];
				answerModel.answers[16].address = [];

				answerModel.answers[0].data.push(rand.getOne(possibleAnswersMC));//Multiple choice
				answerModel.answers[1].data.push(rand.getNumber({ float: false, min: 1, max: 5 }));//Rating
				answerModel.answers[2].data.push(rand.getSentence(9));//Short Text
				answerModel.answers[3].data.push(rand.getParagraph());//Long text
				answerModel.answers[4].data.push(rand.getOne(possibleAnswersYN));//Yes - No
				answerModel.answers[5].data = rand.reSort(possibleAnswersMC);//Ranking
				answerModel.answers[6].data.push(rand.getOne(possibleAnswersDT));//Date
				answerModel.answers[7].data.push(rand.getNumber({ float: false, min: 1, max: 3 }).toString());//Slider Bar
				answerModel.answers[8].data = rand.getSet(possibleAnswersWE, 3);//Expression
				answerModel.answers[9].data.push(rand.getNumber({ float: false, min: 1, max: 60 }));//Numeric
				answerModel.answers[10].data.push(rand.getOne(possibleAnswersLU));//Look Up
				var img = (rand.getBoolean()) ? 0 : 1;
				answerModel.answers[11].data.push(possibleAnswersIM[img]);//Image
				answerModel.answers[11].data_ansid.push(possibleAnswersID[img]);//Image
				answerModel.answers[12].name = {first_name: rand.getName(), last_name: rand.getLastname()};//Name
				answerModel.answers[13].data.push(rand.getEmail());//Email
				answerModel.answers[14].data.push('+' + rand.getPhone('').replace(/[()]/g, ''));//Phone
				var selectedAdress = possibleAnswersUSaddress[rand.getNumber({ float: false, min: 0, max: 233 })];
				answerModel.answers[15].address = {
					address_line_1: selectedAdress.address,
					address_line_2: rand.getOne(possibleAnswersUAL2),
					city: selectedAdress.city,
					state: selectedAdress.state,
					stateName: abbrState(selectedAdress.state, 'name'),
					postal_code: selectedAdress.postal,
					country: 'USA'
				};//Us-Address
				answerModel.answers[16].address = {
					street_address: rand.getAddress(),
					city: rand.getCity(),
					state: rand.getState(),
					postal_code: rand.getZip(),
					country: rand.getCountry()
				};//Address


				logger.info('responses 1', answerModel.answers[0].data);
				logger.info('responses 2', answerModel.answers[1].data);
				logger.info('responses 3', answerModel.answers[2].data);
				logger.info('responses 4', answerModel.answers[3].data);
				logger.info('responses 5', answerModel.answers[4].data);
				logger.info('responses 6', answerModel.answers[5].data);
				logger.info('responses 7', answerModel.answers[6].data);
				logger.info('responses 8', answerModel.answers[7].data);
				logger.info('responses 9', answerModel.answers[8].data);
				logger.info('responses 10', answerModel.answers[9].data);
				logger.info('responses 11', answerModel.answers[10].data);
				logger.info('responses 12', answerModel.answers[11].data);
				logger.info('responses 13', answerModel.answers[12].name);
				logger.info('responses 14', answerModel.answers[13].data);
				logger.info('responses 15', answerModel.answers[14].data);
				logger.info('responses 16', answerModel.answers[15].address);
				logger.info('responses 17', answerModel.answers[16].address);


				logger.info('all questions answer model', answerModel);

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				rs.sendInfo(options, function(_resp) {

					logger.info('answer:', _resp);
					logger.info('counter:', j);
					logger.info('num:', num);

					j--;

					next();

				});
			}, function(){
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.createAnswersForForms = function(user, num) {
		validField('survey', 'type Of Qrvey', 'createAnswersForForms');

		var j = num,
			options = {},
			appID = configer.get('AppID'),
			defer = protractor.promise.defer();

		var answerModel = findAllQuestionsAnswers('forms'),
			qrveyID = null,
			qstring = null,
			possibleAnswersMC = null,
			possibleAnswersYN = null,
			possibleAnswersDT = null,
			possibleAnswersLU = null,
			possibleAnswersUAL2 = null,
			qrveyanswerid = null,
			qrveyanswerid2 = null,
			qrveyanswerid3 = null,
			qrveyanswerid4 = null,
			qrveyanswerid5 = null,
			qrveyanswerid6 = null,
			qrveyanswerid7 = null,
			qrveyanswerid8 = null,
			qrveyanswerid9 = null,
			qrveyanswerid10 = null,
			qrveyanswerid11 = null;

		qs.createAllQuestions(appID, user, 'forms').then(function(_data) {
			var possibleAnswersUSaddress = findDataModel('usaAddresses');

			qrveyID = configer.get('QrveyId');
			qstring = findHashInUrl(_data.url);
			possibleAnswersMC = ['A', 'B', 'C', 'D'];
			possibleAnswersYN = ['Yes', 'No'];
			possibleAnswersDT = ['01/01/2001', '02/02/2002', '03/03/2003', '04/04/2004', '05/05/2005', '01/02/2003', '06/05/2004', '10/11/2002', '12/02/2002'];
			possibleAnswersLU = ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'];
			possibleAnswersUAL2 = ['HOUSE 1', 'HOUSE 2', 'HOUSE 3'];
			qrveyanswerid = configer.get('QrveyAnswerId');
			qrveyanswerid2 = configer.get('QrveyAnswerId2');
			qrveyanswerid3 = configer.get('QrveyAnswerId3');
			qrveyanswerid4 = configer.get('QrveyAnswerId4');
			qrveyanswerid5 = configer.get('QrveyAnswerId5');
			qrveyanswerid6 = configer.get('QrveyAnswerId6');
			qrveyanswerid7 = configer.get('QrveyAnswerId7');
			qrveyanswerid8 = configer.get('QrveyAnswerId8');
			qrveyanswerid9 = configer.get('QrveyAnswerId9');
			qrveyanswerid10 = configer.get('QrveyAnswerId10');
			qrveyanswerid11 = configer.get('QrveyAnswerId11');

			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;
			answerModel.answers[0].id = qrveyanswerid;
			answerModel.answers[1].id = qrveyanswerid2;
			answerModel.answers[2].id = qrveyanswerid3;
			answerModel.answers[3].id = qrveyanswerid4;
			answerModel.answers[4].id = qrveyanswerid5;
			answerModel.answers[5].id = qrveyanswerid6;
			answerModel.answers[6].id = qrveyanswerid7;
			answerModel.answers[7].id = qrveyanswerid8;
			answerModel.answers[8].id = qrveyanswerid9;
			answerModel.answers[9].id = qrveyanswerid10;
			answerModel.answers[10].id = qrveyanswerid11;

			dos.cycle(function(cb){
				return cb(null, j >= 0);
			}, function(next) {

				// for (i = 0; i < num; i++) {
				answerModel.answers[0].data = [];
				answerModel.answers[1].data = [];
				answerModel.answers[2].data = [];
				answerModel.answers[3].data = [];
				answerModel.answers[4].data = [];
				answerModel.answers[5].data = [];
				answerModel.answers[6].data = [];
				answerModel.answers[7].name = [];
				answerModel.answers[8].data = [];
				answerModel.answers[9].data = [];
				answerModel.answers[10].address = [];
				answerModel.answers[11].address = [];

				answerModel.answers[0].data.push(rand.getOne(possibleAnswersMC));//Multiple choice
				answerModel.answers[1].data.push(rand.getSentence(9));//Short Text
				answerModel.answers[2].data.push(rand.getParagraph());//Long text
				answerModel.answers[3].data.push(rand.getOne(possibleAnswersYN));//Yes - No
				answerModel.answers[4].data.push(rand.getOne(possibleAnswersDT));//Date
				answerModel.answers[5].data.push(rand.getNumber({ float: false, min: 1, max: 60 }));//Numeric
				answerModel.answers[6].data.push(rand.getOne(possibleAnswersLU));//Look Up
				answerModel.answers[7].name = {first_name: rand.getName(), last_name: rand.getLastname()};//Name
				answerModel.answers[8].data.push(rand.getEmail());//Email
				answerModel.answers[9].data.push('+' + rand.getPhone('').replace(/[()]/g, ''));//Phone
				var selectedAdress = possibleAnswersUSaddress[rand.getNumber({ float: false, min: 0, max: 233 })];
				answerModel.answers[10].address = {
					address_line_1: selectedAdress.address,
					address_line_2: rand.getOne(possibleAnswersUAL2),
					city: selectedAdress.city,
					state: selectedAdress.state,
					stateName: abbrState(selectedAdress.state, 'name'),
					postal_code: selectedAdress.postal,
					country: 'USA'
				};//Us-Address
				answerModel.answers[11].address = {
					street_address: rand.getAddress(),
					city: rand.getCity(),
					state: rand.getState(),
					postal_code: rand.getZip(),
					country: rand.getCountry()
				};//Address


				logger.info('responses 1', answerModel.answers[0].data);
				logger.info('responses 2', answerModel.answers[1].data);
				logger.info('responses 3', answerModel.answers[2].data);
				logger.info('responses 4', answerModel.answers[3].data);
				logger.info('responses 5', answerModel.answers[4].data);
				logger.info('responses 6', answerModel.answers[5].data);
				logger.info('responses 7', answerModel.answers[6].data);
				logger.info('responses 8', answerModel.answers[7].name);
				logger.info('responses 9', answerModel.answers[8].data);
				logger.info('responses 10', answerModel.answers[9].data);
				logger.info('responses 11', answerModel.answers[10].address);
				logger.info('responses 12', answerModel.answers[11].address);


				logger.info('all questions answer model', answerModel);

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				rs.sendInfo(options, function(_resp) {

					logger.info('answer:', _resp);
					logger.info('counter:', j);
					logger.info('num:', num);

					j--;

					next();

				});
			}, function(){
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.createAnswersForQuiz = function(user, num) {
		validField('quiz', 'type Of Qrvey', 'createAnswersForQuiz');

		var j = num,
			options = {},
			appID = configer.get('AppID'),
			defer = protractor.promise.defer();

		var answerModel = findAllQuestionsAnswers('quiz'),
			qrveyID = null,
			qstring = null,
			possibleAnswersMC = null,
			possibleAnswersYN = null,
			possibleAnswersDT = null,
			possibleAnswersIM = null,
			possibleAnswersID = null,
			qrveyanswerid = null,
			qrveyanswerid2 = null,
			qrveyanswerid3 = null,
			qrveyanswerid4 = null,
			qrveyanswerid5 = null;

		qs.createAllQuestions(appID, user, 'quiz').then(function(_data) {
			qrveyID = configer.get('QrveyId');
			qstring = findHashInUrl(_data.url);
			possibleAnswersMC = ['A', 'B', 'C', 'D'];
			possibleAnswersYN = ['Yes', 'No'];
			possibleAnswersDT = ['01/01/2001', '02/02/2002', '03/03/2003', '04/04/2004', '05/05/2005', '01/02/2003', '06/05/2004', '10/11/2002', '12/02/2002'];
			possibleAnswersIM = ['https://automatedqastg.qrvey.com/app/images/icn/mini-timer@2x.png', 'https://automatedqastg.qrvey.com/app/images/icn/logo-qrvey.png'];
			possibleAnswersID = ['6MDGPPI3a0', '6MDGPPI3a1'];
			qrveyanswerid = configer.get('QrveyAnswerId');
			qrveyanswerid2 = configer.get('QrveyAnswerId2');
			qrveyanswerid3 = configer.get('QrveyAnswerId3');
			qrveyanswerid4 = configer.get('QrveyAnswerId4');
			qrveyanswerid5 = configer.get('QrveyAnswerId5');

			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;
			answerModel.answers[0].id = qrveyanswerid;
			answerModel.answers[1].id = qrveyanswerid2;
			answerModel.answers[2].id = qrveyanswerid3;
			answerModel.answers[3].id = qrveyanswerid4;
			answerModel.answers[4].id = qrveyanswerid5;

			dos.cycle(function(cb){
				return cb(null, j >= 0);
			}, function(next) {

				// for (i = 0; i < num; i++) {
				answerModel.answers[0].data = [];
				answerModel.answers[1].data = [];
				answerModel.answers[2].data = [];
				answerModel.answers[2].data_ansid = [];
				answerModel.answers[3].data = [];
				answerModel.answers[4].data = [];

				answerModel.answers[0].data.push(rand.getOne(possibleAnswersMC));//Multiple choice
				answerModel.answers[1].data.push(rand.getOne(possibleAnswersYN));//Yes - No
				var img = (rand.getBoolean()) ? 0 : 1;
				answerModel.answers[2].data.push(possibleAnswersIM[img]);//Image
				answerModel.answers[2].data_ansid.push(possibleAnswersID[img]);//Image
				answerModel.answers[3].data.push(rand.getOne(possibleAnswersDT));//Date
				answerModel.answers[4].data.push(rand.getNumber({ float: false, min: 1, max: 60 }));//Numeric

				answerModel.profile.email = rand.getEmail();


				logger.info('responses 1', answerModel.answers[0].data);
				logger.info('responses 2', answerModel.answers[1].data);
				logger.info('responses 3', answerModel.answers[2].data);
				logger.info('responses 4', answerModel.answers[3].data);
				logger.info('responses 5', answerModel.answers[4].data);


				logger.info('all questions answer model', answerModel);

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				rs.sendInfo(options, function(_resp) {

					logger.info('answer:', _resp);
					logger.info('counter:', j);
					logger.info('num:', num);

					j--;

					next();

				});
			}, function(){
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};
};

module.exports = new MultipleAnswersService();
