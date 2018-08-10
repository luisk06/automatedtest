@publicResults @qrvey @complete @checklistPublicResults

Feature: Checklist public results

	I want to display the results of the qrvey I just took
	In order to see the public answers.

	Scenario: The user displays public results of a Checklist question with 25 answers
		Given that the user has a webform app with a checklist created with 25 of answers
		When the user access public results URL
		Then the analytiq chart for "checklist" question on detailed view should be displayed
			And the number answers should be exactly 25