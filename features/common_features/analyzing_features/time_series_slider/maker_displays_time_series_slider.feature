@analyticQ @qrvey @timeSeriesSlider @analyzing @complete

Feature: The user turns on slider on time series on different types of qrveys and questions

	As an user
	I want to turns on slider on time series on different types of qrveys and questions
	In order to see answers behavior through time

	Scenario Outline: The user turns on slider on time series on a <typeOfQrvey> with a <typeOfQuestion> question
		Given that there is a webform app with a "<typeOfQrvey>" with a "<typeOfQuestion>" question that has 30 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user turn "on" the "time_series" on "<typeOfQrvey>"
			And user turn "on" the "slider" on "<typeOfQrvey>"
		Then  the slider bar should be displayed

    Examples:
		| typeOfQrvey | typeOfQuestion             |
		| survey      | multiple choice            |
		| survey      | expression                 |
		| survey      | expression_with_categories |
		| survey      | numeric                    |
		| survey      | rating                     |
		| survey      | short text                 |
		| survey      | long text                  |
		| survey      | yes-no                     |
		| survey      | ranking                    |
		| survey      | slidebar                   |
		| survey      | image         			   |