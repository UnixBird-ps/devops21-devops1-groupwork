const { Given, When, Then } = require( '@wdio/cucumber-framework' );
const debugMsg = require( '../../backend/debug-funcs.js' ).debugMsg;
const pauseTime = 2000;
const timeOut = 5000;


/*
// Empty templates
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


Given(
	"that I'm logged in as customer",
	async () =>
	{
		await browser.url( '/' );
		await browser.pause( pauseTime );

		let lFirstAuthLink = await $( ".register-and-login-links a" );
		let lFirstAuthLinkURL = await lFirstAuthLink.getAttribute( "href" );
		if ( lFirstAuthLinkURL != "/logout" )
		{
			let lSecondAuthLink;
			let lLinksContainer = await $( 'div.register-and-login-links' );
			await lLinksContainer.waitUntil
			(
				async function ()
				{
					lSecondAuthLink = ( await this.$$( "a" ) )[ 1 ];
					return ( lSecondAuthLink && await lSecondAuthLink.getAttribute( "href" ) == "/login" );
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

			let lLogonInfoContainer = await $( 'div.logon-info' );
			await lLogonInfoContainer.waitUntil
			(
				async function ()
				{
					let lHTML = await this.getHTML( false );
					console.log( lHTML );
					return lHTML.includes( "Logged in as " );
				},
				{
					timeout : timeOut,
					timeoutMsg: `Reached a ${ timeOut } ms timeout waiting for the div element 'div.logon-info' to contain the string 'Logged in as'`
				}
			);
		}
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
		let lLinksContainer = await $( '.nav-links' );
		await lLinksContainer.waitUntil
		(
			async function ()
			{
				lMyOrdersLink = ( await this.$$( "a" ) )[ 0 ];
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


Given(
	"that I can see my order history",
	async () =>
	{
		let lMyOrdersLink = await $( '.nav-links a[href="/my-orders"]' );
		await lMyOrdersLink.waitForClickable();
		await lMyOrdersLink.click();

		let lOrdersTableElm = await $( 'table[name="my-orders"]' );
		await lOrdersTableElm.waitForDisplayed();
		await browser.pause( pauseTime );
	}
);


When(
	"I click on one of the rows in the list containing my old orders",
	async () =>
	{
		let lFirstOrderRow = await $( 'table[name="my-orders"] tbody tr.orderlist-row' );
		await lFirstOrderRow.waitForClickable();
		await lFirstOrderRow.click();
		await browser.pause( pauseTime );
	}
);


Then(
	"the orders list should be replaced by a page showing total cost and products ordered",
	async () =>
	{
		let lFirstOrderDetailRow = await $( 'table[name="order-details"] tbody tr.detail-row' );
		await lFirstOrderDetailRow.waitForDisplayed();
		await browser.pause( pauseTime );
	}
);
