Feature: My orders list
	As a registered customer I want to be able to see my order history
	so that I can see what've I ordered earlier

	Background:
		Given that I'm logged in as customer

	Scenario: Opening my order history
		Given that I can see the main page containing the product list
		When I click on the link 'My orders' in the top right corner
		Then the product list should be replaced by a list containing my order history

	Scenario: Checking out an old order to see the details
		Given that I can see my order history
		When I click on one of the rows in the list containing my old orders
		Then the orders list should be replaced by a page showing total cost and products ordered

	# Scenario: Going back to 'My orders' page
	# 	Given that I can see an order's details
	# 	When I click on the link 'My orders'
	# 	Then the order details page should be replaced by a list containing my order history

	# Scenario: Going back to main page
	# 	Given that I can see my order history
	# 	When I click on the link 'Main page'
	# 	Then the list with my order history should be replaced with the original product list
