@analyzing @complete @checklist @analyzingChecklist @analyzeChecklistResults

Feature: Displaying checklist results different types of view

	As an user
	I want to see the results of a checklist on a different types of view
	In order to analyze them and take decisions

	@smokeTest1
	Scenario Outline: The user displays checklist on <typeOfView> view
		Given that the user has a webform app with a checklist created with <numAnswers> of answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user selects "<typeOfView>" from dropdown
		Then the total of "<typeOfView>" answers should be <numAnswers>
			And the "<typeOfView>" option on dropdown should contain a check

		Examples:
			| typeOfView  | numAnswers |
			| single      | 6          |
			| multi       | 8          |
			| individual  | 10         |