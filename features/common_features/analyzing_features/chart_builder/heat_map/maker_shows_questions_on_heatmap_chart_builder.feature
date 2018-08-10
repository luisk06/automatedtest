@chartBuilder @complete @analyzing @qrvey @chartBuilderHeatMap

Feature:  Building a HeatMap chart visualization with differents questions types

	As an user
	I want to visualize differents questions on a customized heatmap chart
	In order to clarify relations between them

	Scenario Outline: The user build a heatmap chart using a <categoryQuestionType> and <valueQuestionType> questions on <typeOfQrvey>, using <aggregateType> as aggregate
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "heatmap_chart" chart
			And the user enter "Chart heatmap test" as bar chart name
			And the user selects "<categoryQuestionType>" from "category" dropdown
			And the user selects "<valueQuestionType>" from "value" dropdown
			And the user selects "<aggregateType>" from "aggregate" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart heatmap test" as title
			And the "y" axis label should be "<categoryQuestionType>"
			And the "x" axis label should be "<valueQuestionType>"
			And the cells on heat map table should not be empty

		Examples:
			| typeOfQrvey     	| categoryQuestionType 		| valueQuestionType 	| aggregateType |
			| forms           	| LookUP            		| Numeric         		| Average     	|
			| forms           	| Multiple Choice     		| Numeric         		| Count       	|
			| forms         	| Date            	   		| Numeric         		| Minimum     	|
			| forms         	| Numeric            	   	| Date         			| Count     	|
			| forms           	| First Name           		| Numeric         		| Sum	     	|
			| forms           	| Last Name            		| Numeric         		| Maximum     	|
			| forms           	| Long Text           		| Numeric         		| Count     	|
			| forms           	| US Address Line 2	   		| Numeric         		| Sum  		   	|
			| forms           	| US Address City	   		| Numeric         		| Maximum     	|
			| forms           	| US Address Postal Code   	| Numeric         		| Count     	|
			| forms           	| US Address State		   	| Numeric         		| Average     	|
			| forms           	| Address Street		   	| Numeric         		| Sum	     	|
			| forms           	| Address Country		   	| Numeric         		| Minimum     	|
			| forms           	| Email		           		| Numeric         		| Count     	|
			| forms           	| Address Postal Code	   	| Date         			| Count     	|
			| forms           	| Address State			   	| Numeric         		| Average     	|
			| survey          	| Multiple Choice     		| Numeric         		| Sum         	|
			| survey          	| Yes-No            		| Rating          		| Average     	|
			| survey          	| Rating           	   		| Slider Bar      		| Count       	|
			| survey          	| Numeric           		| Slider Bar      		| Minimum     	|
			| survey          	| Slider Bar      	   		| Numeric         		| Maximum     	|
			| survey          	| Date            	   		| Numeric         		| Average     	|
			| survey           	| LookUP            		| Numeric         		| Maximum     	|
			| survey           	| First Name            	| Rating         		| Minimum     	|
			| survey           	| Last Name	            	| Slider Bar         	| Sum	     	|
			| survey           	| Long Text           		| Numeric         		| Sum	     	|
			| survey           	| Email		           		| Rating         		| Maximum     	|
			| survey           	| Expression           		| Slider Bar         	| Minimum     	|
			| survey           	| Ranking           		| Date	         		| Count     	|
			| survey           	| US Address Line 1	   		| Numeric         		| Average     	|
			| survey           	| US Address Line 2	   		| Rating         		| Sum	     	|
			| survey           	| US Address City	   		| Slider Bar       		| Maximum     	|
			| survey           	| US Address Postal Code   	| Numeric         		| Count     	|
			| survey           	| US Address State		   	| Rating         		| Average     	|
			| survey           	| Address Street		   	| Slider Bar       		| Sum	     	|
			| survey           	| Address Country		   	| Numeric         		| Minimum     	|
			| survey           	| Address Postal Code	   	| Rating         		| Count     	|
			| survey           	| Address State			   	| Slider Bar       		| Average     	|
			| quiz            	| Date            	   		| Numeric         		| Maximum     	|
			| quiz            	| Yes-No            		| Numeric         		| Average     	|
			| quiz            	| Numeric            		| Date	         		| Count     	|

	@heatmapChartPivot
	Scenario Outline: The user build a heatmap chart using a <categoryQuestionType> as category, <valueQuestionType> questions as value and <aggregateType> as aggregate on <typeOfQrvey> webform, also including <pivotQuestionType> as pivot column
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "heatmap_chart" chart
			And the user enter "Chart heatmap test" as bar chart name
			And the user selects "<categoryQuestionType>" from "category" dropdown
			And the user selects "<valueQuestionType>" from "value" dropdown
			And the user selects "<aggregateType>" from "aggregate" dropdown
			And the user selects "<pivotQuestionType>" from "pivot" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart heatmap test" as title
			And the "y" axis label should be "<categoryQuestionType>"
			And the "x" axis label should be "<pivotQuestionType>"
			And the cells on heat map table should not be empty

		Examples:
			| typeOfQrvey     	| categoryQuestionType 		| valueQuestionType 	| aggregateType | pivotQuestionType |
			| forms           	| LookUP            		| Numeric         		| Average     	| Date				|
			| forms           	| First Name           		| Numeric         		| Sum	     	| Email				|
			| forms           	| Yes-No		     		| Numeric         		| Count       	| Yes-No			|
			| survey          	| Multiple Choice     		| Numeric         		| Sum         	| Date				|
			| survey          	| Yes-No            		| Rating          		| Average     	| Expression		|
			| survey          	| Rating           	   		| Slider Bar      		| Count       	| Numeric			|
			| survey           	| LookUP            		| Numeric         		| Maximum     	| Email				|
			| quiz            	| Yes-No            		| Numeric         		| Maximum     	| Date				|
			| quiz            	| Multiple Choice      		| Numeric         		| Sum         	| Yes-No 			|

	@smokeTest1
	Scenario Outline: The user build a heatmap chart using a <categoryQuestionType> and <valueQuestionType> questions on <typeOfQrvey>, using <aggregateType> as aggregate
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "heatmap_chart" chart
			And the user enter "Chart heatmap test" as bar chart name
			And the user selects "<categoryQuestionType>" from "category" dropdown
			And the user selects "<valueQuestionType>" from "value" dropdown
			And the user selects "<aggregateType>" from "aggregate" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart heatmap test" as title
			And the "y" axis label should be "<categoryQuestionType>"
			And the "x" axis label should be "<valueQuestionType>"
			And the cells on heat map table should not be empty

		Examples:
			| typeOfQrvey     	| categoryQuestionType 	| valueQuestionType 	| aggregateType |
			| forms           	| Yes-No            	| Numeric         		| Average     	|

	@dateGroupingHeatMapChart
	Scenario Outline: The user uses date grouping to create a heat map chart on a <typeOfQrvey>  using <valueQuestionType> as value question and <dateGroup> as group option
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "heatmap_chart" chart
			And the user enter "Chart heatmap test" as bar chart name
			And the user selects "Date" from "category" dropdown
			And the user selects "<dateGroup>" from "date_grouping" dropdown
			And the user selects "<valueQuestionType>" from "value" dropdown
			And the user selects "<aggregateType>" from "aggregate" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart heatmap test" as title
			And the "y" axis label should be "Date"
			And the "x" axis label should be "<valueQuestionType>"
			And the cells on heat map table should not be empty
			And the heatmap labels should match with "<dateGroup>" date group labels

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

	@drillDownHeatMapChart
	Scenario Outline: The user drills down to a Yes-No question on a heatmap chart with a multiple choice question as category and a numeric question as value; on <typeOfQrvey>
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "heatmap_chart" chart
			And the user enter "Chart drill down test" as bar chart name
			And the user selects "Multiple Choice" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Sum" from "aggregate" dropdown
			And the user clicks on save chart button
			And the user clicks on the cell 1 for "A" row
			And the user clicks "Yes-No" on drill down list
		Then a custom panel should be displayed with "Chart drill down test" as title
			And the cells on heat map table should not be empty
			And the "y" axis label should be "Multiple Choice > A Yes-No"
		When the user clicks on the cell 1 for "<filteredQuestion>" row
			And the user clicks "See Data" on drill down list
			And the user opens the filter side bar
		Then the number of filters applied should be 2
			And "A" answer should be contained in histogram filters
			And "<filteredQuestion>" answer should be contained in histogram filters
			And the user should be on tabular view
			And the number of tabular rows should be more than 0
			And the number of tabular rows should be less than 40

		Examples:
			| typeOfQrvey     	| filteredQuestion 	|
			| survey           	|	No				|
			| forms           	|	Yes				|

	@drillDownHeatMapChart
	Scenario: The user drills down to a Yes-No question on a heatmap chart with a multiple choice question as category, a numeric question as value; on Quiz
		Given the user has a webform app with a "quiz" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "quiz"
			And the user clicks on add chart
			And the user selects "heatmap_chart" chart
			And the user enter "Chart drill down test" as bar chart name
			And the user selects "Multiple Choice" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Sum" from "aggregate" dropdown
			And the user clicks on save chart button
			And the user clicks on the cell 1 for "A" row
			And the user clicks "Yes-No" on drill down list
		Then a custom panel should be displayed with "Chart drill down test" as title
			And the cells on heat map table should not be empty
			And the "y" axis label should be "Multiple Choice > A Yes-No"
			And the "x" axis label should be "Numeric"
		When the user clicks on the cell 1 for "Yes" row
		Then the see data option should not appear

	@drillDownHeatMapChartPivot
	Scenario Outline: The user drills down to a Yes-No question on a heatmap chart with a multiple choice question as category, a numeric question as value and Rating as pivot; on <typeOfQrvey>
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "heatmap_chart" chart
			And the user enter "Chart drill down test" as bar chart name
			And the user selects "Multiple Choice" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Sum" from "aggregate" dropdown
			And the user selects "Date" from "pivot" dropdown
			And the user clicks on save chart button
			And the user clicks on the cell 1 for "A" row
			And the user clicks "Yes-No" on drill down list
		Then a custom panel should be displayed with "Chart drill down test" as title
			And the cells on heat map table should not be empty
			And the "y" axis label should be "Multiple Choice > A Yes-No"
			And the "x" axis label should be "Date"
		When the user clicks on the cell 1 for "<filteredQuestion>" row
			And the user clicks "See Data" on drill down list
			And the user opens the filter side bar
		Then the number of filters applied should be 2
			And "A" answer should be contained in histogram filters
			And "<filteredQuestion>" answer should be contained in histogram filters
			And the user should be on tabular view
			And the number of tabular rows should be more than 0
			And the number of tabular rows should be less than 40

		Examples:
			| typeOfQrvey     	| filteredQuestion 	|
			| survey           	|	Yes				|
			| forms           	|	No				|

	@drillDownHeatMapChartPivot
	Scenario: The user drills down to a Yes-No question on a heatmap chart with a multiple choice question as category, a numeric question as value and Date as pivot; on Quiz
		Given the user has a webform app with a "quiz" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "quiz"
			And the user clicks on add chart
			And the user selects "heatmap_chart" chart
			And the user enter "Chart drill down test" as bar chart name
			And the user selects "Multiple Choice" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Sum" from "aggregate" dropdown
			And the user selects "Date" from "pivot" dropdown
			And the user clicks on save chart button
			And the user clicks on the cell 1 for "A" row
			And the user clicks "Yes-No" on drill down list
		Then a custom panel should be displayed with "Chart drill down test" as title
			And the cells on heat map table should not be empty
			And the "y" axis label should be "Multiple Choice > A Yes-No"
			And the "x" axis label should be "Date"
		When the user clicks on the cell 1 for "Yes" row
		Then the see data option should not appear