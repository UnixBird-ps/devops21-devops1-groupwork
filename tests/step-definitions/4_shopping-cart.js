const { Given, When, Then } = require( '@wdio/cucumber-framework' );
const allureReporter = require('@wdio/allure-reporter').default;
const pauseTime = 0;


Given(
	"that I can see the products on main page",
	async () =>
	{
		allureReporter.addFeature( "Shopping Cart" );
		allureReporter.addSeverity( "critical" );

		await browser.url( '/' );
		await $( '.productInList' ).waitForDisplayed();
	}
);


When(
	/^I click on the buy button for "(.*)"$/,
	async ( productName ) =>
	{
		allureReporter.addFeature( "Shopping Cart" );

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
		let buyButton = await foundProduct.$( '.buyButton' );
		await buyButton.click();
	}
);


Then(
	/^the product "(.*)" gets added to my shopping cart$/,
	async ( productName ) =>
	{
		allureReporter.addFeature( "Shopping Cart" );

		let products = await $$( '.shoppingCart' );
		let foundProduct;
		for ( let product of products )
		{
			if ( ( await product.getText() ).includes( productName ) )
			{
				foundProduct = product;
			}
		}
		expect( foundProduct ).toBeTruthy();
	}
);


Given(
	/^that I already have added "(.*)" in my shopping cart$/,
	async ( productName ) =>
	{
		allureReporter.addFeature( "Shopping Cart" );
		allureReporter.addSeverity( "critical" );

		await browser.url( '/' );
		await $( '.productInList h3' ).waitForClickable();
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
		let buyButton = await foundProduct.$( '.buyButton' );
		await buyButton.click();
	}
);


When(
	/^I add "(.*)" to my shopping cart$/,
	async ( productName ) =>
	{
		allureReporter.addFeature( "Shopping Cart" );

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
		let buyButton = await foundProduct.$( '.buyButton' );
		await buyButton.click();
	}
);


Then(
	/^"(.*)" is added to the shopping cart and total sum is displayed$/,
	async ( productName ) =>
	{
		allureReporter.addFeature( "Shopping Cart" );

		let products = await $$( '.shoppingCart' );
		let foundProduct;
		for ( let product of products )
		{
			if ( ( await product.getText() ).includes( productName ) )
			{
				foundProduct = product;
			}
		}
		expect( foundProduct ).toBeTruthy();
        await expect($('body')).toHaveTextContaining('Total: 369,63 kr');
	}
);


Given(
	/^that I already have "(.*)" in my shopping cart$/,
	async ( productName ) =>
	{
		allureReporter.addFeature( "Shopping Cart" );
		allureReporter.addSeverity( "critical" );

		await browser.url( '/' );
		await $( '.productInList h3' ).waitForClickable();
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
		let buyButton = await foundProduct.$( '.buyButton' );
		await buyButton.click();
	}
);


When(
	/^I add "(.*)" product to my shopping cart again$/,
	async ( productName ) =>
	{
		allureReporter.addFeature( "Shopping Cart" );

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
		let buyButton = await foundProduct.$( '.buyButton' );
		await buyButton.click();
	}
);


Then(
	/^the quantity of "(.*)" is increased without adding a new product$/,
	async ( productName ) =>
	{
		allureReporter.addFeature( "Shopping Cart" );

		let products = await $$( '.shoppingCart' );
		let foundProduct;
		for ( let product of products )
		{
			if ( ( await product.getText() ).includes( productName ) )
			{
				foundProduct = product;
			}
		}
		expect( foundProduct ).toBeTruthy();

		await expect( ( await $$( 'div.cartContainer table.shoppingCart tr.tableRow td' ) )[ 1 ] ).toHaveTextContaining('2');
	}
);
