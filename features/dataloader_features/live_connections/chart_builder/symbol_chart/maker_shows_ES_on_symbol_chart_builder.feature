@chartBuilderES @complete @analyzingES @chartBuilderESSymbol @dataloader

Feature:  Creating a Symbol Chart on a Elasticsearch live connection.

	As an user
	I want to visualize differents types data from my live connection on a customized symbol chart
	In order to clarify relations between them

	Background: 
		Given the user has an app
			And that there is a ES connection
			And the user has login
			And the user opens the just created app
			And the user opens the "data_upload" board
			And the user clicks on the record button

    Scenario Outline: The user creates a reference line based on a Symbol chart
            When the user clicks on add chart
                And the user selects "symbol_chart" chart
                And the user enter "Chart reference line test" as bar chart name
                And the user selects "<categoryQuestionName>" from "category" dropdown
                And the user selects "<valueQuestionName>" from "value" dropdown
                And the user selects "<aggregateType>" from "aggregate" dropdown
                And the user clicks on chart options tab
                And the user adds a new layer
                And the user opens the first combo panel
                And the user picks "Reference Line" from "chart-options" layer dropdown
                And the user picks "<valueQuestionName>" from "reference-axis" dropdown
                And the user enters "<limit>" as fixed "value"
                And the user enters "Limit" as fixed "label"
                And the user move to visualization tab
                And the user open global settings layer
                And the user clicks on Yes for max data points
                And the user inputs 3 max data points
                And the user clicks on save chart button
            Then a custom panel should be displayed with "Chart reference line test" as title
                And the y axis label number 1 on combo should be "<valueQuestionName>"
                And the "x" axis label should be "<categoryQuestionName>"
                And the numbers of symbols should be 3
                And a reference line should be displayed
                And the reference line should contain "Limit" as label text
        
        Examples:
			| categoryQuestionName 		| valueQuestionName 	| aggregateType | limit     | 
			| AirlineID            		| ArrDelay         		| Count     	| 20250000  |         
			| AirlineID            		| ArrDelay         		| Minimum     	| 20250000  |   
			| AirlineID            		| ArrDelay         		| Average     	| 20250000  |       