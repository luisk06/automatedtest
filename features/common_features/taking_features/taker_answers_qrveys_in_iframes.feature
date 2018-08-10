@complete @qrvey @iframes

Feature: The user answers qrveys in iframe

	As an user
	I want to answer the qrvey
	into a iframe

	Scenario Outline: The user make a <qrveyName> and shared
		Given the user has an app
			And that the user has a "<qrveyName>" with iframe
		When the user open the "iframe"
			And the user take the qrvey on "<qrveyName>"
		Then the user should see to the take qrvey page

		Examples:
			| qrveyName     |
			| survey        |
			| nps           |
			| checklist     |
			| quiz          |