Feature: Register and login pages
	As a user I want to be able to signup, login and logout on the page
	so that I can order products and see my order history

	Scenario: Clicking on the 'Register' link
		Given that I'm on the main page and not signed in
		When I click on the 'Register' link
		Then a registration form should appear on the page

	Scenario: Signing up using the registration form
		Given that I can see the registration form
		When I enter my registration info and click on the submit button
		Then the page should inform me that the registration was successful

	Scenario: Clicking on the 'Login' link
		Given that I'm on the main page and not signed in
		When I click on the 'Login' link
		Then a login form should appear on the page

	Scenario: Signing in using the login form
		Given that I can see the login form
		When I enter my login info and click on the submit button
		Then the page should inform me that the login was successful

	Scenario: Clicking on the 'Logout' link
		Given that I'm currently signed in and on the main page
		When I click on the 'Logout' link
		Then the page should inform me that I was signed off
