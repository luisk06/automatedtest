@analyticQ @qrvey @bucketing @bucketingingExpression @complete

Feature:  Bucketing expression question answers

	As an user
	I want to bucket expression answers
	In order to analyze grouped results.

	@bucketingingExpressionCreation
	Scenario Outline: The user puts expression answers of a <typeOfQrvey> on a bucket
		Given that there is a webform app with a "<typeOfQrvey>" with a "expression" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And user clicks on the bucket button number 1 on "<typeOfQrvey>"
			And the user create 2 "expression" buckets
			And the user adds 3 question to bucket 1
			And the user adds 2 question to bucket 2
			And the user clicks on "apply_bucket" "button"
		Then the total of "bucket-label" should be 2

		Examples:
			| typeOfQrvey  	| numAnswers |
			| survey     	| 25         |

	@bucketingingExpressionCategoriesCreation
	Scenario Outline: The user puts expression with categories answers of a <typeOfQrvey> on a bucket
		Given that there is a webform app with a "<typeOfQrvey>" with a "expression_with_categories" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And user clicks on the bucket button number 1 on "<typeOfQrvey>"
			And the user create 2 "positive" buckets
			And the user adds 3 question to "positive" bucket 1
			And the user adds 2 question to "positive" bucket 2
			And the user moves to "negative" answers
			And the user create 2 "negative" buckets
			And the user adds 3 question to "negative" bucket 1
			And the user adds 2 question to "negative" bucket 2
			And the user clicks on "apply_bucket" "button"
		Then the total of "bucket-label" should be 4

		Examples:
			| typeOfQrvey  	| numAnswers |
			| survey     	| 25         |

	@bucketingingExpressionDeletion
	Scenario Outline: The user deletes a bucket on a expression answers on a <typeOfQrvey>
		Given that there is a webform app with a "<typeOfQrvey>" with a "expression" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And user clicks on the bucket button number 1 on "<typeOfQrvey>"
			And the user create 2 "expression" buckets
			And the user adds 3 question to bucket 1
			And the user adds 2 question to bucket 2
			And the user clicks on "delete_bucket" "button" on bucket 1
		Then the total of "bucket-answer" should be 3
			And the total of "bucket-item" should be 1

		Examples:
			| typeOfQrvey  	| numAnswers |
			| survey     	| 25         |

	@bucketingingExpressionCategoriesDeletion
	Scenario Outline: The user deletes expression with categories answers of a <typeOfQrvey> on a bucket
		Given that there is a webform app with a "<typeOfQrvey>" with a "expression_with_categories" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And user clicks on the bucket button number 1 on "<typeOfQrvey>"
			And the user create 2 "positive" buckets
			And the user adds 3 question to "positive" bucket 1
			And the user adds 2 question to "positive" bucket 2
			And the user moves to "negative" answers
			And the user create 2 "negative" buckets
			And the user adds 3 question to "negative" bucket 1
			And the user adds 2 question to "negative" bucket 2
			And the user moves to "positive" answers
			And the user clicks on "delete_bucket" "button" on bucket 1
			And the user moves to "negative" answers
			And the user clicks on "delete_bucket" "button" on bucket 1
		Then the total of "bucket-answer" on "positive" side should be 3
			And the total of "bucket-item" should be 1
			And the total of "bucket-answer" on "negative" side should be 3
			And the total of "bucket-item" should be 1

		Examples:
			| typeOfQrvey  	| numAnswers |
			| survey     	| 25         |

	@bucketingingExpressionReset
	Scenario Outline: The user reset a bucket on a expression answers on a <typeOfQrvey>
		Given that there is a webform app with a "<typeOfQrvey>" with a "expression" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And user clicks on the bucket button number 1 on "<typeOfQrvey>"
			And the user create 2 "expression" buckets
			And the user adds 3 question to bucket 1
			And the user adds 2 question to bucket 2
			And the user clicks on "reset_bucket" "button"
		Then the total of "bucket-answer" should be 5
			And the total of "bucket-item" should be 0

		Examples:
			| typeOfQrvey  	| numAnswers |
			| survey     	| 25         |

	@bucketingingExpressionCategoriesReset
	Scenario Outline: The user resets an expression question with categories of a <typeOfQrvey> on a bucket
		Given that there is a webform app with a "<typeOfQrvey>" with a "expression_with_categories" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And user clicks on the bucket button number 1 on "<typeOfQrvey>"
			And the user create 2 "positive" buckets
			And the user adds 3 question to "positive" bucket 1
			And the user adds 2 question to "positive" bucket 2
			And the user moves to "negative" answers
			And the user create 2 "negative" buckets
			And the user adds 3 question to "negative" bucket 1
			And the user adds 2 question to "negative" bucket 2
			And the user clicks on "reset_bucket" "button"
		Then the total of "bucket-answer" on "positive" side should be 5
			And the total of "bucket-item" should be 0
			And the total of "bucket-answer" on "negative" side should be 5
			And the total of "bucket-item" should be 0

		Examples:
			| typeOfQrvey  	| numAnswers |
			| survey     	| 25         |