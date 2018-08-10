@analiticQ @analyzing @complete @quiz @quizAnalyzing

Feature: Applying a filter to multiple choice question results in quiz

	As an user
	I want see the results of a multiple choice question
	In order to analyse them by looking at the different predefined options that have been answered

	@analyzingMultpleChoiceQuestionResults @invento
	Scenario Outline: The user filters the results of a multiple choice question in quiz with <numAnswers> answers
		Given that there is a webform app with a "quiz" with a "multiple choice" question that has <numAnswers> answers
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on the filter button
			And the user clicks on the "<filteredAnswer>" filter as text
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the "<filteredAnswer>" multiple choice answer filter should appear in the histogram filters
			And the number answers should be more than 0

		Examples:
			| numAnswers | filteredAnswer     |
			| 8          | Jon Snow           |
			| 13         | Tyrion Lannister   |
			| 21         | Daenerys Targaryen |
			| 34         | Arya Stark         |
			| 55         | Ghost              |