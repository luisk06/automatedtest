@complete @analyzing @metricBuilder

Feature: Managing metric to the application

	As an user
	I want add to show the metrics
	In order to analyze the answers

	Scenario: The user add a new metric
		Given the user has an app
			And that there is a ES connection
			And the user has login
			And the user opens the just created app
		When the user clicks on Add Metric button
			And the user sets the "name" into the metric builder
			And the user sets the "description" into the metric builder
			And the user opens the dataset drowdown
			And the user selects the dataset
			And the user opens the value drowdown
			And the user selects the value
			And the user opens the aggregate drowdown
			And the user selects the aggregate
			And the user clicks on the save button into the metric modal
		Then the metric dashaboard should have at least 1 panel
			And the metric panel saved notify should be displayed

	Scenario: The user duplicates a metric
		Given the user has an app
			And that there is a ES connection
			And the user have a metric on the builder
			And the user has login
			And the user opens the just created app
		When the user clicks on panel menu
			And the user clicks on duplicate option
		Then the metric dashaboard should have 2 panel
			And both panels should be equal

	Scenario: The user deletes a metric
		Given the user has an app
			And that there is a ES connection
			And the user have a metric on the builder
			And the user has login
			And the user opens the just created app
		When the user clicks on panel menu
			And the user clicks on delete option
			And the user clicks on Ok button in the modal
		Then the metric dashaboard should have 0 panel