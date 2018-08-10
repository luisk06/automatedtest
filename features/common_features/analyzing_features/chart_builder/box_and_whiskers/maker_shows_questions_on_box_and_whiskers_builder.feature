@chartBuilder @complete @analyzing @qrvey @chartBuilderBoxAndWhiskers

Feature: Building a Box and whiskers chart visualization with differents questions types

	As an user
	I want to visualize differents questions on a customized bar chart
	In order to clarify relations between them

	Scenario Outline: Buildiing a box and whiskers chart with pivot
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "boxwhisker_chart" chart
			And the user enter "Chart box and whiskers test" as bar chart name
			And the user selects "<valueQuestionType>" from "value" dropdown
			And the user selects "<aggregateType>" from "aggregate" dropdown
			And the user selects "<distributionQuestionType>" from "distribution" dropdown
			And the user selects "<pivotQuestionType>" from "pivot" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart box and whiskers test" as title
			And the "y" axis label should be "<valueQuestionType>"
			And the "x" axis label should be "<pivotQuestionType>"
			And the number of boxes displayed should be <numberOfBoxes>
			And A tooltip should appear in every box

		Examples:
			| typeOfQrvey	|	distributionQuestionType	|	valueQuestionType	|	aggregateType		|	numberOfBoxes	|	pivotQuestionType 	|
			|	forms		|	Multiple Choice				|	Numeric				|	Average				|	2				|	Yes-No				|
			|	survey		|	Rating						|	Numeric				|	Maximum				|	4				|	Multiple Choice		|
			|	quiz		|	Yes-No						|	Date				|	Count				|	4				|	Multiple Choice		|