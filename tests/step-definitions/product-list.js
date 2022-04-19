const { Given, When, Then } = require( '@wdio/cucumber-framework' );
const pauseTime = 1000;


Given(
	'that I can see the product list',
	async () =>
	{
		await browser.url( '/' );
		await $( '.productInList h3' ).waitForClickable();
	}
);


When(
	/^I click on the product name for "(.*)"$/,
	async ( productName ) =>
	{
		let products = await $$( '.productInList' );
		let foundProduct;
		for ( let product of products )
		{
			if ( ( await product.getText() ).includes( productName ) )
			{
				foundProduct = product;
			}
		}
		expect( foundProduct ).toBeTruthy();
		await foundProduct.scrollIntoView( true );
		let titleEl = await foundProduct.$( 'h3' );
		await titleEl.click();
	}
);


Then(
	/^a page with more information on the product "(.*)" should be shown$/,
	async ( productName ) =>
	{
		let lBackBtn = await $( 'main .backButton' );
		let lBtnInnerHTML = await lBackBtn.getHTML( false );
		expect( lBtnInnerHTML ).toContain( 'Back to product list' );

		let product = await $( 'main .product' );
		let lTitleEl = await product.$( 'h3' );
		let lTittleInnerHTML = await lTitleEl.getHTML( false );
		expect( lTittleInnerHTML ).toEqual( productName );
	}
);


Given(
	'that I can see the detailed product page',
	async () =>
	{
		// Load the main page with products
		await browser.url( '/' );
		await $( '.productInList h3' ).waitForClickable();

		let firstProduct = await $( '.productInList' );
		await firstProduct.scrollIntoView( true );

		// Load a detailed product page
		let lTitleEl = await $( '.productInList h3' );
		expect( lTitleEl ).toBeTruthy();
		await lTitleEl.click();

		await $( '.product h3' ).waitForClickable();
	}
);


When(
	'I click on the back button',
	async () =>
	{
		let lBackBtn = await $( 'main .backButton' );
		await lBackBtn.scrollIntoView( true );
		await lBackBtn.click();
		await browser.pause( pauseTime );
	}
);


Then(
	'the page with the list of products should be shown again',
	async () =>
	{
		// Load the main page with products again
		await $( '.productInList h3' ).waitForClickable();

		let lBackBtns = await $$( '.backButton' );
		expect( lBackBtns ).toBeElementsArrayOfSize( 0 );

		let firstProduct = await $( '.productInList' );
		expect( firstProduct ).toBeTruthy();

		await browser.pause( pauseTime );
	}
);
