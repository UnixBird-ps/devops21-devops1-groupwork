
class MyOrdersList
{
	constructor()
	{
		// create a new property called mMyOrders
		this.mMyOrders = [];

		this.readDataFromDb();

		if ( !MyOrdersList.eventListenersAdded )
		{
			this.addEventListeners();
		}

		//this.render();

		// // add some event listeners
		// this.addEventListeners();
	}


	async readDataFromDb()
	{
		// Get data from backend
		let lData = await ( await fetch( '/api/my-orders' ) ).json();

		// create a new property called mMyOrders
		this.mMyOrders.length = 0;

		// Loop through the data we fetched and populate our
		for ( let lOrder of lData ) this.mMyOrders.push( lOrder );
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
		fetch( '/api/my-orders' )
		.then
		(
			lRes =>
			{
				if ( !lRes.ok )
				{
					throw new Error( `HTTP error: ${ lRes.status } `);
				}
				return lRes.json();
			}
		).then
		(
			lRes =>
			{
				// create a new property called mMyOrders
				this.mMyOrders.length = 0;

				// Loop through the data we fetched and populate our
				for ( let lOrder of lRes ) this.mMyOrders.push( lOrder );

				grabEl( 'main' ).innerHTML = this.render();
			}
		)
	}


	addEventListeners()
	{
		// Add a click event handler for a product in a list
		listen
		(
			'click',
			'.orderlist-row',
			event =>
			{
				// which product did the user click on?
				let lOrderRowElement = event.target.closest( '.orderlist-row' );

				// read the id from the id attribute of the product div
				let id = +lOrderRowElement.getAttribute( 'id' ).slice( 1 );

				// find the product we clicked on in this.products
				// by using the array method find
				let lOrder = this.mMyOrders.find( o => o.id === id );

				// let lOrderDetails = new MyOrderDetails( lOrder.id );
				// grabEl( 'main' ).innerHTML = lOrderDetails.render();

				document.orderDetails = new MyOrderDetails( lOrder.id );
				grabEl( 'main' ).innerHTML = "<button class='backButton'>Back to My orders</button>" + document.orderDetails.render();
			}
		);

		// Add an event listener for the back button
		listen
		(
			'click',
			'.backButton',
			() =>
			{
				// replace the contents of main with the product list
				grabEl( 'main' ).innerHTML = this.render();
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
