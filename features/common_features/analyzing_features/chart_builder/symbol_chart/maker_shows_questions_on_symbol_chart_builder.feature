@chartBuilder @complete @analyzing @qrvey @chartBuilderSymbol

Feature:  Building a Symbol chart visualization with differents questions types

	As an user
	I want to visualize differents questions on a customized symbol chart
	In order to clarify relations between them

	Scenario Outline: The user build a symbol chart using a <categoryQuestionType> and <valueQuestionType> questions on <typeOfQrvey>, using <aggregateType> as aggregate
		Given the user has webform app with a "<typeOfQrvey>" with "symbol" chart builder compatible questions with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "symbol_chart" chart
			And the user enter "Chart symbol test" as bar chart name
			And the user selects "<categoryQuestionType>" from "category" dropdown
			And the user selects "<valueQuestionType>" from "value" dropdown
			And the user selects "<aggregateType>" from "aggregate" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart symbol test" as title
			And the "y" axis label should be "<valueQuestionType>"
			And the "x" axis label should be "<categoryQuestionType>"
			And the number of symbol points should be more than "0"

		Examples:
			| typeOfQrvey     	| categoryQuestionType 	| valueQuestionType 	| aggregateType |
			| forms           	| Single Selection     	| Numeric         		| Count       	|
			| forms         	| Date            	   	| Numeric         		| Minimum     	|
			| quiz            	| Date            	   	| Numeric         		| Maximum     	|
			| quiz            	| Single Selection     	| Numeric         		| Sum         	|
			| quiz            	| Yes-No            	| Numeric         		| Average     	|
			| survey          	| Single Selection     	| Numeric         		| Sum         	|
			| survey          	| Yes-No            	| Rating          		| Average     	|
			| survey          	| Rating           	   	| Slider bar      		| Count       	|
			| survey          	| Numeric           	| Slider bar      		| Minimum     	|
			| survey          	| Slider bar      	   	| Rating         		| Maximum     	|
			| survey          	| Date            	   	| Numeric         		| Average     	|

	@newFieldsSymbolChart
	Scenario Outline: The user build a symbol chart with new available new fields, using a <categoryQuestionType> as category and <valueQuestionType> questions on <typeOfQrvey>, using <aggregateType> as aggregate
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "symbol_chart" chart
			And the user enter "Chart symbol test" as bar chart name
			And the user selects "<categoryQuestionType>" from "category" dropdown
			And the user selects "<valueQuestionType>" from "value" dropdown
			And the user selects "<aggregateType>" from "aggregate" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart symbol test" as title
			And the "y" axis label should be "<valueQuestionType>"
			And the "x" axis label should be "<categoryQuestionType>"
			And the number of symbol points should be more than "0"

		Examples:
			| typeOfQrvey     	| categoryQuestionType 	| valueQuestionType 	| aggregateType |
			| forms           	| LookUP            		| Numeric         	| Average     	|
			| forms           	| First Name           		| Numeric         	| Sum	     	|
			| forms           	| Last Name            		| Numeric         	| Maximum     	|
			| forms           	| Short Text           		| Numeric         	| Minimum     	|
			| forms           	| Long Text           		| Numeric         	| Count     	|
			| forms           	| US Address Line 1	   		| Numeric         	| Average     	|
			| forms           	| US Address Line 2	   		| Numeric         	| Sum  		   	|
			| forms           	| US Address City	   		| Numeric         	| Maximum     	|
			| forms           	| US Address Country   		| Numeric         	| Minimum     	|
			| forms           	| US Address Postal Code   	| Numeric         	| Count     	|
			| forms           	| US Address State		   	| Numeric         	| Average     	|
			| forms           	| Address Street		   	| Numeric         	| Sum	     	|
			| forms           	| Address City			   	| Numeric         	| Maximum     	|
			| forms           	| Address Country		   	| Numeric         	| Minimum     	|
			| forms           	| Email		           		| Numeric         	| Count     	|
			| forms           	| Address Postal Code	   	| Numeric         	| Count     	|
			| forms           	| Address State			   	| Numeric         	| Average     	|
			| survey           	| LookUP            		| Numeric         	| Maximum     	|
			| survey           	| First Name            	| Rating         	| Minimum     	|
			| survey           	| Last Name	            	| Slider Bar        | Sum	     	|
			| survey           	| Short Text           		| Date	         	| Count     	|
			| survey           	| Long Text           		| Numeric         	| Sum	     	|
			| survey           	| Email		           		| Rating         	| Maximum     	|
			| survey           	| Expression           		| Slider Bar        | Minimum     	|
			| survey           	| Ranking           		| Date	         	| Count     	|
			| survey           	| US Address Line 1	   		| Numeric         	| Average     	|
			| survey           	| US Address Line 2	   		| Rating         	| Sum	     	|
			| survey           	| US Address City	   		| Slider Bar       	| Maximum     	|
			| survey           	| US Address Country   		| Date	         	| Count     	|
			| survey           	| US Address Postal Code   	| Numeric         	| Count     	|
			| survey           	| US Address State		   	| Rating         	| Average     	|
			| survey           	| Address Street		   	| Slider Bar       	| Sum	     	|
			| survey           	| Address City			   	| Date	        	| Count     	|
			| survey           	| Address Country		   	| Numeric         	| Minimum     	|
			| survey           	| Address Postal Code	   	| Rating         	| Count     	|
			| survey           	| Address State			   	| Slider Bar       	| Average     	|

	@smokeTest2
	Scenario Outline: The user build a symbol chart with new available new fields, using a <categoryQuestionType> as category and <valueQuestionType> questions on <typeOfQrvey>, using <aggregateType> as aggregate
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "symbol_chart" chart
			And the user enter "Chart symbol test" as bar chart name
			And the user selects "<categoryQuestionType>" from "category" dropdown
			And the user selects "<valueQuestionType>" from "value" dropdown
			And the user selects "<aggregateType>" from "aggregate" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart symbol test" as title
			And the "y" axis label should be "<valueQuestionType>"
			And the "x" axis label should be "<categoryQuestionType>"
			And the number of symbol points should be more than "0"

		Examples:
			| typeOfQrvey     	| categoryQuestionType 	| valueQuestionType 	| aggregateType |
			| forms           	| Yes-No            	| Numeric         		| Average     	|

	@dateGroupingSymbolChart
	Scenario Outline: The user uses date grouping to create a symbol chart on a <typeOfQrvey>  using <valueQuestionType> as value question and <dateGroup> as group option
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "symbol_chart" chart
			And the user enter "Chart symbol test" as bar chart name
			And the user selects "Date" from "category" dropdown
			And the user selects "<dateGroup>" from "date_grouping" dropdown
			And the user selects "<valueQuestionType>" from "value" dropdown
			And the user selects "<aggregateType>" from "aggregate" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart symbol test" as title
			And the "y" axis label should be "<valueQuestionType>"
			And the "x" axis label should be "Date"
			And the number of symbol points should be more than "0"
			And the x asis labels should match with "<dateGroup>" date group

		Examples:
			| typeOfQrvey     	| dateGroup			 	| valueQuestionType 	| aggregateType |
			| forms           	| Year	            	| Numeric         		| Average     	|
			| forms           	| Quarter	           	| Numeric         		| Minimum     	|
			| forms           	| Month					| Numeric         		| Sum	     	|
			| forms           	| Week					| Numeric         		| Maximum     	|
			| forms           	| No Grouping			| Numeric         		| Count     	|
			| forms           	| Day					| Numeric       		| Average     	|
			| survey           	| Year	            	| Slider Bar          	| Average     	|
			| survey           	| Quarter	           	| Numeric         		| Minimum     	|
			| survey           	| Month					| Rating         		| Sum	     	|
			| survey           	| Week					| Rating         		| Maximum     	|
			| survey           	| No Grouping			| Numeric         		| Count     	|
			| survey           	| Day					| Slider Bar       		| Average     	|
			| quiz           	| Quarter	           	| Numeric         		| Minimum     	|

	@drillDownSymbolChart
	Scenario Outline: The user drills down to a <drillDownQuestion> question on a symbol chart with a multiple choice question as category and a numeric question as value; on <typeOfQrvey>
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "symbol_chart" chart
			And the user enter "Chart drill down test" as bar chart name
			And the user selects "Multiple Choice" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Sum" from "aggregate" dropdown
			And the user clicks on save chart button
			And the user clicks on the symbol 1
			And the user clicks "<drillDownQuestion>" on drill down list
		Then a custom panel should be displayed with "Chart drill down test" as title
			And the "y" axis label should be "Numeric"
			And the "x" axis label should be "Multiple Choice > A <drillDownQuestionText>"
			And the numbers of symbols should be <numbersOfsymbols>
		When the user clicks on the symbol 1
			And the user clicks "See Data" on drill down list
			And the user opens the filter side bar
		Then the number of filters applied should be 2
			And "A" answer should be contained in histogram filters
			And "<filteredQuestion>" answer should be contained in histogram filters
			And the user should be on tabular view
			And the number of tabular rows should be more than 0
			And the number of tabular rows should be less than 40

		Examples:
			| typeOfQrvey     	| drillDownQuestion		| numbersOfsymbols	|	drillDownQuestionText	| filteredQuestion 	|
			| survey           	| Yes-No	            | 2					|	Yes-No					|	No				|
			| forms           	| Yes-No	            | 2					|	Yes-No					|	No				|

	@drillDownSymbolChart
	Scenario: The user drills down to a Yes-No question on a symbol chart with a multiple choice question as category and a numeric question as value; on Quiz
		Given the user has a webform app with a "quiz" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "quiz"
			And the user clicks on add chart
			And the user selects "symbol_chart" chart
			And the user enter "Chart drill down test" as bar chart name
			And the user selects "Multiple Choice" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Sum" from "aggregate" dropdown
			And the user clicks on save chart button
			And the user clicks on the symbol 1
			And the user clicks "Yes-No" on drill down list
		Then a custom panel should be displayed with "Chart drill down test" as title
			And the "y" axis label should be "Numeric"
			And the "x" axis label should be "Multiple Choice > A Yes-No"
			And the numbers of symbols should be 2
		When the user clicks on the symbol 1
		Then the see data option should not appear