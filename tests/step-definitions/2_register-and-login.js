const { Given, When, Then } = require( "@wdio/cucumber-framework" );
const allureReporter = require('@wdio/allure-reporter').default;
const pauseTime = 0;
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
	"that I'm on the main page and not signed in",
	async () =>
	{
		allureReporter.addFeature( "Register and login pages" );
		allureReporter.addSeverity( "critical" );

		let lSelector = ".register-and-login-links a";
		await browser.url( "/" );

		let lFirstAuthLink = await $( lSelector );
		await lFirstAuthLink.waitForExist();
		await expect( lFirstAuthLink ).toHaveHref( "/register" );
		await expect( lFirstAuthLink ).toBeClickable();
	}
);


When(
	"I click on the 'Register' link",
	async () =>
	{
		allureReporter.addFeature( "Register and login pages" );

		let lRegisterLink;

		lRegisterLink = await $( ".register-and-login-links a[href='/register']" );
		await expect( lRegisterLink ).toExist();
		await lRegisterLink.waitForClickable( { timeout : 5000 } )
		await lRegisterLink.click();
	}
);


Then(
	"a registration form should appear on the page",
	async () =>
	{
		allureReporter.addFeature( "Register and login pages" );

		await $( "form[name='registration']" ).waitForDisplayed();
	}
);


Given(
	"that I can see the registration form",
	async () =>
	{
		allureReporter.addFeature( "Register and login pages" );
		allureReporter.addSeverity( "critical" );

		let lSelector = "form[name='registration']";
		let lRegForm = await $( lSelector );

		let lRegiterLink;

		await expect( lRegForm ).toExist();
		await lRegForm.waitForDisplayed();

		await browser.pause( pauseTime );
	}
);


When(
	"I enter my registration info and click on the submit button",
	async () =>
	{
		allureReporter.addFeature( "Register and login pages" );

		await $( "form[name='registration'] input[name='firstName']" ).setValue( "Tester2" );
		await $( "form[name='registration'] input[name='lastName']" ).setValue( "Testare2" );
		await $( "form[name='registration'] input[name='email']" ).setValue( "tester2@testare2.test" );
		await $( "form[name='registration'] input[name='password']" ).setValue( "12345678" );
		await $( "form[name='registration'] input[name='passwordRepeated']" ).setValue( "12345678" );
		let lFoundSubmitBtn = await $( "form[name='registration'] input[type='submit']" );

		await expect( lFoundSubmitBtn ).toBeTruthy();
		await lFoundSubmitBtn.waitForClickable();
		await lFoundSubmitBtn.click();
	}
);


Then(
	"the page should inform me that the registration was successful",
	async () =>
	{
		allureReporter.addFeature( "Register and login pages" );

		let lFoundWelcomeMsgElm = await $( "div.register h3" );
		await expect( lFoundWelcomeMsgElm ).toBeTruthy();
		await expect( await lFoundWelcomeMsgElm.getText() ).toContain( "Welcome as a member!" );
		let lFoundSuccessMsgElm = await $( "div.register p" );
		await expect( lFoundSuccessMsgElm ).toBeTruthy();
		await expect( await lFoundSuccessMsgElm.getText() ).toContain( "You are now successfully registrered as a member!" );
		await browser.pause( pauseTime );
	}
);


When(
	"I click on the 'Login' link",
	async () =>
	{
		allureReporter.addFeature( "Register and login pages" );

		let lLoginLink;

		lLoginLink = await $( ".register-and-login-links a[href='/login']" );

		await lLoginLink.waitForClickable( { timeout : 5000 } )
		await lLoginLink.click();
	}
);


Then(
	"a login form should appear on the page",
	async () =>
	{
		allureReporter.addFeature( "Register and login pages" );

		await $( "form[name='login']" ).waitForDisplayed( { timeout : timeOut } );
		await browser.pause( pauseTime );
	}
);


Given(
	"that I can see the login form",
	async () =>
	{
		allureReporter.addFeature( "Register and login pages" );
		allureReporter.addSeverity( "critical" );

		let lSelector = "form[name='login']";
		let lLoginForm = await $( lSelector );

		await expect( lLoginForm ).toExist();
		await lLoginForm.waitForDisplayed();

	}
);


When(
	"I enter my login info and click on the submit button",
	async () =>
	{
		allureReporter.addFeature( "Register and login pages" );

		await $( "form[name='login'] input[name='email']" ).setValue( "tester@testare.test" );
		await $( "form[name='login'] input[name='password']" ).setValue( "12345678" );
		let lFoundSubmitBtn = await $( "form[name='login'] input[type='submit']" );

		await expect( lFoundSubmitBtn ).toBeTruthy();
		await lFoundSubmitBtn.waitForClickable();
		await lFoundSubmitBtn.click();
		await $( "div.login" ).waitForDisplayed( { reverse : true } );

		await browser.pause( pauseTime );
	}
);



Then(
	"the page should inform me that the login was successful",
	async () =>
	{
		allureReporter.addFeature( "Register and login pages" );

		let lFirstAuthLink;
		let lAuthLinksContainer = await $( 'div.register-and-login-links' );
		await lAuthLinksContainer.waitUntil
		(
			async function ()
			{
				lFirstAuthLink = await this.$( "a" );
				return ( await lFirstAuthLink.getAttribute( "href" ) === "/logout" );
			},
			{
				timeout: timeOut,
				timeoutMsg: "Reached timeout when waiting for element"
			}
		);
		await lFirstAuthLink.waitForClickable();

		let lFoundLoggedInAsElm = await $( "div.logon-info" );
		await expect( lFoundLoggedInAsElm ).toBeTruthy();
		await expect( await lFoundLoggedInAsElm.getHTML( false ) ).toContain( "Logged in as Tester" );

		await browser.pause( pauseTime );
	}
);


Given(
	"that I'm currently signed in and on the main page",
	async () =>
	{
		allureReporter.addFeature( "Register and login pages" );
		allureReporter.addSeverity( "critical" );

		let lFoundLoggedInAsElm = await $( "div.logon-info" );
		await expect( lFoundLoggedInAsElm ).toBeTruthy();
		await expect( await lFoundLoggedInAsElm.getText() ).toContain( "Logged in as Tester" );
	}
);


When(
	"I click on the 'Logout' link",
	async () =>
	{
		allureReporter.addFeature( "Register and login pages" );

		let lFirstAuthLink;
		let lAuthLinksContainer = await $( 'div.register-and-login-links' );
		await lAuthLinksContainer.waitUntil
		(
			async function ()
			{
				lFirstAuthLink = await this.$( "a" );
				return ( lFirstAuthLink && await lFirstAuthLink.getAttribute( "href" ) === "/logout" );
			}
		);

		await lFirstAuthLink.waitForClickable();
		await lFirstAuthLink.click();

		await browser.pause( pauseTime );
	}
);


Then(
	"the page should inform me that I was signed off",
	async () =>
	{
		allureReporter.addFeature( "Register and login pages" );

		let lAuthLinksContainer = await $( 'div.register-and-login-links' );
		await lAuthLinksContainer.waitForExist();

		await lAuthLinksContainer.waitUntil
		(
			async function ()
			{
				let lAuthLink = ( await this.$$( "a" ) )[ 1 ];
				await lAuthLink.waitForExist();
				return ( lAuthLink );
			}
		);

		await expect( lAuthLinksContainer.$$( "a" )[ 0 ] ).toHaveLink( "/register" );
		await expect( lAuthLinksContainer.$$( "a" )[ 1 ] ).toHaveLink( "/login" );

		await browser.pause( pauseTime );
	}
);
