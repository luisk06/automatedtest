@analyticQ @qrvey @bucketing @bucketingingNumeric @complete

Feature: Bucketing numeric question answers

	As an user
	I want to bucket numeric answers
	In order to analyze grouped results.

	@bucketingingNumericDeletion
	Scenario Outline: The user puts numeric answers of a <textOfQrvey> on a bucket
		Given that there is a webform app with a <typeOfQrvey> with a "numeric" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And user clicks on the bucket button number 1 on <typeOfQrvey>
			And user deletes the following numeric buckets:
				| buckets |
				| 1       |
				| 2       |
				| 4       |
				| 5       |
				| 7       |
				| 8       |
			And the user clicks on "apply_bucket" "button"
		Then the total of "numeric-bar" should be <barsShowed>

		Examples:
			| textOfQrvey   | typeOfQrvey          | numAnswers | barsShowed |
			| Survey        | "survey"             | 25         | 4          |

	@bucketingingNumericCreation
	Scenario Outline: The user deletes numeric answers of a <textOfQrvey> on a bucket
		Given that there is a webform app with a <typeOfQrvey> with a "numeric" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And user clicks on the bucket button number 1 on <typeOfQrvey>
			And user deletes all numeric buckets
			And user creates 2 numeric buckets separated by 425 px
			And the user clicks on "apply_bucket" "button"
		Then the total of "numeric-bar" should be <barsShowed>

		Examples:
			| textOfQrvey   | typeOfQrvey          | numAnswers | barsShowed |
			| Survey        | "survey"             | 25         | 4          |