Feature: Shopping Cart
	As a user I want to be able to add products to my shopping cart
    and see the quantity added along with price aswell as a total sum
    of all my products in the shopping cart

	Scenario: Adding product to shopping cart
		Given that I can see the products on main page
		When I click on the buy button for "Bath sponge - Green, 15x10x5"
		Then the product "Bath sponge - Green, 15x10x5" gets added to my shopping cart

	Scenario: Adding more products to shopping cart
		Given that I already have added "Bath sponge - Green, 15x10x5" in my shopping cart
		When I add "Star Wars: Episode IV - A New Hope" to my shopping cart
		Then "Star Wars: Episode IV - A New Hope" is added to the shopping cart and total sum is displayed

    Scenario: Adding more quantity of previous product
		Given that I already have "Bath sponge - Green, 15x10x5" in my shopping cart
		When I add "Bath sponge - Green, 15x10x5" product to my shopping cart again
		Then the quantity of "Bath sponge - Green, 15x10x5" is increased without adding a new product
