
class MyOrdersList
{
	constructor()
	{
		// create a new property called mMyOrders
		this.mMyOrders = [];

		let lNavLinksContainer = document.querySelector( '.nav-links' );
		lNavLinksContainer.innerHTML = ' <a href="/home">Home</a>';

		if ( !MyOrdersList.eventListenersAdded )
		{
			this.addEventListeners();
		}
	}



	formatSEK( number )
	{
		return new Intl.NumberFormat( 'sv-SE', { style: 'currency', currency: 'SEK' } ).format( number );
	}


	// Render list of orders
	render()
	{
		let lLabels = [ "Order#", "Date", "Total" ];

		let html = "";
		html += "<table name='my-orders'>";
		if ( this.mMyOrders.length > 0 )
			html += "<caption>My Orders</caption>";
		else
			html += "<caption>Your order history is empty</caption>";

		html += "<thead>";
		html += "<tr>";
		for ( let lLabel of lLabels ) html += "<td>" + lLabel + "</td>";
		html +="</tr>";
		html += "</thead>";
		html += "<tbody>";
		for ( let iOrderRow of this.mMyOrders )
		{
			html += `<tr class='orderlist-row' id='i${ iOrderRow.id }'>`;
			html += "<td>" + iOrderRow.id + "</td>";
			html += "<td>" + iOrderRow.date + "</td>";
			html += "<td>" + this.formatSEK( iOrderRow.grandTotal ) + "</td>";
			html +="</tr>";
		}
		html += "</tbody>";
		html += "</table>";

		// Return html for all the products
		return html;
	}


	async fetchRender()
	{
		let result = fetch( '/api/my-orders' )
		.then
		(
			( lRes ) => lRes.json()
		)
		.then
		(
			( lRes ) =>
			{
				// create a new property called mMyOrders
				this.mMyOrders.length = 0;

				// Loop through the data we fetched and populate our list
				for ( let lOrder of lRes ) this.mMyOrders.push( lOrder );

				return this.render();
			}
		);

		return await result;
	}


	addEventListeners()
	{
		// Add a click event handler for a product in a list
		listen
		(
			'click',
			'.orderlist-row',
			async event =>
			{
				// which product did the user click on?
				let lOrderRowElement = event.target.closest( '.orderlist-row' );

				// read the id from the id attribute of the product div
				let id = +lOrderRowElement.getAttribute( 'id' ).slice( 1 );

				// find the product we clicked on in this.products
				// by using the array method find
				let lOrder = this.mMyOrders.find( o => o.id === id );

				grabEl( 'main' ).innerHTML = "<button class='back-button-orders'>Back to My orders</button>" + ( await ( new MyOrderDetails( lOrder.id ) ).fetchRender() );

				let lNavLinksContainer = document.querySelector( '.nav-links' );
				lNavLinksContainer.innerHTML = ' <a href="/home">Home</a>';
			}
		);

		// Add an event listener for the back button
		listen
		(
			'click',
			'.back-button-orders',
			() =>
			{
				// replace the contents of main with the product list
				grabEl( 'main' ).innerHTML = this.render();

				let lNavLinksContainer = document.querySelector( '.nav-links' );
				lNavLinksContainer.innerHTML = ' <a href="/home">Home</a>';
			}
		);

		MyOrdersList.eventListenersAdded = true;
	}

}


// For Jest - check if we are in a Node.js environment
// if so export the class for Jest
if ( typeof module === 'object' && module.exports )
{
  module.exports = MyOrdersList;
}
