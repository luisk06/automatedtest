@liveConnection @dataloaderLiveConnections @dataloader @elasticSearchPerformance

Feature: Creating a new dataloader live connection

	This test ensure a user can upload a index with more than X millon records into Qrvey.

	@smokeTest5 @sanityTest @gzipsccdatatest
	Scenario: The user create a new Elasticsearch connection with gzipsccdatatest index name
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "data_upload" board
		When the user clicks on the "elasticsearch" data upload option
			And the user clicks on the upload Data button
			And the user writes the connection string URL
			And the user clicks on the Test button on Elasticsearch Values Modal
			And the user clicks Next button on Elasticsearch Values Modal
			And the user search "gzipsccdatatest" on the index selection modal
			And the user clicks on the row 1 on the index selection table
			And the user clicks the next button on the index selection modal
			And the user clicks on the row 1 on the index type selection table
			And the user clicks to add on the index type selection modal
			And the user clicks to save on the identify data page
		Then the user should be in the dataloader analyze

	Scenario: The user create a new Elasticsearch connection with task_01 index name
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "data_upload" board
		When the user clicks on the "elasticsearch" data upload option
			And the user clicks on the upload Data button
			And the user writes the connection string URL
			And the user clicks on the Test button on Elasticsearch Values Modal
			And the user clicks Next button on Elasticsearch Values Modal
			And the user search "task_01" on the index selection modal
			And the user clicks on the row 1 on the index selection table
			And the user clicks the next button on the index selection modal
			And the user clicks on the row 1 on the index type selection table
			And the user clicks to add on the index type selection modal
			And the user clicks to save on the identify data page
		Then the user should be in the dataloader analyze