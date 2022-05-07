# DevOps21 Methodology 1
[![Latest push to dev](https://github.com/UnixBird-ps/devops21-metodik1-groupwork/actions/workflows/dev.yml/badge.svg?event=push&branch=dev)]() dev &emsp;
[![Latest push to main](https://github.com/UnixBird-ps/devops21-metodik1-groupwork/actions/workflows/dev.yml/badge.svg?event=push&branch=main)]() main

A school assignment group work on CI/CD for course DevOps Metodik 1 using GitHub Actions.


**There are two branches that are used for deployment:**
- the main branch for deployment to production server.
- dev branch for deployment to dev server.

**When creating a new feature:**
- create a new branch based on the dev branch.
- When a feature branch is ready to be merged and all tests have passed, create a pull request to merge into dev.
*This will require a code review by one of the codeowners after creating a pull request.*

**Note:** No changes directly to the dev branch or main branch can be made from anyone without permissions.

If changes to the dev branch are ready for production it will then get merged into the main branch with a pull request.

We use a workflow file to run several tests on push and pull requests. *All tests must succeed for merges into dev or main branch.*

**There are two deployment servers:**
- Development
- Production

We deploy to these servers using the workflow file. Deployment happens automatically if all tests succeed but deployment to production server requires approvement.

**Following frameworks are used for tests:**
- Jest for unit tests.
- Newman for REST API tests.
- WebdriverIO for UI tests.

**The following folder structure is used in our CI/CD workflows:**
- Backend and frontend are in their separate folders /backend and /frontend.  
- Backend's data is stored in a SQlite database /backend/database/webshop.db.
- All tests are located in the folder /tests.  
- All features for tests are in the folder /tests/features.  
- All step-definitions for tests are in the folder /tests/step-definitions.  
- All REST API tests are in the file /tests/rest-api-test.postman_collection.json.
- Config for WebdriverIO is in the file /tests/wdio.conf.js.  
- Config for Jest is in the file /tests/jest.config.js.
