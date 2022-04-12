Feature: Shopping Cart
	As a user I want to be able to add products to my shopping cart
    and see the quantity added along with price aswell as a total sum
    of all my products in the shopping cart

	Scenario: Adding product to shopping cart
		Given that I can see the product list
		When I click on the buy button for "Bath sponge - Green, 15x10x5"
		Then the product "Bath sponge - Green, 15x10x5" gets added to my shopping cart

	Scenario: Adding more products to shopping cart
		Given that I already have added "Bath sponge - Green, 15x10x5" in my shopping cart
		When I add "Star Wars: Episode IV - A New Hope" to my shopping cart
		Then add "Star Wars: Episode IV - A New Hope" to shopping cart and show total sum

    Scenario: Adding more quantity of previous product
		Given that I already have "Bath sponge - Green, 15x10x5" in my shopping cart
		When I add "Bath sponge - Green, 15x10x5" product to my shopping cart again
		Then increase quantity of "Bath sponge - Green, 15x10x5" without adding a new product
