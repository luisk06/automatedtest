@todo @qrvey @making @wordpress @plugin @embedQrveys

Feature: The user download wordpress plugin

	As an user
	I want to download the wordpress plugin
	in order to embedd the a qrvey in a wordpress site

	Scenario Outline: The user download wordpress plugin for <typeOfQrvey>
		Given the user has "basic" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "<typeOfQrvey>"
			And that the user create a question
		When the user clicks on publish tab
			And clicks on Activate button in "<typeOfQrvey>"
			And the user open the wordpress code section
			And the user click on download plugin
		Then the "incontext" wordpress plugin download is succefull

		Examples:
			| textOfQrvey       | typeOfQrvey       |
			| incontextfeedback | incontextfeedback | @todo
			| progressive       | progressive       |