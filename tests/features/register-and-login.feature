Feature: Register and login pages
	As a user I want to be able to signup, login and logout on the page
	so that I can order products and see my order history

	Scenario: Clicking on the 'Register' link
		Given that I'm on the main page
		When I click on the 'Register' link
		Then a dialog with a registration form should appear on the page

	Scenario: Signing up using the registration form
		Given that I see the registration form
		When I enter my info and click on the submit button
		Then the page should inform me that the registration was successful

	Scenario: Clicking on the 'Login' link
		Given that I'm on the main page
		When I click on the 'Login' link
		Then a dialog with a login form should appear on the page

	Scenario: Signing in using the login form
		Given that I see the login form
		When I enter my info and cklick on the submit button
		Then the page should inform me that the login was successful

	# Scenario: Clicking on the 'Logout' link
	# 	Given that I'm on the main page
	# 	When I click on the 'Logout' link
	# 	Then page with the list of products should be shown again
