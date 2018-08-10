@analyticQ @qrvey @trendAnalysis @trendAnalysisShortText @analyzing @complete

Feature: The user activates trend analysis on a short text question

	Scenario Outline: The user tries to see trend analysis with slider turned on a <textOfQrvey> with a short text question
		Given that there is a webform app with a <typeOfQrvey> with a "short text sentiment" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user turn "on" the "time_series" on <typeOfQrvey>
			And user turn "on" the "slider" on <typeOfQrvey>
			And user selects "multi" from dropdown on <typeOfQrvey>
		Then the trend analysis icon number 1 should be "disabled" on <typeOfQrvey>

		Examples:
			| textOfQrvey   | typeOfQrvey          | numAnswers |
			| Survey        | "survey"             | 25         |

	Scenario Outline: The user displays trend analysis for short text questions on a <textOfQrvey>
		Given that there is a webform app with a <typeOfQrvey> with a "short text sentiment" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "multi" from dropdown on <typeOfQrvey>
			And user moves to "sentiment" tab
			And the user opens the filter side bar
			And user store "short-text" filters values
			And user gets total of answers
			And user turn "on" the "time_series" on <typeOfQrvey>
			And the user clicks on the "trend-analysis-active" number 1 on <typeOfQrvey>
			And user store "short-text" trend values
		Then the total of answers should match total on every "short-text" tooltip
			And the total of trend bars should be total of "short-text" options

		Examples:
			| textOfQrvey   | typeOfQrvey          | numAnswers |
			| Survey        | "survey"             | 25         |