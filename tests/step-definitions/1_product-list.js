const { Given, When, Then } = require( '@wdio/cucumber-framework' );
const allureReporter = require('@wdio/allure-reporter').default;
const pauseTime = 0;


Given(
	'that I can see the product list',
	async () =>
	{
		await browser.url( '/' );
		await expect( await $( "main ul#products" ) ).toExist();
		//await $( 'div.productInList h3' ).waitForClickable();
		await expect( await $( 'div.productInList h3' ) ).toBeClickable();
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
		await expect( foundProduct ).toBeTruthy();
		await browser.pause( pauseTime );
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
		await expect( lBtnInnerHTML ).toContain( 'Back to product list' );

		let lTittleInnerHTML = await( await $( "main div.product h3" ) ).getHTML( false );
		await expect( lTittleInnerHTML ).toEqual( productName );
	}
);


Given(
	/^that I can see the product details page for the product "(.*)"$/,
	async ( productName ) =>
	{
		let lTittleInnerHTML = await( await $( "main div.product h3" ) ).getHTML( false );
		await expect( lTittleInnerHTML ).toEqual( productName );
		await expect( await $( 'button.backButton' ) ).toExist();
		await expect( await $( 'button.backButton' ) ).toBeClickable();
		await expect( await $( 'div.product h3' ) ).toExist();
		await expect( await $( 'div.product h3' ) ).toBeClickable();
	}
);


When(
	'I click on the back button',
	async () =>
	{
		let lBackBtn = await $( 'main .backButton' );
		await expect( lBackBtn ).toBeTruthy();
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
		await expect( lBackBtns ).toBeElementsArrayOfSize( 0 );

		let firstProduct = await $( '.productInList' );
		await expect( firstProduct ).toBeTruthy();

		await browser.pause( pauseTime );
	}
);
