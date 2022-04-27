
class MyOrdersList
{
	constructor()
	{
		// Create a static property
		MyOrdersList.mMyOrders = [];

		// Change URL for first nav link
		let lNavLinksContainer = document.querySelector( '.nav-links' );
		lNavLinksContainer.innerHTML = ' <a href="/home">Home</a>';

		// Call only once
		if ( !MyOrdersList.eventListenersAdded )
		{
			this.addEventListeners();
		}
	}


	/**
	Returns HTML containing a table with the orders
	*/
	render()
	{
		let lLabels = [ "Order#", "Date", "Order total" ];

		let html = "";
		html += "<table name='my-orders'>";
		if ( MyOrdersList.mMyOrders.length > 0 )
			html += "<caption>My Orders</caption>";
		else
			html += "<caption>Your order history is empty</caption>";

		html += "<thead>";
		html += "<tr>";
		for ( let lLabel of lLabels ) html += "<td>" + lLabel + "</td>";
		html +="</tr>";
		html += "</thead>";
		html += "<tbody>";
		for ( let iOrderRow of MyOrdersList.mMyOrders )
		{
			html += `<tr class='orderlist-row' id='i${ iOrderRow.id }'>`;
			html += "<td>" + iOrderRow.id + "</td>";
			html += "<td>" + iOrderRow.date + "</td>";
			html += "<td>" + formatSEK( iOrderRow.grandTotal ) + "</td>";
			html +="</tr>";
		}
		html += "</tbody>";
		html += "</table>";

		// Return html for all the products
		return html;
	}


	/**
	Updates the list of orders from DB and returns HTML
	*/
	async fetchRender()
	{
		// Retrieve data from DB and convert it to easy readable form, in our case an iterable object
		let lRes = await ( await fetch( '/api/my-orders' ) ).json();
		// Start from an empty list
		MyOrdersList.mMyOrders.length = 0;
		// Loop through the data we fetched and populate our list
		for ( let lOrder of lRes ) MyOrdersList.mMyOrders.push( lOrder );
		// Return HTML
		return this.render();
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
				let lOrder = MyOrdersList.mMyOrders.find( o => { console.log( o.id ); return o.id == id } );
				debugMsg( "lOrder: ", lOrder );

				let html = "";
				html += `<button class="back-button-orders">Back to My orders</button>`;
				html += `<div class="order-caption">`;
				html += `<span>Order details</span>`;
				html += `</div>`;
				html += `<div class="order-caption">`;
				html += `<span>Order ID: ${ lOrder.id }</span><span>Total order cost: ${ formatSEK( lOrder.grandTotal ) }</span>`;
				html += `</div>`;
				html += await ( await ( new MyOrderDetails( lOrder.id ) ) ).fetchRender();
				grabEl( 'main' ).innerHTML = html;

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
