const { Given, When, Then } = require( '@wdio/cucumber-framework' );
const pauseTime = 1000;
const timeOut = 2000;

// Empty templates at the end


Given(
	"that I'm logged in as customer",
	async () =>
	{
		await browser.url( '/' );
		await browser.pause( pauseTime );

		let lSecondAuthLink;
		let lAuthLinksContainer = await $( '.register-and-login-links' );
		await lAuthLinksContainer.waitUntil
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
		await $( 'form[name="login"] input[name="email"]' ).setValue( 'tester2@testare2.test' );
		await $( 'form[name="login"] input[name="password"]' ).setValue( '12345678' );
		let lSubmitBtn = await $( 'form[name="login"] input[type="submit"]' );

		await lSubmitBtn.waitForClickable();
		await lSubmitBtn.click();
		await $( "div.navbar div.login" ).waitForDisplayed( { reverse : true } );

		let foundLoggedInAsElm = await $( "div.register-and-login-links" );
		await expect( await foundLoggedInAsElm.getHTML( false ) ).toContain( "Logged in as Tester" );

		await browser.pause( pauseTime );
	}
);


Given(
	"that I can see the main page containing the product list",
	async () =>
	{
		await $( 'div.productInList' ).waitForDisplayed( { reverse : true } );

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
