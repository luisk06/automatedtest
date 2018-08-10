@chartBuilderES @complete @analyzingES @chartBuilderESLineChart

Feature:  Creating a Line Chart on a Elasticsearch live connection.

	As an user
	I want to visualize differents types data from my live connection on a customized line chart
	In order to clarify relations between them

	Background: 
		Given the user has an app
			And that there is a ES connection
			And the user has login
			And the user opens the just created app
			And the user opens the "data_upload" board
			And the user clicks on the record button

    Scenario Outline: The user creates a trend line based on a Line chart
            When the user clicks on add chart
                And the user selects "line_chart" chart
                And the user enter "Chart trend line test" as bar chart name
                And the user selects "<categoryQuestionName>" from "category" dropdown
                And the user selects "<valueQuestionName>" from "value" dropdown
                And the user selects "<aggregateType>" from "aggregate" dropdown
                And the user clicks on chart options tab
                And the user adds a new layer
                And the user opens the first combo panel
                And the user picks "Trend Line" from "chart-options" layer dropdown
                And the user picks "Standard Linear Regression" from "trendline-trendtype" dropdown
                And the user move to visualization tab
                And the user open global settings layer
                And the user clicks on Yes for max data points
                And the user inputs 3 max data points
                And the user clicks on save chart button
            Then a custom panel should be displayed with "Chart trend line test" as title
                And the y axis label number 1 on combo should be "<valueQuestionName>"
                And the "x" axis label should be "<categoryQuestionName>"
                And the number of "line" groups should be 1
                And a trend line should be displayed
                And the trend line must have a tooltip in each dot
                And the numbers of dots should be 3
        
        Examples:
			| categoryQuestionName 		| valueQuestionName 	| aggregateType |
			| AirlineID            		| ArrDelay         		| Count     	|
			| AirlineID            		| ArrDelay         		| Minimum     	|
			| AirlineID            		| ArrDelay         		| Average     	|          