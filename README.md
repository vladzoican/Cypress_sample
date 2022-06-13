## **Cypress_sample**
======================================

This project has been created in order to perform tests on Utrust sandbox environment.

The testing framework used is Cypress, JavaScript based

## Install Cypress
[Follow these instructions to install Cypress.](https://on.cypress.io/installing-cypress)

## How to run locally
- Clone the git repository to your computer
```
git init
git clone https://github.com/vladzoican/Cypress_sample.git
```
- Open Visual Studio Code or any IDE supporting JavaScript

- Open new terminal 
- Run 'npx cypress open' command
- Once the Cypress app is started, select E2E Testing
- Start E2E Testing in the desired browser option
- Select 'sampleTest.cy.js' e2e tests file
- Enjoy

## Implementation decisions

1. Added the following properties to cypress.config.js file
- baseUrl (in order for all the tests to share the same prefix via cy.visit() command)
- viewportWidth and viewportHeight (set to a 16:10 resolution - 1920x1080, common for computer monitors, also to satisfy the condition of the second test step: "2. Select “Payments” in the left bar")
- experimentalSessionAndOrigin (set to "true", in order to enable cy.session() command)
2. Created sampleTest.cy.js test file in e2e folder
3. Created new custom command for login in commands.js, under support folder, in order to cache the session data and use it in beforeEach hook
4. Defined test constants in sampleTest.cy.js file, under test suite description, to be further used when creating invoices
5. Added previously created custom command in the beforeEach hook (which uses cy.session()), in order to restore the initial session data in the beginning of each test
6. Performed all the mentioned steps and along the way I have also asserted what I thought was relevant (e.g. invoice creation field validations, data correctness, expected page is displayed, etc)

## Questions addressed

**Question 1:**
**We want to run this scenario automatically and frequently.**
**What process/setup/tools would you choose to achieve this?**

Use Cypress + Github Actions for automatic test run on pull requests, 
create task scheduler task for triggering the test runs locally, on windows,
using any of the desired browsers: chrome/firefox/opera/edge/safari, etc

**Question 2:**
**On step 5, the system is supposed to send an email. How would you check if the email was really received to the email address?**

Option 1. Use Gmail and enable the Gmail API on our account, and enable performing calls directly using our email address.
Option 2. Create a scenario which logs into our email address
 and checks that the email is received


**Question 3:**
**How would you test the same scenario on different screen sizes?**

By testing multiple viewports dynamically, in the Cypress solution


