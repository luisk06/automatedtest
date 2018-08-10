@analyticQ @qrvey @sentimentAnalysis @complete

Feature: The user turns on slider on time series on different types of qrveys and questions

	As an user
	I want to turns on slider on time series on different types of qrveys and questions
	In order to see answers behavior through time

	Scenario Outline: The user analyze the sentiment chart in summary view for a <typeOfQrvey> with a Short text question
		Given that there is a webform app with a "<typeOfQrvey>" with a Short text question that has <numAnswers> answers for sentiment analysis
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user selects the sentiment option in the dropdown
		Then must have more than 0 negative answers

		Examples:
			| typeOfQrvey    | numAnswers |
			| forms          | 5          |

	Scenario Outline: The user analyze the sentiment chart in summary view for a <typeOfQrvey> with a Short text question
		Given that there is a webform app with a "<typeOfQrvey>" with a Short text question that has <numAnswers> answers for sentiment analysis
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user selects the sentiment option in the dropdown
		Then must have more than 0 negative answers

		Examples:
			| typeOfQrvey | numAnswers |
			| survey      | 5          |

	Scenario Outline: The user analyze the sentiment chart in summary view for a <typeOfQrvey> with a Short text question
		Given that there is a webform app with a "<typeOfQrvey>" with a Short text question that has <numAnswers> answers for sentiment analysis
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user selects the sentiment option in the dropdown
		Then must have more than 0 negative answers

		Examples:
			| typeOfQrvey  | numAnswers |
			| survey      | 5          |