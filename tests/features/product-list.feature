Feature: Product list
	As a user I want to be able to see detailed information
	about a product so that I can make better decision if I
	want to buy the product that I am looking at

	Scenario: Clicking on the product name
		Given that I can see the product list
		When I click on the product name for "Bath sponge - Green, 15x10x5"
		Then a page with more information on the product "Bath sponge - Green, 15x10x5" should be shown
