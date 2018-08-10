@analyticQ @qrvey @trendAnalysis @trendAnalysisRating @analyzing @complete

Feature: The user activates trend analysis on a rating question

	As an user
	I want to turn activate trend analysis on a rating question
	In order to see answers behavior through time

	Scenario Outline: The user tries to see trend analysis with slider turned on a <typeOfQrvey> with a rating question
		Given that there is a webform app with a "<typeOfQrvey>" with a "rating" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user turn "on" the "time_series" on "<typeOfQrvey>"
			And user turn "on" the "rating" on "<typeOfQrvey>"
			And user selects "multi" from dropdown on "<typeOfQrvey>"
		Then  the trend analysis icon number 1 should be "disabled" on "<typeOfQrvey>"

		Examples:
			| typeOfQrvey        | numAnswers |
			| survey             | 25         |

	Scenario Outline: The user displays trend analysis for rating questions on a <typeOfQrvey>
		Given that there is a webform app with a "<typeOfQrvey>" with a "rating" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "multi" from dropdown on "<typeOfQrvey>"
			And user store "rating" average value
			And user store total of answers
			And user turn "on" the "time_series" on "<typeOfQrvey>"
			And the user clicks on the "trend-analysis-active" number 1 on "<typeOfQrvey>"
		Then the total of answers should match total on every "rating" tooltip
			And the average should be the same on every "rating" dot

		Examples:
			| typeOfQrvey        | numAnswers |
			| survey             | 25         |