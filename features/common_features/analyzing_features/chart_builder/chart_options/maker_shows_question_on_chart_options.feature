@chartBuilder @complete @analyzing @qrvey @chartOptions @chartBuilderComboCharts

Feature: Building charts using different chart options

	As an user
	I want to visualize differents combo chart options and combinations between them on a customized chart
	In order to get a better angle of my data

	@comboChartBarBar
	Scenario Outline: The user creates a combo chart on a <typeOfQrvey> based on a bar chart and bar chart as combo chart type, using <layerValue> as layer value question and <aggregateValue> as aggregate Value option; and <secondaryAxis> as secondary axis
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "bar_chart" chart
			And the user enter "Chart bar test" as bar chart name
			And the user selects "Yes-No" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Average" from "aggregate" dropdown
			And the user clicks on chart options tab
			And the user adds a new layer
			And the user opens the first combo panel
			And the user picks "Combo Chart" from "chart-options" layer dropdown
			And the user picks "<layerValue>" from "combo-chart-layer-values" dropdown
			And the user picks "<aggregateValue>" from "combo-chart-value-aggregate" dropdown
			And the user picks "<layerType>" from "combo-chart-layer-types" dropdown
			And the user picks "<secondaryAxis>" from "combo-chart-secondary-axis" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart bar test" as title
			And the bars should not be "0"
			And the y axis label number 1 on combo should be "<layerValue>"
			And the y axis label number 2 on combo should be "Numeric"
			And the "x" axis label should be "Yes-No"
			And the number of "bar" groups should be 2

		Examples:
			| typeOfQrvey     	| layerValue		 	| aggregateValue 	| layerType     | secondaryAxis		|
			| forms           	| Date	            	| Count     		| Bar Chart     | Right			  	|
			| survey           	| Rating	            | Average     		| Bar Chart     | Left			   	|
			| quiz           	| Date	           		| Count     		| Bar Chart    	| Right   			|

	@comboChartBarLine
	Scenario Outline: The user creates a combo chart on a <typeOfQrvey> based on a bar chart and line chart as combo chart type, using <layerValue> as layer value question and <aggregateValue> as aggregate Value option; and <secondaryAxis> as secondary axis
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "bar_chart" chart
			And the user enter "Chart bar test" as bar chart name
			And the user selects "Yes-No" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Average" from "aggregate" dropdown
			And the user clicks on chart options tab
			And the user adds a new layer
			And the user opens the first combo panel
			And the user picks "Combo Chart" from "chart-options" layer dropdown
			And the user picks "<layerValue>" from "combo-chart-layer-values" dropdown
			And the user picks "<aggregateValue>" from "combo-chart-value-aggregate" dropdown
			And the user picks "<layerType>" from "combo-chart-layer-types" dropdown
			And the user picks "<secondaryAxis>" from "combo-chart-secondary-axis" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart bar test" as title
			And the bars should not be "0"
			And the lines should not be "0"
			And the y axis label number 1 on combo should be "<layerValue>"
			And the y axis label number 2 on combo should be "Numeric"
			And the "x" axis label should be "Yes-No"
			And the number of "bar" groups should be 1
			And the number of "line" groups should be 1

		Examples:
			| typeOfQrvey     	| layerValue		 	| aggregateValue 	| layerType     | secondaryAxis		|
			| forms           	| Date	            	| Count     		| Line Chart    | Right			  	|
			| survey           	| Rating	            | Average     		| Line Chart    | Left			   	|
			| quiz           	| Date	           		| Count     		| Line Chart    | Right   			|

	@comboChartBarSymbol
	Scenario Outline: The user creates a combo chart on a <typeOfQrvey> based on a bar chart and symbol chart as combo chart type, using <layerValue> as layer value question and <aggregateValue> as aggregate Value option; and <secondaryAxis> as secondary axis
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "bar_chart" chart
			And the user enter "Chart bar test" as bar chart name
			And the user selects "Yes-No" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Average" from "aggregate" dropdown
			And the user clicks on chart options tab
			And the user adds a new layer
			And the user opens the first combo panel
			And the user picks "Combo Chart" from "chart-options" layer dropdown
			And the user picks "<layerValue>" from "combo-chart-layer-values" dropdown
			And the user picks "<aggregateValue>" from "combo-chart-value-aggregate" dropdown
			And the user picks "<layerType>" from "combo-chart-layer-types" dropdown
			And the user picks "<secondaryAxis>" from "combo-chart-secondary-axis" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart bar test" as title
			And the bars should not be "0"
			And the number of symbol points should be more than "0"
			And the y axis label number 1 on combo should be "<layerValue>"
			And the y axis label number 2 on combo should be "Numeric"
			And the "x" axis label should be "Yes-No"
			And the number of "bar" groups should be 1
			And the number of "symbol" groups should be 1

		Examples:
			| typeOfQrvey     	| layerValue		 	| aggregateValue 	| layerType     | secondaryAxis		|
			| forms           	| Date	            	| Count     		| Symbol Chart  | Right			  	|
			| survey           	| Rating	            | Average     		| Symbol Chart  | Left			   	|
			| quiz           	| Date	           		| Count     		| Symbol Chart  | Right   			|

	@comboChartLineLine
	Scenario Outline: The user creates a combo chart on a <typeOfQrvey> based on a line chart and line chart as combo chart type, using <layerValue> as layer value question and <aggregateValue> as aggregate Value option; and <secondaryAxis> as secondary axis
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "line_chart" chart
			And the user enter "Chart line test" as bar chart name
			And the user selects "Yes-No" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Average" from "aggregate" dropdown
			And the user clicks on chart options tab
			And the user adds a new layer
			And the user opens the first combo panel
			And the user picks "Combo Chart" from "chart-options" layer dropdown
			And the user picks "<layerValue>" from "combo-chart-layer-values" dropdown
			And the user picks "<aggregateValue>" from "combo-chart-value-aggregate" dropdown
			And the user picks "<layerType>" from "combo-chart-layer-types" dropdown
			And the user picks "<secondaryAxis>" from "combo-chart-secondary-axis" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart line test" as title
			And the lines should not be "0"
			And the y axis label number 1 on combo should be "<layerValue>"
			And the y axis label number 2 on combo should be "Numeric"
			And the "x" axis label should be "Yes-No"
			And the number of "line" groups should be 2

		Examples:
			| typeOfQrvey     	| layerValue		 	| aggregateValue 	| layerType     | secondaryAxis		|
			| forms           	| Date	            	| Count     		| Line Chart    | Right			  	|
			| survey           	| Rating	            | Average     		| Line Chart    | Left			   	|
			| quiz           	| Date	           		| Count     		| Line Chart    | Right   			|

	@comboChartLineBar
	Scenario Outline: The user creates a combo chart on a <typeOfQrvey> based on a line chart and bar chart as combo chart type, using <layerValue> as layer value question and <aggregateValue> as aggregate Value option; and <secondaryAxis> as secondary axis
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "line_chart" chart
			And the user enter "Chart line test" as bar chart name
			And the user selects "Yes-No" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Average" from "aggregate" dropdown
			And the user clicks on chart options tab
			And the user adds a new layer
			And the user opens the first combo panel
			And the user picks "Combo Chart" from "chart-options" layer dropdown
			And the user picks "<layerValue>" from "combo-chart-layer-values" dropdown
			And the user picks "<aggregateValue>" from "combo-chart-value-aggregate" dropdown
			And the user picks "<layerType>" from "combo-chart-layer-types" dropdown
			And the user picks "<secondaryAxis>" from "combo-chart-secondary-axis" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart line test" as title
			And the lines should not be "0"
			And the bars should not be "0"
			And the y axis label number 1 on combo should be "<layerValue>"
			And the y axis label number 2 on combo should be "Numeric"
			And the "x" axis label should be "Yes-No"
			And the number of "line" groups should be 1
			And the number of "bar" groups should be 1

		Examples:
			| typeOfQrvey     	| layerValue		 	| aggregateValue 	| layerType     | secondaryAxis		|
			| forms           	| Date	            	| Count     		| Bar Chart     | Right			  	|
			| survey           	| Rating	            | Average     		| Bar Chart     | Left			   	|
			| quiz           	| Date	           		| Count     		| Bar Chart     | Right   			|

	@comboChartLineSymbol
	Scenario Outline: The user creates a combo chart on a <typeOfQrvey> based on a line chart and symbol chart as combo chart type, using <layerValue> as layer value question and <aggregateValue> as aggregate Value option; and <secondaryAxis> as secondary axis
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "line_chart" chart
			And the user enter "Chart line test" as bar chart name
			And the user selects "Yes-No" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Average" from "aggregate" dropdown
			And the user clicks on chart options tab
			And the user adds a new layer
			And the user opens the first combo panel
			And the user picks "Combo Chart" from "chart-options" layer dropdown
			And the user picks "<layerValue>" from "combo-chart-layer-values" dropdown
			And the user picks "<aggregateValue>" from "combo-chart-value-aggregate" dropdown
			And the user picks "<layerType>" from "combo-chart-layer-types" dropdown
			And the user picks "<secondaryAxis>" from "combo-chart-secondary-axis" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart line test" as title
			And the lines should not be "0"
			And the number of symbol points should be more than "0"
			And the y axis label number 1 on combo should be "<layerValue>"
			And the y axis label number 2 on combo should be "Numeric"
			And the "x" axis label should be "Yes-No"
			And the number of "line" groups should be 1
			And the number of "symbol" groups should be 1

		Examples:
			| typeOfQrvey     	| layerValue		 	| aggregateValue 	| layerType     | secondaryAxis		|
			| forms           	| Date	            	| Count     		| Symbol Chart  | Right			  	|
			| survey           	| Rating	            | Average     		| Symbol Chart  | Left			   	|
			| quiz           	| Date	           		| Count     		| Symbol Chart  | Right   			|

	@comboChartSymbolSymbol
	Scenario Outline: The user creates a combo chart on a <typeOfQrvey> based on a symbol chart and symbol chart as combo chart type, using <layerValue> as layer value question and <aggregateValue> as aggregate Value option; and <secondaryAxis> as secondary axis
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "symbol_chart" chart
			And the user enter "Chart symbol test" as bar chart name
			And the user selects "Yes-No" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Average" from "aggregate" dropdown
			And the user clicks on chart options tab
			And the user adds a new layer
			And the user opens the first combo panel
			And the user picks "Combo Chart" from "chart-options" layer dropdown
			And the user picks "<layerValue>" from "combo-chart-layer-values" dropdown
			And the user picks "<aggregateValue>" from "combo-chart-value-aggregate" dropdown
			And the user picks "<layerType>" from "combo-chart-layer-types" dropdown
			And the user picks "<secondaryAxis>" from "combo-chart-secondary-axis" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart symbol test" as title
			And the number of symbol points should be more than "0"
			And the y axis label number 1 on combo should be "<layerValue>"
			And the y axis label number 2 on combo should be "Numeric"
			And the "x" axis label should be "Yes-No"
			And the number of "symbol" groups should be 2

		Examples:
			| typeOfQrvey     	| layerValue		 	| aggregateValue 	| layerType     | secondaryAxis		|
			| forms           	| Date	            	| Count     		| Symbol Chart  | Right			  	|
			| survey           	| Rating	            | Average     		| Symbol Chart  | Left			   	|
			| quiz           	| Date	           		| Count     		| Symbol Chart  | Right   			|

	@comboChartSymbolBar
	Scenario Outline: The user creates a combo chart on a <typeOfQrvey> based on a symbol chart and bar chart as combo chart type, using <layerValue> as layer value question and <aggregateValue> as aggregate Value option; and <secondaryAxis> as secondary axis
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "symbol_chart" chart
			And the user enter "Chart symbol test" as bar chart name
			And the user selects "Yes-No" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Average" from "aggregate" dropdown
			And the user clicks on chart options tab
			And the user adds a new layer
			And the user opens the first combo panel
			And the user picks "Combo Chart" from "chart-options" layer dropdown
			And the user picks "<layerValue>" from "combo-chart-layer-values" dropdown
			And the user picks "<aggregateValue>" from "combo-chart-value-aggregate" dropdown
			And the user picks "<layerType>" from "combo-chart-layer-types" dropdown
			And the user picks "<secondaryAxis>" from "combo-chart-secondary-axis" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart symbol test" as title
			And the number of symbol points should be more than "0"
			And the bars should not be "0"
			And the y axis label number 1 on combo should be "<layerValue>"
			And the y axis label number 2 on combo should be "Numeric"
			And the "x" axis label should be "Yes-No"
			And the number of "symbol" groups should be 1
			And the number of "bar" groups should be 1

		Examples:
			| typeOfQrvey     	| layerValue		 	| aggregateValue 	| layerType    | secondaryAxis		|
			| forms           	| Date	            	| Count     		| Bar Chart    | Right			  	|
			| survey           	| Rating	            | Average     		| Bar Chart    | Left			   	|
			| quiz           	| Date	           		| Count     		| Bar Chart    | Right   			|

	@comboChartSymbolLine
	Scenario Outline: The user creates a combo chart on a <typeOfQrvey> based on a symbol chart and line chart as combo chart type, using <layerValue> as layer value question and <aggregateValue> as aggregate Value option; and <secondaryAxis> as secondary axis
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "symbol_chart" chart
			And the user enter "Chart symbol test" as bar chart name
			And the user selects "Yes-No" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Average" from "aggregate" dropdown
			And the user clicks on chart options tab
			And the user adds a new layer
			And the user opens the first combo panel
			And the user picks "Combo Chart" from "chart-options" layer dropdown
			And the user picks "<layerValue>" from "combo-chart-layer-values" dropdown
			And the user picks "<aggregateValue>" from "combo-chart-value-aggregate" dropdown
			And the user picks "<layerType>" from "combo-chart-layer-types" dropdown
			And the user picks "<secondaryAxis>" from "combo-chart-secondary-axis" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart symbol test" as title
			And the number of symbol points should be more than "0"
			And the lines should not be "0"
			And the y axis label number 1 on combo should be "<layerValue>"
			And the y axis label number 2 on combo should be "Numeric"
			And the "x" axis label should be "Yes-No"
			And the number of "symbol" groups should be 1
			And the number of "line" groups should be 1

		Examples:
			| typeOfQrvey     	| layerValue		 	| aggregateValue 	| layerType    | secondaryAxis		|
			| forms           	| Date	            	| Count     		| Line Chart   | Right			  	|
			| survey           	| Rating	            | Average     		| Line Chart   | Left			   	|
			| quiz           	| Date	           		| Count     		| Line Chart   | Right   			|

	@trendLine
	Scenario Outline: The user creates a trend line on a <typeOfQrvey> based on a <chartType> and <trendLineType> as type
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "<chartType>" chart
			And the user enter "Chart trend line test" as bar chart name
			And the user selects "Multiple Choice" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Average" from "aggregate" dropdown
			And the user clicks on chart options tab
			And the user adds a new layer
			And the user opens the first combo panel
			And the user picks "Trend Line" from "chart-options" layer dropdown
			And the user picks "<trendLineType>" from "trendline-trendtype" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart trend line test" as title
			And the y axis label number 1 on combo should be "Numeric"
			And the "x" axis label should be "Multiple Choice"
			And the number of "<chartText>" groups should be 1
			And a trend line should be displayed
			And the trend line must have a tooltip in each dot

		Examples:
			| typeOfQrvey     	| chartType 	| chartText | trendLineType					|
			| forms           	| symbol_chart 	| symbol	| Standard Linear Regression 	|
			| forms           	| line_chart   	| line		| Standard Linear Regression 	|
			| forms           	| bar_chart		| bar		| Standard Linear Regression 	|
			| survey           	| line_chart   	| line		| Standard Linear Regression	|
			| survey           	| bar_chart		| bar		| Standard Linear Regression	|
			| survey           	| symbol_chart 	| symbol	| Standard Linear Regression	|
			| quiz           	| bar_chart		| bar		| Standard Linear Regression	|
			| quiz           	| line_chart   	| line		| Standard Linear Regression	|
			| quiz           	| symbol_chart 	| symbol	| Standard Linear Regression	|

	@multiSeries @multiSeriesLine
	Scenario Outline: The user creates a multi series on a <typeOfQrvey> based on a <chartType> and Yes-No as series type
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "<chartType>" chart
			And the user enter "Chart multi-series test" as bar chart name
			And the user selects "Multiple Choice" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Average" from "aggregate" dropdown
			And the user clicks on chart options tab
			And the user adds a new layer
			And the user opens the first combo panel
			And the user picks "Multi-Series" from "chart-options" layer dropdown
			And the user picks "Yes-No" from "series" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart multi-series test" as title
			And the y axis label number 1 on combo should be "Numeric"
			And the "x" axis label should be "Multiple Choice"
			And the number of "<chartText>" groups should be 2
			And a multi series tooltip should appear on each line dot

		Examples:
			| typeOfQrvey     	| chartType 	| chartText |
			| forms           	| line_chart   	| line		|
			| survey           	| line_chart   	| line		|
			| quiz           	| line_chart   	| line		|

	@multiSeries @multiSeriesSymbol
	Scenario Outline: The user creates a multi series on a <typeOfQrvey> based on a <chartType> and Yes-No  as series type
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "<chartType>" chart
			And the user enter "Chart multi-series test" as bar chart name
			And the user selects "Multiple Choice" from "category" dropdown
			And the user selects "Numeric" from "value" dropdown
			And the user selects "Average" from "aggregate" dropdown
			And the user clicks on chart options tab
			And the user adds a new layer
			And the user opens the first combo panel
			And the user picks "Multi-Series" from "chart-options" layer dropdown
			And the user picks "Yes-No" from "series" dropdown
			And the user clicks on save chart button
		Then a custom panel should be displayed with "Chart multi-series test" as title
			And the y axis label number 1 on combo should be "Numeric"
			And the "x" axis label should be "Multiple Choice"
			And the number of "<chartText>" groups should be 2
			And a multi series tooltip should appear on each symbol point

		Examples:
			| typeOfQrvey     	| chartType 	| chartText |
			| forms           	| symbol_chart 	| symbol	|
			| survey           	| symbol_chart 	| symbol	|
			| quiz           	| symbol_chart 	| symbol	|

	@multiSeries @multiSeriesBar
	Scenario Outline: The user creates a multi series on a <typeOfQrvey> based on a <chartType> and Yes-No as series type
		Given the user has a webform app with a "<typeOfQrvey>" with all questions types with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And user selects "custom" from dropdown on "<typeOfQrvey>"
			And the user clicks on add chart
			And the user selects "<chartType>" chart
			And the user enter "Chart multi-series test" as bar chart name
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
		Then a custom panel should be displayed with "Chart multi-series test" as title
			And the y axis label number 1 on combo should be "Numeric"
			And the "x" axis label should be "Multiple Choice"
			And the number of "<chartText>" groups should be 2
			And the bars should be displayed as "<visualization>"
			And a multi series tooltip should appear on each bar

		Examples:
			| typeOfQrvey     	| chartType 	| chartText | visualization |
			| forms           	| bar_chart 	| bar		| cluster 		|
			| forms           	| bar_chart 	| bar		| stacked 		|
			| forms           	| bar_chart 	| bar		| 100	 		|
			| survey           	| bar_chart 	| bar		| cluster 		|
			| survey           	| bar_chart 	| bar		| stacked 		|
			| survey           	| bar_chart 	| bar		| 100	 		|
			| quiz           	| bar_chart 	| bar		| cluster 		|