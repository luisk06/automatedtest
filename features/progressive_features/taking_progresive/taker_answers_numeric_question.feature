@taking @todo @numeric @numericTaker @progressiveTaking @progressiveTakingNumeric

Feature: The user answers numeric question in progressive

	As as user
	I want to answer a numeric question
	In order to express my answer with a specific number

	Scenario Outline: The user answers numeric question with <name> option as <answer> answer
		Given the user has an app
			And the user has a "progressive" with a "numeric_<name>" question
		When the user writes <answer> in the input
			And the input has <formatedAns> as answer
			And clicks on the Ok button in "progressive"
		Then the window should be hidden

		Examples:
			| name       | answer                              | formatedAns       |
			| general    | 00000000                            | 0                 |
			| general    | -1232341                            | -1232341          |
			| general    | 100980982121122                     | 100980982121122   |
			| general    | 1232145678909872                    | 123214567890987   |
			| general    | !"·$%&/(IOP?=)2                     | 2                 |
			| general    | !"·$%&/(IOP?=)-2.76                 | -276              |
			| general    | 0.0                                 | 0                 |
			| general    | -1                                  | -1                |
			| general    | -1.0                                | -10               |
			| number     | 100000000                           | 100,000,000       |
			| number     | -10                                 | -10               |
			| number     | -1023423423                         | -1,023,423,423    |
			| number     | 0.2342                              | 2,342             |
			| number     | !"·$%&/(IOP?=)-27345435346.8·$%&/(I | -273,454,353,468  |
			| currency   | 1234567890                          | $1,234,567,890    |
			| currency   | -2234234234                         | -$2,234,234,234   |
			| currency   | -223423.4234                        | -$2,234,234,234   |
			| currency   | 223423.4234                         | $2,234,234,234    |
			| currency   | 0.2342                              | $2,342            |
			| currency   | !"·$%&/(IOP?=)-27345435346.8·$%&/(I | -$273,454,353,468 |
			| percentage | +1234567890                         | 1,234,567,890%    |
			| percentage | -2234234234                         | -2,234,234,234%   |
			| percentage | -223423.4234                        | -2,234,234,234%   |
			| percentage | 223423.4234                         | 2,234,234,234%    |
			| percentage | 0.2342                              | 2,342%            |
			| percentage | !"·$%&/(IOP?=)-27345435346.8·$%&/(I | -273,454,353,468% |

	Scenario Outline: The user answers numeric question with <name> option as <answer> answer and decimals option checked on progressive Given the user has an app
			And the user has a "progressive" with a "numeric_<name>_decimal" question
		When the user writes <answer> in the input
			And the user clicks outside the input numeric field on the progressive
			And the user <formatedOnFocus> the numeric input on "progressive"
			And the <formatedOnFocus> input has <formatedAns> as answer on "progressive"
			And clicks on the Ok button in "progressive"
		Then the window should be hidden

		Examples:
			| name       | answer                              | formatedAns       | formatedOnFocus |
			| general    | .32                                 | 0.32              | focus           |
			| general    | -.32                                | -0.32             | focus           |
			| general    | !"·$%&/(IOP?=)-2.76                 | -2.76             | focus           |
			| general    | 0.0000001                           | 1e-7              | focus           |
			| general    | 1232145678909872                    | 123214567890987   | focus           |
			| general    | 3424.3456700000                     | 3424.34567        | focus           |
			| general    | -1.0                                | -1                | focus           |
			| number     | -1023432.312                        | -1,023,432.312    | not-focus       |
			| number     | 0.23421231                          | 0.23421231        | focus           |
			| number     | !"·$%&/(IOP?=)-27345435346.8·$%&/(I | -27,345,435,346.8 | not-focus       |
			| number     | .0000001                            | 1e-7              | focus           |
			| number     | -.0000001                           | -1e-7             | focus           |
			| currency   | -273563454.634                      | -$273,563,454.634 | not-focus       |
			| currency   | 0.2342                              | $0.2342           | not-focus       |
			| currency   | !"·$%&/(IOP?=)-27345435.8·$%&/(I    | -$27,345,435.8    | not-focus       |
			| currency   | .7684345                            | $.7684345         | not-focus       |
			| currency   | -.7684345                           | -$.7684345        | not-focus       |
			| percentage | -223423.4234                        | -223,423.4234%    | not-focus       |
			| percentage | .2342                               | .2342%            | not-focus       |
			| percentage | -.2342                              | -.2342%           | not-focus       |
			| percentage | !"·$%&/(IOP?=)-27345435.8·$%&/(I    | -27,345,435.8%    | not-focus       |