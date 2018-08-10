@todo @making @rules @rulesMaking

Feature: The user creates new rules

	As an user
	I want to create a new rules
	In order for filter the answers

	Background:
		Given the user has "standard" plan
			And the user has login
			And the user has not rules
		When the user go to text categorization dashboard
			And the user clicks on Add Rule button
			And the user type the name and description rule
			And the user clicks on Create Rule button
			And the user opens the Category Block

	@smokeTest
	Scenario: The user creates a new rule
			And the user adds 1 new tag
			And the user adds 1 new include tag
			And the user adds 1 new exclude tag
			And the user go back to the dashboard
		Then in the dashboard should has 1 new rule
			And the new rule should has 1 category
			And the new rule should has 1 tag

	@smokeTest
	Scenario: The user creates a new rule with 20 tags
			And the user adds 20 new tag
			And the user adds 20 new include tag
			And the user adds 20 new exclude tag
			And the user go back to the dashboard
		Then in the dashboard should has 1 new rule
			And the new rule should has 1 category
			And the new rule should has 20 tag