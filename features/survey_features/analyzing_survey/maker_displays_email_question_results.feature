@analyticQ @analyzing @survey @analyzingSurveyEmail @complete @surveyAnalyzing

Feature: Excluding answres on email question results in survey individual records

	As an user
	I want see the results of an email question
	In order to analyse them

	Scenario: The user excludes answers from a survey that has a email question with 34 answers
		Given that there is a webform app with a "survey" with a "email" question that has 34 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "single" from dropdown on "survey"
			And the user clicks on show more on detailed view
			And the user excludes 6 answers from individual records list
			And the user moves to individual records "Excluded" tab
			And the user opens the filter side bar
		Then the number of excluded records should be 6
			And the number answers should be more than 0