@analyticQ @qrvey @trendAnalysis @trendAnalysisDate @analyzing @complete

Feature: The user activates trend analysis on a date question

	As an user
	I want to turn activate trend analysis on a date question
	In order to see answers behavior through time

	Scenario Outline: The user tries to see trend analysis with slider turned on a <textOfQrvey> with a date question
		Given that there is a webform app with a <typeOfQrvey> with a date question that has <numAnswers> answers with the following dates:
				| dates    |
				| 01/01/01 |
				| 02/02/02 |
				| 03/03/03 |
				| 04/04/04 |
				| 05/05/05 |
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