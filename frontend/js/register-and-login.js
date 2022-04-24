
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
		div.innerHTML += ' <a href="/logout">Logout</a>';

		if ( loggedIn.userRole === "user" )
		{
			let lNavLinksDiv = document.querySelector( '.nav-links' );
			lNavLinksDiv.innerHTML = ' <a href="/my-orders">My orders</a>';
		}

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

			let lNavLinksDiv = document.querySelector( '.nav-links' );
			lNavLinksDiv.innerHTML = '<a href="/home">Home</a>';

			( new MyOrdersList() ).fetchRender()
			.then
			(
				( lRes ) =>
				{
					grabEl( 'main' ).innerHTML = lRes;
				}
			)
		}

		if ( event.target.closest( 'a[href="/home"]' ) )
		{
			event.preventDefault();

			await ( ( new ProductList() ).readDataFromDb() );

			let lNavLinksDiv = document.querySelector( '.nav-links' );
			lNavLinksDiv.innerHTML = ' <a href="/my-orders">My orders</a>';
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
