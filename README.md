# devops21-groupwork-1

A CI/CD group work for course DevOps Metodik 1 using GitHub Actions.


We use two main branches, the main branch and the dev branch.  
New feature branches are branched off of the dev branch.  
When they are ready to be merged back to the dev branch a pull request should be created.  
A code review will then be required by the code owner.

When we are happy with the dev branch and all necessary merges have been made from the feature branches  
then a pull request to the main branch should be made.

We use a workflow file to run some tests on the code. A merge to dev or main branches will not happen if the tests fail.  
We use Jest for unit tests, Newman for REST API tests, and WebdriverIO for BDD tests.

We will be adding a deployment step to our workflow file as soon as we have two servers available for the dev and main branches.  
  
The following folder structure is used in our CI/CD workflows.

Backend and frontend are in their separate folders /backend and /frontend.  
Backend's data is stored in a SQlite database /backend/database/webshop.db.

All tests are in the folder /tests.  
All features are in the folder /tests/features.  
All step-definitions are in the folder /tests/step-definitions.  
All REST API tests are in the file /tests/rest-api-test.postman_collection.json.

Config for WebdriverIO is in the file /tests/wdio.conf.js.  
Config for Jest is in the file /tests/jest.config.js.
