
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
				lProducts.push
				(
					{
						"Order" : element.orderId,
						"Date" : element.orderDate,
						"Product" : element.name,
						"Quantity" : element.quantity
					}
				);
			}
			let lLabels = [ "Order", "Date", "Product", "Quantity" ];

			let html = "";
			html += "<table name='my-orders'>";
			if ( lProducts.length > 0 )
				html += "<caption>My Orders</caption>";
			else
				html += "<caption>No orders yet.</caption>";

			html += "<thead>";
			html += "<tr>";
			for ( let lLabel of lLabels ) html += "<td>" + lLabel + "</td>";
			html +="</tr>";
			html += "</thead>";
			html += "<tbody>";
			for ( let product of lProducts )
			{
				html += "<tr>";
				for ( let lVal of Object.values( product ) ) html += "<td>" + lVal + "</td>";
				html +="</tr>";
			}
			html += "</tbody>";

			html += "</table>";

			grabEl( "main" ).innerHTML = html;
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
