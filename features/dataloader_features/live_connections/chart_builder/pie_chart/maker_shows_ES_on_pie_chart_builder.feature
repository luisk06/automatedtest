@chartBuilderES @complete @analyzingES @chartBuilderESPieChart

Feature:  Creating a Pie Chart on a Elasticsearch live connection.

	As an user
	I want to visualize differents types data from my live connection on a customized pie chart
	In order to clarify relations between them

	Background: 
		Given the user has an app
			And that there is a ES connection
			And the user has login
			And the user opens the just created app
			And the user opens the "data_upload" board
			And the user clicks on the record button

	Scenario Outline: The user build a pie chart using a Text and Numeric data types on Elasticsearch, using <aggregateType> as aggregate
		When the user clicks on add chart
			And the user selects "pie_chart" chart
			And the user enter "Chart pie test" as bar chart name
			And the user selects "<categoryQuestionName>" from "category" dropdown
			And the user selects "<valueQuestionName>" from "value" dropdown
			And the user selects "<aggregateType>" from "aggregate" dropdown
			And the user move to visualization tab
			And the user open global settings layer
			And the user clicks on Yes for max data points
			And the user inputs 3 max data points
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart pie test" as title
			And the pie chart grpah must not contain empty spaces between sections
			And the numbers of portions should be 3

		Examples:
			| categoryQuestionName 		| valueQuestionName 	| aggregateType |
			| AirlineID            		| ArrDelay         		| Count     	|
			| AirlineID            		| ArrDelay         		| Minimum     	|
			| AirlineID            		| ArrDelay         		| Average     	|
			| AirlineID            		| ArrDelay         		| Maximum     	|
			| AirlineID            		| ArrDelay         		| Sum	     	|