@making @todo @template @templateBranches @survey @surveyMaking

Feature: The user creates a question with branches from template in survey

	As an user
	I want to create a qrvey with branches from a template
	In order to save some time and have questions already created

	@noRunOutLocal
	Scenario Outline: The user create survey with branches using the <templateName> template and with standard plan
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "<typeOfQrvey>"
		When the user clicks on See Templates
			And the user clicks on a "<templateName>" template category
			And the user selects the <position> position template
			And the user clicks on Select Template for qrvey with branches
			And the user activate the qrvey
		Then the qrvey must be activated

		Examples:
			| typeOfQrvey	| templateName	| position |
			| survey		| customers		| 2		   |
			| survey		| customers		| 3		   |
			| survey		| colleagues	| 1		   |
			| survey		| friends		| 1		   |
			| survey		| event			| 1		   |
			| survey		| students		| 1		   |