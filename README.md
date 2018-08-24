# Documentation about Automated Tests Develop

![automated tests logo](docs/images/automated_logo.png)

## What is the purpose of creating an automated test?

The main purpose of each automated test is safeguard the application behavior on each new change that is coming every build, either good or bad, because too is so important know if the aplication answer according to the needs when a fault occurs. All tests must report each bug founded on the application to have the opportunity to fix them.


## What do you have before to start?

You'll need to have the next credentials:

- [AWS](https://us-east-1.signin.aws.amazon.com/)
- [Bitbucket](https://bitbucket.org/)
- [Jenkins](http://34.237.64.248:8080/)
- [Testrails](https://qrvey.testrail.net/)
- [Jira](https://qrveydev.atlassian.net/)
- [BrowserStack](https://www.browserstack.com/)


## What do you need to have installed before to run the automated tests?

You'll need to install the next items list on your computer in the same order:

- [NodeJs](https://nodejs.org/es/download/)
- NPM (It comes included with NodeJs)
- [VScode](https://code.visualstudio.com/download)
- [Xcode](https://www.moncefbelyamani.com/how-to-install-xcode-homebrew-git-rvm-ruby-on-mac/)
- [Git](https://git-scm.com/downloads)
- [N](https://www.npmjs.com/package/n)


## What versions should I have installed of each one?

- NodeJs: **6.9.1**
- NPM: **^3.10.8**
- Git: **^2.15.2**
- Protractor: **5.4.0** (Will be installed with the npm dependencies)
- Chrome Driver: **2.40** (Will be installed with the npm dependencies)
- Chrome: **latest** (Should be installed manually)
- VScode: **latest**
- Xcode: **latest**


## What I should do if currently I have installed other Nodejs version?

Currently you should has installed N, this package will allow you change the nodejs version whenever you want it, just need to run this command: `sudo n 6.9.1`, if is the first time, the version package will be downloaded but if you have installed before just will changed it.


## How I should install the npm packages needed to run the project?

Actually it's easier since just need to run this command on the root folder: ` npm install `, this command allow you install all the packages needed to run the automated tests, where bascially you going to have available this items list:

- [async](https://www.npmjs.com/package/async)
- [chai](https://www.npmjs.com/package/chai)
- [chai-as-promised](https://www.npmjs.com/package/chai-as-promised)
- [chance](https://www.npmjs.com/package/chance)
- [colors](https://www.npmjs.com/package/colors)
- [cucumber](https://www.npmjs.com/package/cucumber)
- [cucumber-html-reporter](https://www.npmjs.com/package/cucumber-html-reporter)
- [cucumberjs-allure-reporter](https://www.npmjs.com/package/cucumberjs-allure-reporter)
- [find](https://www.npmjs.com/package/find)
- [glob](https://www.npmjs.com/package/glob)
- [lodash](https://www.npmjs.com/package/lodash)
- [moment](https://www.npmjs.com/package/moment)
- [protractor](https://www.npmjs.com/package/protractor)
- [protractor-cucumber-framework](https://www.npmjs.com/package/protractor-cucumber-framework)
- [request](https://www.npmjs.com/package/request)
- [sinon-chai](https://www.npmjs.com/package/sinon-chai)
- [underscore](https://www.npmjs.com/package/underscore)

As develop depenedencies you going to have this ones:
- [allure-commandline](https://www.npmjs.com/package/allure-commandline)
- [gherkin-lint](https://www.npmjs.com/package/gherkin-lint)
- [karma](https://www.npmjs.com/package/karma)
- [karma-chai](https://www.npmjs.com/package/karma-chai)
- [karma-chai-as-promised](https://www.npmjs.com/package/karma-chai-as-promised)
- [karma-sinon](https://www.npmjs.com/package/karma-sinon)
- [karma-sinon-chai](https://www.npmjs.com/package/karma-sinon-chai)
- [log-timestamp](https://www.npmjs.com/package/log-timestamp)
- [mocha](https://www.npmjs.com/package/mocha)
- [node-notifier](https://www.npmjs.com/package/node-notifier)


## How's the project structure?

In the repository you'll found some folders called features, reports, runners, step_definitions and suports, and others files, and now a briefly description of each one.

| Folder Name      | Description                                                        |
|------------------|--------------------------------------------------------------------|
| features         | Each feature of the application that were builded with the .feature extension |
| reports          | All files that make up the reports like images, html, xml and more |
| runners          | Specific files that allow us to run the automated tests            |
| step_definitions | The scripts that having the protractor commands with the _steps.js extension |
| suports          | The files that help us to run or complete any test                 |
| docs             | The files that support this documentation file                     |

| File Name        | Description                                                 |
|------------------|-------------------------------------------------------------|
| .eslintrc.js     | Mainly the global variables are defined here                |
| .gitignore       | All files or folder that are skipped in the repository      |
| Makefile         | The command file to run the automated tests                 |
| package.json     | The npm file required to install all dependencies in the project |


## What I should to know before to run the automated tests?

As you know now, we have features and steps definitions and you'll need to know which are the part of each one before start to run the automated tests or create tham, so we going to explain all features of those ones.


#### Tags
The tags are identificators based on word to grouping a module or sub-module, and has a **AT (@)** after each word, usually be in the file top and describe the behavior of the feature in words for that reason each feature has at least 3 tags that should say if it's running or not, which is the main module and sub-module of this feature, and we have some tags are ready to run the features but the most escencials are these:

| Tag            | Description                                                    |
|----------------|----------------------------------------------------------------|
| @todo          | It'll allow you not run the feature if this feature it not completed or has bugs |
| @complete      | All features has this tags will run on the next build          |
| @noRunLocal    | It'll allow to run some feature on production but not on local |
| @noRunOutLocal | It'll allow to run some feature on local but not on production |


#### Description feature
This description has some special speficications, not just must say what it is the feature propousal else always must start with **"As an user"**, in the next new line must start with **I** like (I want, I can, I should, etc), and the next new line must start with **In order to** like (In order to have, In order to use), in all cases must respect uppercase and lowercase. The text must be short and must describe all what happens in the feature.


#### Scenario feature
Each scenario in this file should be described and based on the [gherking](https://docs.cucumber.io/gherkin/reference/) language.


#### Feature files
The features files has some specifics features to be a test case, the first is has some **tags**, next the **description** and next **each scenario** that should safeguard all the behavior feature, and finally must have the **.feature** extension.


#### Steps Definitions
This kind of files are written on Javascript language and has some specifics features to work fine, the first thing is that should has shotting the feature name splitted by undeslash and must finishing with the (**_steps.js**) like (**user_search_webform_steps.js**), and for more details about the strucutre please see the next image.

![step definition structure](/docs/images/steps_definitions_structure.png)


## How I should run the automated tests?

It's easier since you'll have at your disposal a commands list that will help you to run what ever kind of tests quickly and without change so much. Currently you'll have 4 scenarios to run an automated tests (localhost, locahost testing to qa enviroment, locahost testing to browserstack, qa enviroment testing to browserstack or production mode), in wherever case you going to invoke the Makefile (has the commands list) and next you going to call the scenario (er, rer, bs or bser), and next to the module name or sub-module or tag name being passed as argument parameter.

| Enviroment                            | Command                          |
|---------------------------------------|----------------------------------|
| localhost                             | make er-module arg=nameModule    |
| locahost testing to qa enviroment     | make rer-module arg=nameModule   |
| locahost testing to browserstack      | make bs-module arg=nameModule    |
| qa enviroment testing to browserstack | make bser-module arg=nameModule  |


## How the automated tests works internally?

![Automated Tests Schema](/docs/images/automated_tests_schema.png)


## References

##### What is TDD? (Test Driven Development)
http://agiledata.org/essays/tdd.html

##### What is DBB? (Behavior Driven Development)
https://semaphoreci.com/community/tutorials/behavior-driven-development

##### What is ATDD? (Acceptance Test Driven Development)
https://josepablosarco.wordpress.com/2015/03/31/tdd-vs-bdd-vs-atdd/

##### Protractor API
http://www.protractortest.org/#/api

##### The better practices
http://www.protractortest.org/#/style-guide

##### Error with timeout
http://www.protractortest.org/#/timeouts

##### Our models (How to use it)
http://www.protractortest.org/#/page-objects

##### What is Chai and whitch are your Promises? (Assertions for Promises)
http://chaijs.com/api/bdd/

##### More
http://ramonvictor.github.io/protractor/slides/#/53

##### Debugging
https://github.com/angular/protractor/blob/master/docs/debugging.md


![poweredby](/docs/images/powered_by.png)
![qrvey_logo](/docs/images/logo_exp.png)