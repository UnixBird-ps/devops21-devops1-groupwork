const { Given, When, Then } = require( '@wdio/cucumber-framework' );
const pauseTime = 3000;


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
	}
);


Then(
	'a dialog with a registration form should appear on the page',
	async () =>
	{
		await $( 'form[name="registration"]' ).waitForDisplayed();
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
	}
);


Then(
	'a dialog with a login form should appear on the page',
	async () =>
	{
		await $( 'form[name="login"]' ).waitForDisplayed();
	}
);


Given(
	"that I see the registration form",
	async () =>
	{
		await browser.url( '/' );
		await $( '.register-and-login-links' ).waitForDisplayed();

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

		await $( "form[name='registration']" ).waitForDisplayed();
	}
);


When(
	"I enter my registration info and click on the submit button",
	async () =>
	{
		await $( 'form[name="registration"] input[name="firstName"]' ).setValue( 'Tester2' );
		await $( 'form[name="registration"] input[name="lastName"]' ).setValue( 'Testare2' );
		await $( 'form[name="registration"] input[name="email"]' ).setValue( 'tester2@testare2.test' );
		await $( 'form[name="registration"] input[name="password"]' ).setValue( '12345678' );
		await $( 'form[name="registration"] input[name="passwordRepeated"]' ).setValue( '12345678' );
		let foundSubmitBtn = await $( 'form[name="registration"] input[type="submit"]' );
		expect( foundSubmitBtn ).toBeTruthy();
		await foundSubmitBtn.waitForClickable();
		await foundSubmitBtn.click();
	}
);


Then(
	"the page should inform me that the registration was successful",
	async () =>
	{
		await browser.pause( pauseTime );
		let foundWelcomeMsgElm = await $( "div.register h3" );
		expect( foundWelcomeMsgElm ).toBeTruthy();
		expect( await foundWelcomeMsgElm.getText() ).toContain( "Welcome as a member!" );
		let foundSuccessMsgElm = await $( "div.register p" );
		expect( foundSuccessMsgElm ).toBeTruthy();
		expect( await foundSuccessMsgElm.getText() ).toContain( "You are now successfully registrered as a member!" );
		await browser.pause( pauseTime );
	}
);


Given(
	"that I see the login form",
	async () =>
	{
		await browser.url( '/' );
		await $( '.register-and-login-links' ).waitForDisplayed();

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

		await $( "form[name='login']" ).waitForDisplayed();
	}
);


When(
	"I enter my login info and click on the submit button",
	async () =>
	{
		await $( 'form[name="login"] input[name="email"]' ).setValue( 'tester2@testare2.test' );
		await $( 'form[name="login"] input[name="password"]' ).setValue( '12345678' );
		let foundSubmitBtn = await $( 'form[name="login"] input[type="submit"]' );
		expect( foundSubmitBtn ).toBeTruthy();
		await foundSubmitBtn.waitForClickable();
		await foundSubmitBtn.click();
	}
);



Then(
	"the page should inform me that the login was successful",
	async () =>
	{
		await browser.pause( pauseTime );
		let foundLoggedInAsElm = await $( "div.register-and-login-links" );
		expect( foundLoggedInAsElm ).toBeTruthy();
		expect( await foundLoggedInAsElm.getText() ).toContain( "Logged in as Tester2 Testare2" );
		await browser.pause( pauseTime );
	}
);
