Feature: Register and login pages
	As a user I want to be able to signup, login and logout on the page
	so that I can order products and see my order history

	Scenario: Clicking on the 'Register' link
		Given that I'm on the main page
		When I click on the 'Register' link
		Then a dialog with a registration form should appear on the page

	Scenario: Clicking on the 'Login' link
		Given that I'm on the main page
		When I click on the 'Login' link
		Then a dialog with a login form should appear on the page

	# Scenario: Clicking on the 'Logout' link
	# 	Given that I'm on the main page
	# 	When I click on the 'Logout' link
	# 	Then page with the list of products should be shown again
