const { Given, When, Then } = require( '@wdio/cucumber-framework' );
const pauseTime = 3000;


Given(
	'that I can see the product list',
	async () =>
	{
		await browser.url( '/' );
	}
);


When(
	/^I click on the product name for "(.*)"$/,
	async ( productName ) =>
	{
		await $( '.productInList' ).waitForClickable();
		let products = await $$( '.productInList' );
		let foundProduct;
		for ( let product of products )
		{
			if ( ( await product.getText() ).includes( productName ) )
			{
				foundProduct = product;
				console.log( 'Found product: ', productName );
			}
		}
		expect( foundProduct ).toBeTruthy();
		await foundProduct.scrollIntoView( true );
		await browser.pause(pauseTime);
		let titleEl = await foundProduct.$( 'h3' );
		//browser.execute( 'arguments[0].click();', titleEl );
		await titleEl.click();
	}
);


Then(
	/^a page with more information on the product "(.*)" should be shown$/,
	async ( productName ) =>
	{
		let product = await $( '.product' );
		let lTitleEl = await product.$( 'h3' );
		let lTittleInnerHTML = await lTitleEl.getHTML( false );
		expect( lTittleInnerHTML ).toEqual( productName );

		let lBackBtn = await $( 'main .backButton' );
		let lBtnInnerHTML = await lBackBtn.getHTML( false );
		expect( lBtnInnerHTML ).toContain( 'Back to product list' );
	}
);
