Feature: Product list
	As a user I want to be able to see detailed information
	about a product so that I can make better decision if I
	want to bye the product that I am looking at
	Also, I want to be able to change the quantity near the buy button for a product

	Scenario: Clicking on the product name
		Given that I can see the product list
		When I click on the product name for "Bath sponge - Green, 15x10x5"
		Then a page with more information on the product "Bath sponge - Green, 15x10x5" should be shown

	Scenario: Clicking on the Up button for quantity
		Given that I can see the product list
		When I click on the quantity increase button for "Bath sponge - Green, 15x10x5"
		Then the number that was displayed in the quantity box for "Bath sponge - Green, 15x10x5" before the click should increase by one

	Scenario: Clicking on the Down button for quantity
		Given that I can see the product list
		When I click on the quantity decrease button for "Bath sponge - Green, 15x10x5"
		Then the number that was displayed in the quantity box for "Bath sponge - Green, 15x10x5" before the click should decrease by one
