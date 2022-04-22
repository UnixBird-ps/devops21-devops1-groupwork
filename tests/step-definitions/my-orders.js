const { Given, When, Then } = require( '@wdio/cucumber-framework' );
const pauseTime = 1000;
const timeOut = 5000;

// Empty templates at the end


Given(
	"that I'm logged in as customer",
	async () =>
	{
		await browser.url( '/' );
		await browser.pause( pauseTime );

		let lSecondAuthLink;
		let lLinksContainer = await $( 'div.register-and-login-links' );
		await lLinksContainer.waitUntil
		(
			async function ()
			{
				lSecondAuthLink = await this.$$( "a" )[ 1 ];
				return ( lSecondAuthLink && await lSecondAuthLink.getAttribute( "href" ) === "/login" );
			}
		);

		await lSecondAuthLink.waitForClickable();
		await lSecondAuthLink.click();
		await browser.pause( pauseTime );

		await $( "form[name='login']" ).waitForDisplayed();
		await $( 'form[name="login"] input[name="email"]' ).setValue( 'tester@testare.test' );
		await $( 'form[name="login"] input[name="password"]' ).setValue( '12345678' );
		let lSubmitBtn = await $( 'form[name="login"] input[type="submit"]' );

		await lSubmitBtn.waitForClickable();
		await lSubmitBtn.click();

		await lLinksContainer.waitUntil
		(
			async function ()
			{
				let lHTML = await this.getHTML( false );
				console.log( lHTML );
				return lHTML.includes( "Logged in as " );
			},
			{
				timeout : timeOut,
				timeoutMsg: `Reached a ${ timeOut } ms timeout waiting for the div element 'register-and-login' to contain the string 'Logged in as'`
			}
		);

		await browser.pause( pauseTime );
	}
);


Given(
	"that I can see the main page containing the product list",
	async () =>
	{
		await $( 'div.productInList' ).waitForDisplayed();

		await browser.pause( pauseTime );
	}
);


When(
	"I click on the link 'My orders' in the top right corner",
	async () =>
	{
		let lMyOrdersLink;
		let lLinksContainer = await $( '.register-and-login-links' );
		await lLinksContainer.waitUntil
		(
			async function ()
			{
				lMyOrdersLink = await this.$$( "a" )[ 0 ];
				return ( lMyOrdersLink && await lMyOrdersLink.getAttribute( "href" ) === "/my-orders" );
			}
		);

		await lMyOrdersLink.waitForClickable();
		await lMyOrdersLink.click();
		await $( 'table[name="my-orders"]' ).waitForDisplayed();
	}
);


Then(
	"the product list should be replaced by a list containing my order history",
	async () =>
	{
		await expect( await $( 'table[name="my-orders"]' ) ).toBePresent();
		await browser.pause( pauseTime );
	}
);


/*
// Templates
Given(
	"",
	async () =>
	{
	}
);
When(
	"",
	async () =>
	{
	}
);
Then(
	"",
	async () =>
	{
	}
);
*/
