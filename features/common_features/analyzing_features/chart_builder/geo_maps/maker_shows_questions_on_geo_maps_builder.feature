@chartBuilder @complete @analyzing @qrvey @chartBuilderGeoMaps

Feature: Building a Geo Map chart visualization with address questions

	As an user
	I want to visualize differents questions on a customized bar chart
	In order to clarify relations between them

	Scenario Outline: Buildiing a geo maps bubble chart
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "geo_chart" chart
			And the user enter "Chart geo map test" as bar chart name
			And the user selects "Bubble Map" from "map_type" dropdown
			And the user selects "<dataColumn>" from "category" dropdown
			And the user selects "<valueQuestionType>" from "value" dropdown
			And the user selects "<aggregateType>" from "aggregate" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart geo map test" as title
			And the map canvas should be displayed
		Examples:
			| typeOfQrvey	|	dataColumn			|	valueQuestionType	|	aggregateType		|
			|	forms		|	US Address Line 1	|	Numeric				|	Average				|
			|	survey		|	Address Country		|	Rating				|	Maximum				|
			|	survey		|	US Address City		|	Rating				|	Sum					|