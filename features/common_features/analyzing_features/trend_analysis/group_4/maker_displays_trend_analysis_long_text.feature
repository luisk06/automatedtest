@analyticQ @qrvey @trendAnalysis @trendAnalysisLongText @analyzing @complete

Feature: The user activates trend analysis on a long text question

	As an user
	I want to turn activate trend analysis on a long text question
	In order to see answers behavior through time

	Scenario Outline: The user tries to see trend analysis with slider turned on a <textOfQrvey> with a long text question
		Given that there is a webform app with a <typeOfQrvey> with a "long text" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user turn "on" the "time_series" on <typeOfQrvey>
			And user turn "on" the "slider" on <typeOfQrvey>
			And user selects "multi" from dropdown on <typeOfQrvey>
		Then  the trend analysis icon number 1 should be "disabled" on <typeOfQrvey>

		Examples:
			| textOfQrvey   | typeOfQrvey          | numAnswers |
			| Survey        | "survey"             | 25         |

	Scenario Outline: The user displays trend analysis for long text questions on a <textOfQrvey>
		Given that there is a webform app with a <typeOfQrvey> with a "long text" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "multi" from dropdown on <typeOfQrvey>
			And the user opens the filter side bar
			And user moves to "sentiment" tab
			And user store "long-text" filters values
			And user gets total of answers
			And user turn "on" the "time_series" on <typeOfQrvey>
			And the user clicks on the "trend-analysis-active" number 1 on <typeOfQrvey>
			And user store "long-text" trend values
		Then the total of answers should match total on every "long-text" tooltip
			And the total of trend bars should be total of "long-text" options

		Examples:
			| textOfQrvey   | typeOfQrvey          | numAnswers |
			| Survey        | "survey"             | 25         |