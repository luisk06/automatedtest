@branches @complete @levelsBranches @bucketingsBranchesAnalyzing @Analize @branchesAnalyzing

Feature: Applying buckets to multiple levels branch question pannels on summary view

	As an user
	I want to answers branches with differents actions
	In order to collect extra-info depending on responses

	Scenario: The user applies a bucket to a branch question level 1 in a survey
		Given the user has a webform app with a "survey" with a "level1" branch with 25 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user opens created branches of level 1
			And user clicks on the bucket button number 1 on "survey"
			And the user create 2 "multiple_choice" buckets
			And the user adds 1 question to bucket 1
			And the user adds 1 question to bucket 2
			And the user clicks on "apply_bucket" "button"
		Then the total of "bucket-label" should be 2

	@bucketingsTestingAN
	Scenario: The user applies a bucket to a branch question level 2 in a survey
		Given the user has a webform app with a "survey" with a "level2" branch with 25 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user opens created branches of level 1
			And the user opens created branches of level 2
			And user clicks on the bucket button number 1 on "survey"
			And the user create 2 "multiple_choice" buckets
			And the user adds 1 question to bucket 1
			And the user adds 1 question to bucket 2
			And the user clicks on "apply_bucket" "button"
		Then the total of "bucket-label" should be 2

	Scenario: The user applies a bucket to a branch question level 3 in a survey
		Given the user has a webform app with a "survey" with a "level3" branch with 25 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user opens created branches of level 1
			And the user opens created branches of level 2
			And the user opens created branches of level 3
			And user clicks on the bucket button number 1 on "survey"
			And the user create 2 "multiple_choice" buckets
			And the user adds 1 question to bucket 1
			And the user adds 1 question to bucket 2
			And the user clicks on "apply_bucket" "button"
		Then the total of "bucket-label" should be 2

	Scenario: The user applies a bucket to a branch question level 4 in a survey
		Given the user has a webform app with a "survey" with a "level4" branch with 25 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user opens created branches of level 1
			And the user opens created branches of level 2
			And the user opens created branches of level 3
			And the user opens created branches of level 4
			And user clicks on the bucket button number 1 on "survey"
			And the user create 2 "multiple_choice" buckets
			And the user adds 1 question to bucket 1
			And the user adds 1 question to bucket 2
			And the user clicks on "apply_bucket" "button"
		Then the total of "bucket-label" should be 2

	@smokeTest1
	Scenario: The user applies a bucket to a branch question level 5 in a survey
		Given the user has a webform app with a "survey" with a "level5" branch with 25 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user opens created branches of level 1
			And the user opens created branches of level 2
			And the user opens created branches of level 3
			And the user opens created branches of level 4
			And the user opens created branches of level 5
			And user clicks on the bucket button number 1 on "survey"
			And the user create 2 "multiple_choice" buckets
			And the user adds 1 question to bucket 1
			And the user adds 1 question to bucket 2
			And the user clicks on "apply_bucket" "button"
		Then the total of "bucket-label" should be 2