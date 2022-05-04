
async function getLogInfo()
{
	let loggedIn;
	try
	{
		loggedIn = await ( await fetch( '/api/login' ) ).json();
	}
	catch ( ignore ) { }

	//if ( loggedIn && loggedIn.userRole !== 'superadmin' && !window.productList )
	if ( !window.productList ) window.productList = await ( new ProductList() );

	let lNavContainer = document.querySelector( "div.nav-container" );
	lNavContainer.innerHTML = await renderNavContainer();

	if ( !loggedIn || loggedIn.userRole !== "superadmin" ) grabEl( "main" ).innerHTML = await window.productList.render();

	if ( loggedIn && !loggedIn.error )
	{
		if ( loggedIn.userRole === "superadmin" ) grabEl( "main" ).innerHTML = "";

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
			// Prevent browser from reloading the page
			event.preventDefault();

			// Change URL of the first nav link
			let lNavLinksDiv = document.querySelector( '.nav-links' );
			lNavLinksDiv.innerHTML = '<a href="/home">Home</a>';

			let html = await ( new MyOrdersList ).fetchRender();
			grabEl( 'main' ).innerHTML = html;
		}

		if ( event.target.closest( 'a[href="/home"]' ) )
		{
			event.preventDefault();

			grabEl( "main" ).innerHTML = await window.productList.render();

			let lNavLinksDiv = document.querySelector( '.nav-links' );
			lNavLinksDiv.innerHTML = ' <a href="/my-orders">My orders</a>';
		}

		if ( !event.target.closest( 'a[href="/logout"]' ) ) { return; }

		event.preventDefault();

		let result;
		try {
			result = await ( await fetch('/api/login', { method: 'DELETE' } ) ).json();
		}
		catch (ignore) { }

		let lNavContainer = document.querySelector( "div.nav-container" );
		lNavContainer.innerHTML = await renderNavContainer();

		grabEl( "main" ).innerHTML = await window.productList.render();

		// Empty other elements
		grabEl( "div.select-holder" ).innerHTML = "";
		grabEl( "div.data-table" ).innerHTML = "";

		//location.reload();
	}
);
