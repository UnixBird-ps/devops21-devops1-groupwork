const { Given, When, Then } = require( "@wdio/cucumber-framework" );
const pauseTime = 1500;
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
		let lSelector = ".register-and-login-links a";
		await browser.url( "/" );

		// await $( lSelector ).waitForExist();
		// await expect( await $( lSelector ) ).toHaveHref( "/register" );
		// await expect( await $( lSelector ) ).toBeClickable();

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
		let lRegisterLink;

		// let lAuthLinksContainer = await $( ".register-and-login-links" );
		// await lAuthLinksContainer.waitUntil
		// (
		// 	async function ()
		// 	{
		// 		lRegiterLink = ( await this.$$( "a" ) )[ 0 ];
		// 		return ( lRegiterLink && await lRegiterLink.getAttribute( "href" ) === "/register" );
		// 	}
		// );

		lRegisterLink = await $( ".register-and-login-links a[href='/register']" );
		await lRegisterLink.waitForClickable( { timeout : 5000 } )
		await lRegisterLink.click();
	}
);


Then(
	"a registration form should appear on the page",
	async () =>
	{
		await $( "form[name='registration']" ).waitForDisplayed();
	}
);


Given(
	"that I can see the registration form",
	async () =>
	{
		let lSelector = "form[name='registration']";
		let lRegForm = await $( lSelector );

		// let lSelector = ".register-and-login-links a";
		// let lRegiterLink = await $( lSelector );

		// await $( lSelector ).waitForExist();
		// await expect( await $( lSelector ) ).toHaveHref( "/register" );
		// await expect( await $( lSelector ) ).toBeClickable();

		let lRegiterLink;

		// let lAuthLinksContainer = await $( ".register-and-login-links" );
		// await lAuthLinksContainer.waitUntil
		// (
		// 	async function ()
		// 	{
		// 		lRegiterLink = ( await this.$$( "a" ) )[ 0 ];
		// 		return ( lRegiterLink && await lRegiterLink.getAttribute( "href" ) === "/register" );
		// 	}
		// );

		// expect( lFirstAuthLink ).toBeTruthy();
		// await lFirstAuthLink.waitForClickable();

		// lRegiterLink = await $( ".register-and-login-links a[href='/register']" );
		// await lRegiterLink.waitForClickable( { timeout : 5000 } )
		// await lRegiterLink.click();

		await expect( lRegForm ).toExist();
		await lRegForm.waitForDisplayed();

		await browser.pause( pauseTime );
	}
);


When(
	"I enter my registration info and click on the submit button",
	async () =>
	{
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
		let lLoginLink;

		// let lAuthLinksContainer = await $( '.register-and-login-links' );
		// await lAuthLinksContainer.waitUntil
		// (
		// 	async function ()
		// 	{
		// 		lLoginLink = ( await this.$$( "a" ) )[ 1 ];
		// 		return ( lLoginLink && await lLoginLink.getAttribute( "href" ) === "/login" );
		// 	},
		// 	{
		// 		timeout: timeOut,
		// 		timeoutMsg: "Reached timeout when wating for element"
		// 	}
		// );

		lLoginLink = await $( ".register-and-login-links a[href='/login']" );
		await lLoginLink.waitForClickable( { timeout : 5000 } )
		await lLoginLink.click();
	}
);


Then(
	"a login form should appear on the page",
	async () =>
	{
		await $( "form[name='login']" ).waitForDisplayed( { timeout : timeOut } );
		await browser.pause( pauseTime );
	}
);


Given(
	"that I can see the login form",
	async () =>
	{
		let lSelector = "form[name='login']";
		let lLoginForm = await $( lSelector );

		// await browser.url( '/' );
		// await $( ".register-and-login-links" ).waitForDisplayed();

		// let lSecondAuthLink;
		// let lAuthLinksContainer = await $( '.register-and-login-links' );
		// await lAuthLinksContainer.waitUntil
		// (
		// 	async function ()
		// 	{
		// 		lSecondAuthLink = ( await this.$$( "a" ) )[ 1 ];
		// 		return ( lSecondAuthLink && await lSecondAuthLink.getAttribute( "href" ) === "/login" );
		// 	}
		// );

		// await lSecondAuthLink.waitForClickable();
		// await lSecondAuthLink.click();
		// await $( "form[name='login']" ).waitForDisplayed();

		await expect( lLoginForm ).toExist();
		await lLoginForm.waitForDisplayed();

	}
);


When(
	"I enter my login info and click on the submit button",
	async () =>
	{
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
		let lFoundLoggedInAsElm = await $( "div.logon-info" );
		await expect( lFoundLoggedInAsElm ).toBeTruthy();
		await expect( await lFoundLoggedInAsElm.getText() ).toContain( "Logged in as Tester" );
	}
);


When(
	"I click on the 'Logout' link",
	async () =>
	{
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
