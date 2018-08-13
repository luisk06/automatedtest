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

    Scenario Outline: The user creates a Combo Chart based on a Bar chart and a Line Chart
            When the user clicks on add chart
                And the user selects "bar_chart" chart
                And the user enter "Chart combo bar test" as bar chart name
                And the user selects "<categoryQuestionName>" from "category" dropdown
                And the user selects "<valueQuestionName>" from "value" dropdown
                And the user selects "Sum" from "aggregate" dropdown
                And the user clicks on chart options tab
                And the user adds a new layer
                And the user opens the first combo panel
                And the user picks "Combo Chart" from "chart-options" layer dropdown
                And the user picks "AirTime" from "combo-chart-layer-values" dropdown
                And the user picks "<aggregateType>" from "combo-chart-value-aggregate" dropdown
                And the user picks "Line Chart" from "combo-chart-layer-types" dropdown
                And the user picks "<secondaryAxis>" from "combo-chart-secondary-axis" dropdown
                And the user move to visualization tab
                And the user open global settings layer
                And the user clicks on Yes for max data points
                And the user inputs 3 max data points
                And the user clicks on save chart button
            Then a custom panel should be displayed with "Chart combo bar test" as title
                And the bars should not be "0"
                And the y axis label number 1 on combo should be "AirTime"
                And the y axis label number 2 on combo should be "ArrDelay"
                And the "x" axis label should be "AirlineID"
                And the number of "bar" groups should be 1
                And the number of "line" groups should be 1
                And the numbers of bars should be 3
                And the numbers of dots should be 3
        
        Examples:
			| categoryQuestionName 		| valueQuestionName 	|  aggregateType  | secondaryAxis   |
			| AirlineID            		| ArrDelay         		|     Count       | Right           |
			| AirlineID            		| ArrDelay         		|    Average      | Left            |


    Scenario Outline: The user creates a Combo Chart based on a Bar chart and a Symbol Chart
            When the user clicks on add chart
                And the user selects "bar_chart" chart
                And the user enter "Chart combo bar test" as bar chart name
                And the user selects "<categoryQuestionName>" from "category" dropdown
                And the user selects "<valueQuestionName>" from "value" dropdown
                And the user selects "Sum" from "aggregate" dropdown
                And the user clicks on chart options tab
                And the user adds a new layer
                And the user opens the first combo panel
                And the user picks "Combo Chart" from "chart-options" layer dropdown
                And the user picks "AirTime" from "combo-chart-layer-values" dropdown
                And the user picks "<aggregateType>" from "combo-chart-value-aggregate" dropdown
                And the user picks "Symbol Chart" from "combo-chart-layer-types" dropdown
                And the user picks "<secondaryAxis>" from "combo-chart-secondary-axis" dropdown
                And the user move to visualization tab
                And the user open global settings layer
                And the user clicks on Yes for max data points
                And the user inputs 3 max data points
                And the user clicks on save chart button
            Then a custom panel should be displayed with "Chart combo bar test" as title
                And the bars should not be "0"
                And the y axis label number 1 on combo should be "AirTime"
                And the y axis label number 2 on combo should be "ArrDelay"
                And the "x" axis label should be "AirlineID"
                And the number of "bar" groups should be 1
                And the number of "symbol" groups should be 1
                And the numbers of bars should be 3
                And the numbers of symbols should be 3
        
        Examples:
			| categoryQuestionName 		| valueQuestionName 	|  aggregateType  | secondaryAxis   |
			| AirlineID            		| ArrDelay         		|     Count       | Right           |
			| AirlineID            		| ArrDelay         		|    Average      | Left            |

        Scenario Outline: The user creates a Bar Chart combining different layer types
            When the user clicks on add chart
                And the user selects "bar_chart" chart
                And the user enter "Chart combo bar test" as bar chart name
                And the user selects "<categoryQuestionName>" from "category" dropdown
                And the user selects "<valueQuestionName>" from "value" dropdown
                And the user selects "Sum" from "aggregate" dropdown
                And the user clicks on chart options tab
                And the user adds a new layer
                And the user opens the combo panel number 1
                And the user picks "Combo Chart" from "chart-options" layer dropdown
                And the user picks "AirTime" from "combo-chart-layer-values" dropdown
                And the user picks "<aggregateType>" from "combo-chart-value-aggregate" dropdown
                And the user picks "Symbol Chart" from "combo-chart-layer-types" dropdown
                And the user picks "Right" from "combo-chart-secondary-axis" dropdown
                And the user adds a new layer
                And the user opens the combo panel number 2
                And the user picks "Trend Line" from "chart-options" layer dropdown
                And the user picks "Standard Linear Regression" from "trendline-trendtype" dropdown
                And the user adds a new layer
                And the user opens the combo panel number 3
                And the user picks "Reference Line" from "chart-options" layer dropdown
                And the user picks "<valueQuestionName>" from "reference-axis" dropdown
                And the user enters "20250000" as fixed "value"
                And the user enters "Limit" as fixed "label"
                And the user move to visualization tab
                And the user open global settings layer
                And the user clicks on Yes for max data points
                And the user inputs 3 max data points
                And the user clicks on save chart button
            Then a custom panel should be displayed with "Chart combo bar test" as title
                And the bars should not be "0"
                And the y axis label number 1 on combo should be "AirTime"
                And the y axis label number 2 on combo should be "ArrDelay"
                And the "x" axis label should be "<categoryQuestionName>"
                And the number of "bar" groups should be 1
                And the number of "symbol" groups should be 1
                And the numbers of bars should be 3
                And the numbers of symbols should be 3
                And a reference line should be displayed
                And the reference line should contain "Limit" as label text
                And a trend line should be displayed
                And the trend line must have a tooltip in each dot
        
        Examples:
			| categoryQuestionName 		| valueQuestionName 	|  aggregateType  |
			| AirlineID            		| ArrDelay         		|     Count       |
			| AirlineID            		| ArrDelay         		|    Average      | 
