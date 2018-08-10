@chartBuilder @complete @analyzing @qrvey @chartOptions @multiSeries @multiSeriesFilters @chartBuilderComboCharts

Feature: Applying filters to multiseries


    @multiSeriesBarFilter
	Scenario Outline: The user applies a filter on a multi series on a <typeOfQrvey> based on a bar_chart and Yes-No as series type
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "bar_chart" chart
			And the user enter "Chart multi-series filter test" as bar chart name
			And the user selects "Multiple Choice" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Average" from "aggregate" dropdown
			And the user clicks on chart options tab
			And the user adds a new layer
			And the user opens the first combo panel
			And the user picks "Multi-Series" from "chart-options" layer dropdown
			And the user picks "Yes-No" from "series" dropdown
			And the user choose "<visualization>" as visualization mode
			And the user clicks on save chart button
			And the user clicks on the charts filter button
			And the user moves to "Multiple Choice" filter tab
			And the user clicks on the "D" filter as text
			And the user clicks on the "apply_filter" "button"
			And the user opens the filter side bar
		Then a custom panel should be displayed with "Chart multi-series filter test" as title
			And the number of filters applied should be 1
			And "D" answer should be contained in histogram filters
			And the number answers should be more than 0
			And the number of "bar" groups should be 2
			And a multi series tooltip should appear on each bar

		Examples:
			| typeOfQrvey     	| visualization |
			| forms           	| 100	 		|
			| survey           	| stacked 		|
			| quiz           	| cluster 		|

    @multiSeriesSymbolFilter
	Scenario Outline: The user applies a filter on a multi series on a <typeOfQrvey> based on a symbol_chart and Yes-No as series type
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "symbol_chart" chart
			And the user enter "Chart multi-series filter test" as bar chart name
			And the user selects "Multiple Choice" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Average" from "aggregate" dropdown
			And the user clicks on chart options tab
			And the user adds a new layer
			And the user opens the first combo panel
			And the user picks "Multi-Series" from "chart-options" layer dropdown
			And the user picks "Yes-No" from "series" dropdown
			And the user clicks on save chart button
			And the user clicks on the charts filter button
			And the user moves to "Multiple Choice" filter tab
			And the user clicks on the "D" filter as text
			And the user clicks on the "apply_filter" "button"
			And the user opens the filter side bar
		Then a custom panel should be displayed with "Chart multi-series filter test" as title
			And the number of filters applied should be 1
			And "D" answer should be contained in histogram filters
			And the number answers should be more than 0
			And the number of "symbol" groups should be 2
			And a multi series tooltip should appear on each symbol point

		Examples:
			| typeOfQrvey   |
			| forms         |
			| survey        |
			| quiz          |

    @multiSeriesLineFilter
	Scenario Outline: The user applies a filter on a multi series on a <typeOfQrvey> based on a line_chart and Yes-No as series type
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "line_chart" chart
			And the user enter "Chart multi-series filter test" as bar chart name
			And the user selects "Multiple Choice" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Average" from "aggregate" dropdown
			And the user clicks on chart options tab
			And the user adds a new layer
			And the user opens the first combo panel
			And the user picks "Multi-Series" from "chart-options" layer dropdown
			And the user picks "Yes-No" from "series" dropdown
			And the user clicks on save chart button
			And the user clicks on the charts filter button
			And the user moves to "Multiple Choice" filter tab
			And the user clicks on the "D" filter as text
			And the user clicks on the "apply_filter" "button"
			And the user opens the filter side bar
		Then a custom panel should be displayed with "Chart multi-series filter test" as title
			And the number of filters applied should be 1
			And "D" answer should be contained in histogram filters
			And the number answers should be more than 0
			And the number of "line" groups should be 2
			And a multi series tooltip should appear on each line dot

		Examples:
			| typeOfQrvey     	|
			| forms           	|
			| survey           	|
			| quiz           	|