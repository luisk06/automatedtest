@complete @automation @making @processes @createSchedulingProcesses

Feature: The user creates processes of scheduling type

	As an user
	I want to create processes
	In order to automate the send of emails

	Scenario: The user creates a single process as scheduling to run in background
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opened his app on "workflows"
			And the user has a process "scheduling"
			And the user opened his app on "workflows"
		When the user opens the first "scheduling" process
			And the user selects the king of repeater as "daily"
			And the user selects the king of repeater every as 2 days
			And the user selects the start Date
			And the user selects the hours to every day as 10:00 in "am"
			And the user adds an action as default
			And the user clicks on Activate
		Then the process is saved

	Scenario Outline: The user creates an advanced process as scheduling <repeater> at <hours><hoursType>
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opened his app on "workflows"
			And the user has a process "scheduling"
			And the user opened his app on "workflows"
		When the user opens the first "scheduling" process
			And the user selects the king of repeater as "<repeater>"
			And the user selects the king of repeater every as <repeaterEvery> days
			And the user selects the start Date
			And the user selects the hours to every day as <hours> in "<hoursType>"
			And the user adds an action as default
			And the user clicks on Activate
		Then the process is saved

	 	Examples:
			| repeater | repeaterEvery | hours  | hoursType |
			| daily    | 2             | 10:00  | am        |
			| weekly   | 3             | 10:00  | am        |
			| monthly  | 4             | 10:00  | am        |

	Scenario Outline: The user creates a single process as scheduling <repeater> at <hours><hoursType>
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opened his app on "workflows"
			And the user has a process "scheduling"
			And the user opened his app on "workflows"
		When the user opens the first "scheduling" process
			And the user selects the king of repeater as "<repeater>"
			And the user selects the king of repeater every as 2 days
			And the user selects the start Date
			And the user selects the hours to every day as <hours> in "<hoursType>"
			And the user selects the "include-end-date" check
			And the user selects the "after" check
			And the user selects the end time after <endTimeAfter> times
			And the user adds an action as default
			And the user clicks on Activate
		Then the process is saved

	 	Examples:
			| repeater | repeaterEvery | hours  | hoursType | endTimeAfter |
			| daily    | 2             | 10:00  | am        | 2            |
			| weekly   | 3             | 10:00  | am        | 3            |
			| monthly  | 4             | 10:00  | am        | 4            |