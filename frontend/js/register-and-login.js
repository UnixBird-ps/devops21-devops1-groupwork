
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

	if ( !loggedIn || loggedIn.error )
	{
		div.innerHTML = `
			<a href="/register">Register</a>
			<a href="/login">Login</a>
		`
	}
	else
	{
		div.innerHTML = `
			Logged in as ${loggedIn.firstName} ${loggedIn.lastName}
			<a href="/my-orders">My orders</a>
			<a href="/logout">Logout</a>
		`;
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

			// read the json data
			let rawData = await fetch( '/api/my-orders' );
			// convert from json to a JavaScript data structure
			// data will be an array of generic objects
			let data = await rawData.json();

			let lProducts = [];
			// loop through the data we fetched from json
			for ( let element of data )
			{
				lProducts.push( element );
			}

			let html = "";
			for ( let product of lProducts )
			{
				html += Object.entries( product ).map( x => x[ 0 ] + x[ 1 ] );
			}

			grabEl('main').innerHTML = html;
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




// document.querySelector( ".register-and-login-links" ).addEventListener
// (
// 	'click',
// 	( event ) =>
// 	{
// 		if ( !event.target.closest( 'a[href="/my-orders"]' ) ) { return; }

// 		event.preventDefault();

// 		// read the json data
// 		let rawData = await fetch( '/api/products' );
// 		// convert from json to a JavaScript data structure
// 		// data will be an array of generic objects
// 		let data = await rawData.json();

// 		let lProducts = [];
// 		// loop through the data we fetched from json
// 		for ( let element of data )
// 		{
// 			lProducts.push( element );
// 		}

// 		let html = "";
// 		for ( let product of lProducts )
// 		{
// 			html += product.renderInList();
// 		}

// 		grabEl('main').innerHTML = html;
// 	}
// );
