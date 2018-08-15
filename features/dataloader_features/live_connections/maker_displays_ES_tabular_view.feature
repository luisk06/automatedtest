@complete @liveConnection @dataloaderLiveConnections @dataloader @elasticSearchTabularView

Feature: Elastic search live connection tabular view column limits

	As user I want to see the tabluar view on my Elasticsearch in live with columns limits

	@newElasticsearchConnection
	Scenario: The user create a new Elasticsearch connection and check if there are only 10 columns selected on tabular view
		Given the user has an app
			And that there is a ES connection
			And the user has login
			And the user opens the just created app
			And the user opens the "data_upload" board
			And the user clicks on the record button
		When the user go to the Tabular View
			And the user clicks on select columns menu
		Then there should be only 10 columns selected