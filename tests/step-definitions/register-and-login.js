const { Given, When, Then } = require( '@wdio/cucumber-framework' );
const pauseTime = 1000;


Given(
	"that I'm on the main page",
	async () =>
	{
		await browser.url( '/' );
		await $( '.register-and-login-links' ).waitForDisplayed();
	}
);


When(
	"I click on the 'Register' link",
	async () =>
	{
		let authLinkElms = await $$( '.register-and-login-links a' );
		let foundLinkElm;
		for ( let aLinkElm of authLinkElms )
		{
			if ( ( await aLinkElm.getAttribute( 'href' ) ) === '/register' )
			{
				foundLinkElm = aLinkElm;
			}
		}

		expect( foundLinkElm ).toBeTruthy();
		await foundLinkElm.waitForClickable();
		await foundLinkElm.click();
		await browser.pause( pauseTime );
	}
);


Then(
	'a dialog with a registration form should appear on the page',
	async () =>
	{
		await $( 'form[name="registration"]' ).waitForDisplayed();
		await browser.pause( pauseTime );
	}
);


When(
	"I click on the 'Login' link",
	async () =>
	{
		let authLinkElms = await $$( '.register-and-login-links a' );
		let foundLinkElm;
		for ( let aLinkElm of authLinkElms )
		{
			if ( ( await aLinkElm.getAttribute( 'href' ) ) === '/login' )
			{
				foundLinkElm = aLinkElm;
			}
		}

		expect( foundLinkElm ).toBeTruthy();
		await foundLinkElm.waitForClickable();
		await foundLinkElm.click();
		await browser.pause( pauseTime );
	}
);


Then(
	'a dialog with a login form should appear on the page',
	async () =>
	{
		await $( 'form[name="login"]' ).waitForDisplayed();
		await browser.pause( pauseTime );
	}
);
