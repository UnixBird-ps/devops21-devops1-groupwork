const { Given, When, Then } = require( '@wdio/cucumber-framework' );


Given(
	'that I can see the product list',
	async () =>
	{
		await browser.url( '/' );
	}
);


When(
	/^I click on the quantity increase button for "(.*)"$/,
	async ( productName ) =>
	{
		console.log( productName );
		let products = await $$( '.productInList' );
		let foundProduct;
		for ( let product of products )
		{
			console.log( product.getText() );
			if ( ( await product.getText() ).includes( productName ) )
			{
				foundProduct = product;
			}
		}
		expect( foundProduct ).toBeTruthy();
		let quantityBox = await foundProduct.$( '.quantity' );
		await quantityBox.scrollIntoView();
		quantityBox.oldValue = quantityBox.value
		await quantityBox.stepUp();
	}
);


Then(
	/^the number in the quantity box for "(.*)" should increase by one$/,
	async ( quantity, productName ) =>
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
		let quantityBox = await foundProduct.$( '.quantity' );
		expect( quantityBox.value ).toEqual( quantityBox.oldValue + 1 );
	}
);


When(
	/^I click on the quantity decrease button for "(.*)"$/,
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
		let quantityBox = await foundProduct.$( '.quantity' );
		await quantityBox.scrollIntoView();
		quantityBox.value = 5
		quantityBox.oldValue = quantityBox.value
		await quantityBox.stepDown();
	}
);


Then(
	/^the number in the quantity box for "(.*)" should decrease by one$/,
	async ( quantity, productName ) =>
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
		let quantityBox = await foundProduct.$( '.quantity' );
		expect( quantityBox.value ).toEqual( quantityBox.oldValue - 1 );
	}
);
