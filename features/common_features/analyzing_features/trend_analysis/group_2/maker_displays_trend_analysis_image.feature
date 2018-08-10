@analyticQ @qrvey @trendAnalysis @trendAnalysisImage @analyzing @complete

Feature: The user activates trend analysis on a image question

	As an user
	I want to turn activate trend analysis on a image question
	In order to see answers behavior through time

	Scenario Outline: The user tries to see trend analysis with slider turned on a <typeOfQrvey> with a imaage question
		Given that there is a webform app with a "<typeOfQrvey>" with a "image" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user turn "on" the "time_series" on "<typeOfQrvey>"
			And user turn "on" the "slider" on "<typeOfQrvey>"
			And user selects "multi" from dropdown on "<typeOfQrvey>"
		Then  the trend analysis icon number 1 should be "disabled" on "<typeOfQrvey>"

		Examples:
			| typeOfQrvey	| numAnswers |
			| survey        | 25         |

	Scenario Outline: The user displays trend analysis for image questions on a <typeOfQrvey>
		Given that there is a webform app with a "<typeOfQrvey>" with a "image" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "multi" from dropdown on "<typeOfQrvey>"
			And the user clicks on the filter button
			And user store "image" filters values
			And the user close the AN-modal
			And user store total of answers
			And user turn "on" the "time_series" on "<typeOfQrvey>"
			And the user clicks on the "trend-analysis-active" number 1 on "<typeOfQrvey>"
			And user store "image" trend values
		Then the total of answers should match total on every "image" tooltip
			And the total of trend bars should be total of "image" options
			And the trend values and filters values must be same

		Examples:
			| typeOfQrvey  | numAnswers |
			| survey       | 25         |