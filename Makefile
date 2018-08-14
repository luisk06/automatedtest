default: serve

gherkinlint:
	clear && ./node_modules/.bin/gherkin-lint .

postinstall:
	clear && ./node_modules/.bin/webdriver-manager update --chrome --versions.chrome 2.36

# Easy Run
# parameters: accessing, editing, incontext, nps, polls, qrvey
# Exampple: make er-module arg=editing

er-module:
	clear && ./node_modules/protractor/bin/protractor runners/cucumber_conf.js --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunLocal" --disableChecks

er-survey:
	clear && ./node_modules/protractor/bin/protractor runners/cucumber_conf.js --cucumberOpts.tags="@survey" --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunLocal" --disableChecks

er-auto:
	clear && ./node_modules/protractor/bin/protractor runners/cucumber_conf.automation.js --cucumberOpts.tags="@automation" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunLocal" --disableChecks

er-widget:
	clear && ./node_modules/protractor/bin/protractor runners/cucumber_conf.js --cucumberOpts.tags="@widgets" --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunLocal" --disableChecks

er-all:
	clear && ./node_modules/protractor/bin/protractor runners/cucumber_conf.js --cucumberOpts.tags="@complete" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunLocal" --cucumberOpts.tags="~@tests" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --disableChecks


# Remotes commands
rer-module:
	clear && ./node_modules/protractor/bin/protractor runners/cucumber_conf.remote.js --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

rer-survey:
	clear && ./node_modules/protractor/bin/protractor runners/cucumber_conf.remote.js --cucumberOpts.tags="@survey" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

rer-auto:
	clear && ./node_modules/protractor/bin/protractor runners/cucumber_conf.remote.automation.js --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="@automation" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

rer-widget:
	clear && ./node_modules/protractor/bin/protractor runners/cucumber_conf.remote.js  --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

rer-all:
	clear && ./node_modules/protractor/bin/protractor runners/cucumber_conf.remote.js --cucumberOpts.tags="@complete" --cucumberOpts.tags="~@tests" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

# OEM commands
oem-module:
	clear && ./node_modules/protractor/bin/protractor runners/cucumber_conf.oem.js --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

oem-survey:
	clear && ./node_modules/protractor/bin/protractor runners/cucumber_conf.oem.js --cucumberOpts.tags="@survey" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

oem-auto:
	clear && ./node_modules/protractor/bin/protractor runners/cucumber_conf.oem.automation.js --cucumberOpts.tags="@automation" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

oem-widget:
	clear && ./node_modules/protractor/bin/protractor runners/cucumber_conf.oem.js  --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

oem-all:
	clear && ./node_modules/protractor/bin/protractor runners/cucumber_conf.oem.js --cucumberOpts.tags="@complete" --cucumberOpts.tags="~@tests" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks


# BrowserStack commands
bs-module:
	clear && ./node_modules/protractor/bin/protractor runners/browserstack_conf.remote.js --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@tests" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

bser-module:
	clear && ./node_modules/protractor/bin/protractor runners/browserstack_conf.jenkins.js --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@tests" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

bser-module-new:
	clear && ./node_modules/protractor/bin/protractor runners/browserstack_conf.jenkins.new.js --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="~@tests" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

bser-survey:
	clear && ./node_modules/protractor/bin/protractor runners/browserstack_conf.jenkins.js --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="@survey" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

bser-auto:
	clear && ./node_modules/protractor/bin/protractor runners/browserstack_conf.jenkins.automation.js --cucumberOpts.tags="@automation" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --disableChecks

bser-widget:
	clear && ./node_modules/protractor/bin/protractor runners/browserstack_conf.jenkins.js --cucumberOpts.tags="@$(arg)" --cucumberOpts.tags="@widgets" --cucumberOpts.tags="~@iframes" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --cucumberOpts.tags="~@smokeTest" --disableChecks

bser-smoketests:
	clear && ./node_modules/protractor/bin/protractor runners/browserstack_conf.jenkins.js --cucumberOpts.tags="@smokeTest" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --disableChecks

bser-sanitytests:
	clear && ./node_modules/protractor/bin/protractor runners/browserstack_conf.jenkins.js --cucumberOpts.tags="@sanityTest" --cucumberOpts.tags="~@todo" --cucumberOpts.tags="~@noRunOutLocal" --cucumberOpts.tags="~@widgets" --cucumberOpts.tags="~@iframes" --disableChecks


deleteReports: deleteXML deleteJSON deleteImage deleteHtml

deleteXML:
	@cd reports/xml/ && rm * || true

deleteJSON:
	@cd reports/json/ && rm * || true

deleteImage:
	@cd reports/html/screenshot/ && rm * || true

deleteHtml:
	@cd reports/html/ && rm * || true


# Allure
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

PHONY: serve
