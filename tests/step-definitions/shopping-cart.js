const { Given, When, Then } = require( '@wdio/cucumber-framework' );
const pauseTime = 1000;


Given(
	"that I can see the products on main page",
	async () =>
	{
		await browser.url( '/' );
		await $( '.productInList' ).waitForDisplayed();
	}
);


When(
	/^I click on the buy button for "(.*)"$/,
	async ( productName ) =>
	{
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
		let buyButton = await foundProduct.$( '[class="buyButton"]' );
		await buyButton.click();
	}
);


Then(
	/^the product "(.*)" gets added to my shopping cart$/,
	async ( productName ) =>
	{
		let products = await $$( '.shoppingCart' );
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
	}
);


Given(
	/^that I already have added "(.*)" in my shopping cart$/,
	async ( productName ) =>
	{
        await browser.url( '/' );
		await $( '.productInList h3' ).waitForClickable();
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
		let buyButton = await foundProduct.$( '[class="buyButton"]' );
		await buyButton.click();
	}
);


When(
	/^I add "(.*)" to my shopping cart$/,
	async ( productName ) =>
	{
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
		let buyButton = await foundProduct.$( '[class="buyButton"]' );
		await buyButton.click();
	}
);


Then(
	/^add "(.*)" to shopping cart and show total sum$/,
	async ( productName ) =>
	{
		let products = await $$( '.shoppingCart' );
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
        await expect($('body')).toHaveTextContaining('Total: 368,68 kr');
	}
);


Given(
	/^that I already have "(.*)" in my shopping cart$/,
	async ( productName ) =>
	{
        await browser.url( '/' );
		await $( '.productInList h3' ).waitForClickable();
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
		let buyButton = await foundProduct.$( '[class="buyButton"]' );
		await buyButton.click();
	}
);

When(
	/^I add "(.*)" product to my shopping cart again$/,
	async ( productName ) =>
	{
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
		let buyButton = await foundProduct.$( '[class="buyButton"]' );
		await buyButton.click();
	}
);

Then(
	/^increase quantity of "(.*)" without adding a new product$/,
	async ( productName ) =>
	{
		let products = await $$( '.shoppingCart' );
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
		await expect($('footer')).toHaveTextContaining('2');
	}
);