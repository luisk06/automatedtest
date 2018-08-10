@accessing @todo @filters

Feature: User filters created qrveys by type

As an user
I want to filter my created qrveys
In order to see only the surveys, the NPS, the audience poll, and the in-context feedback

	@filtersBySurvey
	Scenario: the user filters by surveys
		Given that the user has qrveys of "Survey" type
			And the user has login
		When the user clicks on the "type" filter by dropdown type
			And selects the "Survey" option in the filter type

	@filtersByNPS
	Scenario: the user filters by nps
		Given that the user has qrveys of "NPS" type
			And the user has login
		When the user clicks on the "type" filter by dropdown type
			And selects the "NPS" option in the filter type

	@filtersByPoll
	Scenario: the user filters by poll
		Given that the user has qrveys of "AudiencePoll" type
			And the user has login
		When the user clicks on the "type" filter by dropdown type
			And selects the "Poll" option in the filter type

	@filtersByAll
	Scenario: the user filters by all
		Given that the user has qrveys
			And the user has login
			And the user counts the qrveys
		When the user clicks on the "type" filter by dropdown
			And selects the "All" option in the filter type
		Then the qrveys displayed should remain the same