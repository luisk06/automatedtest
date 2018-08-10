@analiticQ @analyzing @complete @forms @smokeTest2 @formsAnalyzing

Feature: Applying a filter to Look up question results in summary view on a forms

	As an user
	I want see the results of a look-up question on summary view
	In order to analyse them by looking at the different spredefined options that have been answered

	@analyzingLookUpQuestionResultsForms
	Scenario Outline: The user applies a <filterType> filter to look up question in forms summary view
		Given that there is a webform app with a "forms" with a "<lookupType>" question that has 20 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user clicks on the filter button
			And the user picks "<lookupOption>" from "lookup-option" dropdown
			And the user picks "<lookupFilter>" from "text-filter" dropdown
			And the user writes down "<filteredAnswer>" on "text-value" input
			And the user clicks on add filter button
			And the user clicks on the "apply_filter" "button"
			And the user opens the filter side bar
		Then the number answers should be more than 0
			And the number answers on question panel should be more than 0
			And "<filteredAnswer>" answer should be contained in histogram filters
			And "<filterText> (<lookupOption>)" answer should be contained in histogram filters

		Examples:
			|	lookupOption	| lookupFilter			|	filteredAnswer 		|	lookupType     |	filterText	|
			|	Display			| 	Contains			|	Option 5       		|	lookup_text    |	Contains	|
			|	Value			| 	Does Not Contains	|	Value 5        		|	lookup_google  |	Not Contains|
			|	Display			| 	Contains			|	Ervin Howell		|	lookup_webhook |	Contains	|
			|	Value			| 	Does Not Contains	|	Shanna@melissa.tv	|	lookup_webhook |	Not Contains|