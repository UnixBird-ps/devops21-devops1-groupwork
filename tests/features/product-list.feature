Feature: Product list
	As a user I want to be able to change the quantity near the buy button for a product
	Also, I want to be able to see detailed information
	about a product so that I can make better decision if I
	want to bye the product that I am looking at

	Scenario: Clicking on the Up button for quantity
		Given that I can see the product list
		When I click on the quantity increase button for "Bath sponge - Green, 15x10x5"
		Then the number in the quantity box for "Bath sponge - Green, 15x10x5" should increase by one

	Scenario: Clicking on the Down button for quantity
		Given that I can see the product list
		When I click on the quantity decrease button for "Bath sponge - Green, 15x10x5"
		Then the number in the quantity box for "Bath sponge - Green, 15x10x5" should decrease by one

	Scenario: Entering a number under 1 the quantity text box
		Given that I can see the product list
		When I click in the quantity text box and enter 0 for "Bath sponge - Green, 15x10x5"
		Then the content in the quantity box for "Bath sponge - Green, 15x10x5"
		     should return to the previous value

	Scenario: Entering a number above max limit in the quantity text box
		Given that I can see the product list
		When I click in the quantity text box and enter 101 for "Bath sponge - Green, 15x10x5"
		Then the content in the quantity box for "Bath sponge - Green, 15x10x5"
		     should return to the previous value

	Scenario: Clicking on the product name
		Given that I can see the product list
		When I click on the product name for "Bath sponge - Green, 15x10x5"
		Then a page with more information on the product "Bath sponge - Green, 15x10x5" should be shown
