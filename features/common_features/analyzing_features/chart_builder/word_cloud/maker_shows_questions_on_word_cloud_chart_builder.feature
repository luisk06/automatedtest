@chartBuilder @analyzing @qrvey @chartBuilderWordcloud @complete

Feature: Building a WordCloud chart visualization with differents questions types

	As an user
	I want to visualize differents questions on a customized word cloud
	In order to clarify relations between them

	Scenario Outline: The user build a word cloud chart using a <textQuestionType> and <valueQuestionType> questions on <typeOfQrvey> using <aggregateType> as aggregate
		Given the user has webform app with a "<typeOfQrvey>" with "word-cloud" chart builder compatible questions with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "word_cloud" chart
			And the user enter "Word Cloud Chart test" as bar chart name
			And the user selects "<textQuestionType>" from "category" dropdown
			And the user selects "<valueQuestionType>" from "value" dropdown
			And the user selects "<aggregateType>" from "aggregate" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Word Cloud Chart test" as title
			And the word clouds should not be 0

		Examples:
			| typeOfQrvey     	| textQuestionType 		| valueQuestionType 	| aggregateType |
			| survey          	| LongText     	    	| Numeric         		| Sum         	|
			| survey          	| ShortText      		| Numeric         		| Maximum     	|
			| survey          	| Expression        	| Rating         		| Average     	|
			| forms           	| LongText          	| Numeric         		| Average     	|
			| forms           	| ShortText     		| Numeric         		| Count       	|
			| forms         	| Expression        	| Numeric         		| Minimum     	|

	@newFieldswordCloudChart
	Scenario Outline: The user build a word cloud chart with new available new fields, using a <categoryQuestionType> as category and <valueQuestionType> questions on <typeOfQrvey>, using <aggregateType> as aggregate
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "word_cloud" chart
			And the user enter "Word Cloud Chart test" as bar chart name
			And the user selects "<categoryQuestionType>" from "category" dropdown
			And the user selects "<valueQuestionType>" from "value" dropdown
			And the user selects "<aggregateType>" from "aggregate" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Word Cloud Chart test" as title
			And the word clouds should not be 0

		Examples:
			| typeOfQrvey     	| categoryQuestionType 		| valueQuestionType 	| aggregateType |
			| forms           	| First Name           		| Numeric         		| Sum	     	|
			| forms           	| Last Name            		| Numeric         		| Maximum     	|
			| forms           	| Short Text           		| Numeric         		| Minimum     	|
			| forms           	| Long Text           		| Numeric         		| Count     	|
			| forms           	| US Address Line 1	   		| Numeric         		| Average     	|
			| forms           	| US Address Line 2	   		| Numeric         		| Sum  		   	|
			| forms           	| US Address City	   		| Numeric         		| Maximum     	|
			| forms           	| US Address Country   		| Numeric         		| Minimum     	|
			| forms           	| US Address Postal Code   	| Numeric         		| Count     	|
			| forms           	| US Address State		   	| Numeric         		| Average     	|
			| forms           	| Address Street		   	| Numeric         		| Sum	     	|
			| forms           	| Address City			   	| Numeric         		| Maximum     	|
			| forms           	| Address Country		   	| Numeric         		| Minimum     	|
			| forms           	| Address Postal Code	   	| Numeric         		| Count     	|
			| forms           	| Address State			   	| Numeric         		| Average     	|
			| survey           	| First Name            	| Rating         		| Minimum     	|
			| survey           	| Last Name	            	| Slider Bar         	| Sum	     	|
			| survey           	| Short Text           		| Date	         		| Count     	|
			| survey           	| Long Text           		| Numeric         		| Sum	     	|
			| survey           	| Expression           		| Slider Bar         	| Minimum     	|
			| survey           	| US Address Line 1	   		| Numeric         		| Average     	|
			| survey           	| US Address Line 2	   		| Rating         		| Sum	     	|
			| survey           	| US Address City	   		| Slider Bar       		| Maximum     	|
			| survey           	| US Address Country   		| Date	         		| Count     	|
			| survey           	| US Address Postal Code   	| Numeric         		| Count     	|
			| survey           	| US Address State		   	| Rating         		| Average     	|
			| survey           	| Address Street		   	| Slider Bar       		| Sum	     	|
			| survey           	| Address City			   	| Date	        		| Count     	|
			| survey           	| Address Country		   	| Numeric         		| Minimum     	|
			| survey           	| Address Postal Code	   	| Rating         		| Count     	|
			| survey           	| Address State			   	| Slider Bar       		| Average     	|

	@seeDataWordCloud
	Scenario Outline: The user applies see data to a Yes-No question on a wordcloud chart with a short text question as category and a numeric question as value; on <typeOfQrvey>
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "word_cloud" chart
			And the user enter "Chart drill down test" as bar chart name
			And the user selects "Short Text" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Sum" from "aggregate" dropdown
			And the user clicks on save chart button
			And the user clicks on the word 1
			And the user clicks "See Data" on drill down list
			And the user opens the filter side bar
		Then the number of filters applied should be 1
			And the clicked "word" should be contained in histogram filters
			And the user should be on tabular view
			And the number of tabular rows should be more than 0
			And the number of tabular rows should be less than 40

		Examples:
			| typeOfQrvey     	|
			| survey           	|
			| forms           	|