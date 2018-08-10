@analyticQ @analyzing @survey @surveyAnalyzing @analyzingSurveyUsAddress @complete

Feature: Excluding answres on us address question results in survey individual records

	As an user
	I want see the results of an us address question
	In order to analyse them

	Scenario: The user excludes answers from a survey that has a us address question with 34 answers
		Given that there is a webform app with a "survey" with a "us_address" question that has 34 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "single" from dropdown on "survey"
			And the user clicks on show more on detailed view
			And the user excludes 6 answers from individual records list on address questions
			And the user moves to individual records "Excluded" tab
			And the user opens the filter side bar
		Then the number of excluded records should be 6
			And the number answers should be more than 0