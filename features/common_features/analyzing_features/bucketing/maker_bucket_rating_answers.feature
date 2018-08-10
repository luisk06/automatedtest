@analyticQ @qrvey @bucketing @bucketingingRating @complete

Feature: Bucketing rating question answers

	As an user
	I want to bucket rating answers
	In order to analyze grouped results.

	@bucketingingRatingCreation
	Scenario Outline: The user puts rating answers of a <typeOfQrvey> on a bucket
		Given that there is a webform app with a "<typeOfQrvey>" with a "rating" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And user clicks on the bucket button number 1 on "<typeOfQrvey>"
			And the user create 2 "rating" buckets
			And the user adds 3 question to bucket 1
			And the user adds 2 question to bucket 2
			And the user clicks on "apply_bucket" "button"
		Then the total of "bucket-label" should be 2

		Examples:
			| typeOfQrvey   | numAnswers |
			| survey        | 25         |

	@bucketingingRatingDeletion
	Scenario Outline: The user deletes a bucket on a rating answers on a <typeOfQrvey>
		Given that there is a webform app with a "<typeOfQrvey>" with a "rating" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And user clicks on the bucket button number 1 on "<typeOfQrvey>"
			And the user create 2 "rating" buckets
			And the user adds 3 question to bucket 1
			And the user adds 2 question to bucket 2
			And the user clicks on "delete_bucket" "button" on bucket 1
		Then the total of "bucket-answer" should be 3
			And the total of "bucket-item" should be 1

		Examples:
			| typeOfQrvey   | numAnswers |
			| survey        | 25         |

	@bucketingingRatingReset
	Scenario Outline: The user resets a bucket on a rating answers on a <typeOfQrvey>
		Given that there is a webform app with a "<typeOfQrvey>" with a "rating" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And user clicks on the bucket button number 1 on "<typeOfQrvey>"
			And the user create 2 "rating" buckets
			And the user adds 3 question to bucket 1
			And the user adds 2 question to bucket 2
			And the user clicks on "reset_bucket" "button"
		Then the total of "bucket-answer" should be 5
			And the total of "bucket-item" should be 0

		Examples:
			| typeOfQrvey   | numAnswers |
			| survey        | 25         |