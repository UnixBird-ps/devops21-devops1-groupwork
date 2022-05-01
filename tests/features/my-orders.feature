Feature: My orders list
	As a registered customer I want to be able to see my order history
	so that I can see what've I ordered earlier

	Scenario: Opening my order history
		Given that I'm logged in as customer and can see the main page containing the product list
		When I click on the link 'My orders' in the top right corner
		Then my order history should be displayed

	Scenario: Checking out an old order to see the details
		Given that I can see my order history
		When I click on one of the rows in the list containing my old orders
		Then the orders list should be replaced by a page showing total cost and products ordered for a order

	Scenario: Going back to 'My orders' page
		Given that I can see an order's details
		When I click on the button 'Back to My orders'
		Then my order history should be displayed

	Scenario: Going back to main page
		Given that I can see my order history
		When I click on the link 'Home' in the top right corner
		Then the product list should be displayed
