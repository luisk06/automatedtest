@chartBuilderES @complete @analyzingES @chartBuilderESBarChart

Feature:  Creating a Bar Chart on a Elasticsearch live connection.

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

    Scenario Outline: The user creates a Multi series based on a Bar chart
            When the user clicks on add chart
                And the user selects "bar_chart" chart
                And the user enter "Chart multi series bar test" as bar chart name
                And the user selects "<categoryQuestionName>" from "category" dropdown
                And the user selects "<valueQuestionName>" from "value" dropdown
                And the user selects "<aggregateType>" from "aggregate" dropdown
                And the user clicks on chart options tab
                And the user adds a new layer
                And the user opens the first combo panel
                And the user picks "Multi-Series" from "chart-options" layer dropdown
			    And the user picks "<seriesQuestionName>" from "series" dropdown
                And the user clicks on "yes" in max series points
                And the user inputs 3 on the max series input
                And the user move to visualization tab
                And the user open global settings layer
                And the user clicks on Yes for max data points
                And the user inputs 3 max data points
                And the user clicks on save chart button
            Then a custom panel should be displayed with "Chart multi series bar test" as title
                And the y axis label number 1 on combo should be "<valueQuestionName>"
                And the "x" axis label should be "<categoryQuestionName>"
                And the number of "bar" groups should be 3
                And the numbers of bars should be 9
                And a multi series tooltip should appear on each bar
        
        Examples:
			| categoryQuestionName 		| valueQuestionName 	| seriesQuestionName    |   aggregateType   |
            # | AIRLINE           		| AIRLINE_DELAY    		|  AIR_TIME             |      Count     	|
			| AirlineID            		| ArrDelay         		| ActualElapsedTime     |      Count     	|
			# | AirlineID            		| ArrDelay         		| ActualElapsedTime     |     Minimum     	|
			| AirlineID            		| ArrDelay         		| ActualElapsedTime     |    Average     	|       