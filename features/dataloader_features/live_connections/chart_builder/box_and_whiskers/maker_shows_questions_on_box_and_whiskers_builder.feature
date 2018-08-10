@chartBuilderES @complete @analyzingES @chartBuilderESBoxAndWhiskers

Feature:  Creating a Box and Whiskers chart on a Elasticsearch live connection.

	As an user
	I want to visualize differents types data from my live connection on a customized box and whiskers chart
	In order to clarify relations between them

	Background: 
		Given the user has an app
			And that there is a ES connection
			And the user has login
			And the user opens the just created app
			And the user opens the "data_upload" board
			And the user clicks on the record button

	Scenario Outline: The user build a box and whiskers chart using a Text and Numeric data types on Elasticsearch, using <aggregateType> as aggregate
		When the user clicks on add chart
			And the user selects "boxwhisker_chart" chart
			And the user enter "Chart box and whiskers test" as bar chart name
			And the user selects "<valueQuestionName>" from "value" dropdown
			And the user selects "<aggregateType>" from "aggregate" dropdown
			And the user selects "<distributionQuestionName>" from "distribution" dropdown
			And the user selects "<pivotQuestionType>" from "pivot" dropdown
			And the user move to visualization tab
			And the user open global settings layer
			And the user clicks on Yes for max data points
			And the user inputs 3 max data points
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart box and whiskers test" as title
			And the "y" axis label should be "<valueQuestionName>"
			And the "x" axis label should be "<pivotQuestionType>"
			And the number of boxes displayed should be 3
			And A tooltip should appear in every box

		Examples:
			|	distributionQuestionName	|	valueQuestionName	|	aggregateType		|	pivotQuestionType 	|
			|	AirlineID					|	ArrDelay			|	Average				|	DayOfWeek			|
			|	AirlineID					|	ArrDelay			|	Sum					|	DayOfWeek			|
			|	AirlineID					|	ArrDelay			|	Count				|	DayOfWeek			|
			|	AirlineID					|	ArrDelay			|	Average				|	DayOfWeek			|