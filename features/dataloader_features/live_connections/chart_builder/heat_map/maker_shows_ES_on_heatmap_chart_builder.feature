@chartBuilderES @complete @analyzingES @chartBuilderESHeatMap @dataloader

Feature:  Creating a Heatmap Chart on a Elasticsearch live connection.

	As an user
	I want to visualize differents types data from my live connection on a customized heatmap chart
	In order to clarify relations between them

	Background: 
		Given the user has an app
			And that there is a ES connection
			And the user has login
			And the user opens the just created app
			And the user opens the "data_upload" board
			And the user clicks on the record button

	Scenario Outline: The user build a heatmap chart using a Text and Numeric data types on Elasticsearch, using <aggregateType> as aggregate
		When the user clicks on add chart
			And the user selects "heatmap_chart" chart
			And the user enter "Chart heatmap test" as bar chart name
			And the user select8s "<categoryQuestionName>" from "category" dropdown
			And the user selects "<valueQuestionName>" from "value" dropdown
			And the user selects "<aggregateType>" from "aggregate" dropdown
			And the user move to visualization tab
			And the user open global settings layer
			And the user clicks on Yes for max data points
			And the user inputs 3 max data points
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart heatmap test" as title
			And the "y" axis label should be "<categoryQuestionName>"
			And the "x" axis label should be "<valueQuestionName>"
			And the number of cells shoulb be 3
			And the cells on heat map table should not be empty

		Examples:
			| categoryQuestionName 		| valueQuestionName 	| aggregateType |
			| AirlineID            		| ArrDelay         		| Count     	|
			| AirlineID            		| ArrDelay         		| Minimum     	|
			| AirlineID            		| ArrDelay         		| Average     	|
			| AirlineID            		| ArrDelay         		| Maximum     	|
			| AirlineID            		| ArrDelay         		| Sum	     	|

			