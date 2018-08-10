default: serve

confNode:
	cd ../Install/InstallUtility && node app.js downloadfile qrveyfiles123 devFiles/dev/localkeys.js ../../qrvey-common/config/localkeys.js

serve:
	clear && cd ../Code && INSTALLTYPE="INAPP" node server

sss-port:
	clear && selenium-standalone start -- -port 4446

install:
	clear && sudo npm install && clear && sudo ./node_modules/protractor/bin/webdriver-manager update --chrome --versions.chrome 2.35 && clear && sudo ./node_modules/.bin/webdriver-manager update --chrome --versions.chrome 2.35

install-dev:
	clear &&
	sudo npm install -g jasmine selenium-standalone selenium-webdriver &&
	sudo npm install selenium-standalone@latest -g &&
	sudo selenium-standalone install

gherkinlint:
	clear && ./node_modules/.bin/gherkin-lint .

qa-e2e-local:
	# clear && npm run e2e-local

qa-e2e-mobile:
	# clear && npm run e2e-mobile

qa-e2e-remote:
	# clear && npm run e2e-remote

installdrivers:
	clear && ./node_modules/protractor/bin/webdriver-manager update --chrome --versions.chrome 2.36

postinstall:
	clear && ./node_modules/.bin/webdriver-manager update --chrome --versions.chrome 2.36

# Easy Run
# parameters: accessing, editing, incontext, nps, polls, qrvey
# Exampple: make er-module arg=editing

er-module:
	clear && ./node_modules/protractor/bin/protractor cucumber_conf.js --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunLocal" --disableChecks

er-survey:
	clear && ./node_modules/protractor/bin/protractor cucumber_conf.js --cucumberOpts.tags="@survey" --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunLocal" --disableChecks

er-auto:
	clear && ./node_modules/protractor/bin/protractor cucumber_conf.automation.js --cucumberOpts.tags="@automation" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunLocal" --disableChecks

er-widget:
	clear && ./node_modules/protractor/bin/protractor cucumber_conf.js --cucumberOpts.tags="@widgets" --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunLocal" --disableChecks

er-all:
	clear && ./node_modules/protractor/bin/protractor cucumber_conf.js --cucumberOpts.tags="@complete" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunLocal" --cucumberOpts.tags="~@tests" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --disableChecks


# Remotes commands
rer-module:
	clear && ./node_modules/protractor/bin/protractor cucumber_conf.remote.js --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

rer-survey:
	clear && ./node_modules/protractor/bin/protractor cucumber_conf.remote.js --cucumberOpts.tags="@survey" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

rer-auto:
	clear && ./node_modules/protractor/bin/protractor cucumber_conf.remote.automation.js --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="@automation" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

rer-widget:
	clear && ./node_modules/protractor/bin/protractor cucumber_conf.remote.js  --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

rer-all:
	clear && ./node_modules/protractor/bin/protractor cucumber_conf.remote.js --cucumberOpts.tags="@complete" --cucumberOpts.tags="~@tests" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

# OEM commands
oem-module:
	clear && ./node_modules/protractor/bin/protractor cucumber_conf.oem.js --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

oem-survey:
	clear && ./node_modules/protractor/bin/protractor cucumber_conf.oem.js --cucumberOpts.tags="@survey" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

oem-auto:
	clear && ./node_modules/protractor/bin/protractor cucumber_conf.oem.automation.js --cucumberOpts.tags="@automation" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

oem-widget:
	clear && ./node_modules/protractor/bin/protractor cucumber_conf.oem.js  --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

oem-all:
	clear && ./node_modules/protractor/bin/protractor cucumber_conf.oem.js --cucumberOpts.tags="@complete" --cucumberOpts.tags="~@tests" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks


# BrowserStack commands
bs-module:
	clear && ./node_modules/protractor/bin/protractor browserstack_conf.remote.js --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@tests" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

bser-module:
	clear && ./node_modules/protractor/bin/protractor browserstack_conf.jenkins.js --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@tests" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

bser-module-new:
	clear && ./node_modules/protractor/bin/protractor browserstack_conf.jenkins.new.js --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@tests" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

bser-survey:
	clear && ./node_modules/protractor/bin/protractor browserstack_conf.jenkins.js --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="@survey" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

bser-auto:
	clear && ./node_modules/protractor/bin/protractor browserstack_conf.jenkins.automation.js --cucumberOpts.tags="@automation" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

bser-widget:
	clear && ./node_modules/protractor/bin/protractor browserstack_conf.jenkins.js --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --cucumberOpts.tags="~@smokeTest" --disableChecks

bser-smoketests:
	clear && ./node_modules/protractor/bin/protractor browserstack_conf.jenkins.js --cucumberOpts.tags="@smokeTest" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --disableChecks

bser-sanitytests:
	clear && ./node_modules/protractor/bin/protractor browserstack_conf.jenkins.js --cucumberOpts.tags="@sanityTest" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --disableChecks


uxui: # make uxui
	clear && cd ../Code/UI/ && sudo gulp html

deleteQrveys: # Exampple: deleteQrveys arg=jonathan.olier@qrvey.com
	cd ../Integrations/qdataexport/ && node app.js deleteuserqrveys $(arg)

deleteReports:
	cd reports/xml/ && rm * && cd ../json/ && rm * && cd ../html/screenshot/ && rm * && cd ../ && rm *

allurereport:
	cd reports/ && allure generate "xml/" -o "allure-report" --clean

allureopen:
	cd reports/allure-report && allure open

#Gitter
stater:
	clear && sudo git status

commiter:
	sudo git add . && sudo git commit -m "chore(*): $(arg)"

puller:
	sudo git pull origin $(arg)

pusher:
	sudo git push origin $(arg)

merger:
	sudo git merge $(arg)

uploader: commiter puller pusher

basher:
	clear && sudo git status && sudo git pull origin $(arg) && sudo git checkout $(arg2) && sudo git pull origin $(arg2) && sudo git checkout $(arg) && sudo git merge $(arg2) && sudo git push origin $(arg)


#Unit Dependencies
unitDep:
	clear && sudo npm install karma karma-jasmine jasmine-core karma-jasmine karma-chrome-launcher phamtonjs karma-phantomjs-launcher && sudo npm install -g karma-cli jasmine

PHONY: serve
