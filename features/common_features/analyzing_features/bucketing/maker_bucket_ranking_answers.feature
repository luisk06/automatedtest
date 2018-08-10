@analyticQ @qrvey @bucketing @bucketingingRanking @complete
Feature: Bucketing ranking question answers

	As an user
	I want to bucket ranking answers
	In order to analyze grouped results.

	@bucketingingRankingCreation
	Scenario Outline: The user puts ranking answers of a <textOfQrvey> on a bucket
		Given that there is a webform app with a <typeOfQrvey> with a "ranking" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And user clicks on the bucket button number 1 on <typeOfQrvey>
			And the user create 2 "ranking" buckets
			And the user adds 2 question to bucket 1
			And the user adds 2 question to bucket 2
			And the user clicks on "apply_bucket" "button"
		Then the total of bucket label should be 2

		Examples:
			| textOfQrvey   | typeOfQrvey          | numAnswers |
			| Survey        | "survey"             | 25         |

	@bucketingingRankingDeletion
	Scenario Outline: The user deletes a bucket on a ranking answers on a <textOfQrvey>
		Given that there is a webform app with a <typeOfQrvey> with a "ranking" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And user clicks on the bucket button number 1 on <typeOfQrvey>
			And the user create 2 "ranking" buckets
			And the user adds 2 question to bucket 1
			And the user adds 2 question to bucket 2
			And the user clicks on "delete_bucket" "button" on bucket 1
		Then the total of "bucket-answer" should be 2
			And the total of "bucket-item" should be 1

		Examples:
			| textOfQrvey   | typeOfQrvey          | numAnswers |
			| Survey        | "survey"             | 25         |

	@bucketingingRankingReset
	Scenario Outline: The user deletes a bucket on a ranking answers on a <textOfQrvey>
		Given that there is a webform app with a <typeOfQrvey> with a "ranking" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And user clicks on the bucket button number 1 on <typeOfQrvey>
			And the user create 2 "ranking" buckets
			And the user adds 2 question to bucket 1
			And the user adds 2 question to bucket 2
			And the user clicks on "reset_bucket" "button"
		Then the total of "bucket-answer" should be 4
			And the total of "bucket-item" should be 0

		Examples:
			| textOfQrvey   | typeOfQrvey          | numAnswers |
			| Survey        | "survey"             | 25         |