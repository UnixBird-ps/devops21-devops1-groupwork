
async function getLogInfo()
{
	let div = document.querySelector( '.register-and-login-links' );
	let loggedIn;
	try
	{
		loggedIn = await ( await fetch( '/api/login' ) ).json();
	}
	catch ( ignore ) { }

	if ( loggedIn && loggedIn.userRole !== 'superadmin' ) new ProductList();

	// if ( loggedIn && loggedIn.userRole === "user" )
	// 	document.myOrdersList = new MyOrdersList();
	// else
	// 	document.myOrdersList = null;

	if ( !loggedIn || loggedIn.error )
	{
		div.innerHTML = `
			<a href="/register">Register</a>
			<a href="/login">Login</a>
		`
	}
	else
	{
		div.innerHTML = `Logged in as ${loggedIn.firstName} ${loggedIn.lastName}`;
		if ( loggedIn.userRole === "user" ) div.innerHTML += ' <a href="/my-orders">My orders</a>';
		div.innerHTML += ' <a href="/logout">Logout</a>';

		start( loggedIn?.userRole );
	}
}

getLogInfo();


document.querySelector('body').addEventListener
(
	'click',
	async (event) =>
	{
		if ( event.target.closest( 'a[href="/my-orders"]' ) )
		{
			event.preventDefault();

			let lFirstLink = document.querySelector( '.register-and-login-links a' );
			lFirstLink.outerHTML = '<a href="/">Home</a>';

			await ( new MyOrdersList() ).fetchRender();
		}

		if ( event.target.closest( 'a[href="/"]' ) )
		{
			event.preventDefault();
		}

		if ( !event.target.closest( 'a[href="/logout"]' ) ) { return; }

		event.preventDefault();

		let result;
		try {
			result = await (await fetch('/api/login', { method: 'DELETE' })).json();
		}
		catch (ignore) { }

		location.reload();
	}
);
