@accessing @todo @filters

Feature: User filters created qrveys

	As an user
	I want to filter my created qrveys
	In order to see only the drafts, the active qrveys or the finished ones

	@filtersByDraft
	Scenario: the user filters by drafts qrveys
		Given that the user has qrveys in "Draft" state
			And the user has login
		When the user clicks on the "state" filter by dropdown
			And selects the "Draft" option in the filter
		Then only the qrveys in "Draft" state should be displayed

	@filtersByActive
	Scenario: the user filters by active qrveys
		Given that the user has qrveys in "Active" state
			And the user has login
		When the user clicks on the "state" filter by dropdown
			And selects the "Active" option in the filter
		Then only the qrveys in "Active" state should be displayed

	@filtersByFinished @smokeTest
	Scenario: the user filters by finished qrveys
		Given that the user has qrveys in "Finished" state
			And the user has login
		When the user clicks on the "state" filter by dropdown
			And selects the "Finished" option in the filter
		Then only the qrveys in "Finished" state should be displayed

	@filtersByAll
	Scenario: the user filters by all
		Given that the user has qrveys
			And the user has login
			And the user counts the qrveys
		When the user clicks on the "state" filter by dropdown
			And selects the "All" option in the filter
		Then the qrveys displayed should remain the same