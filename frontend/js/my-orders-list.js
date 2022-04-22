
class MyOrdersList
{
	constructor()
	{
		this.readDataFromDb();

		// add some event listeners
		this.addEventListeners();
	}


	async readDataFromDb()
	{
		// Get data from backend
		let lData = await ( await fetch( '/api/my-orders' ) ).json();

		// // convert from json to a JavaScript data structure
		// // data will be an array of generic objects
		// let data = await rawData.json();

		// create a new property called mMyOrders
		this.mMyOrders = [];
		// Loop through the data we fetched and populate our

		// while ( lData.length > 0 )
		// {
		// 	let lDataIter = 0;
		// 	let lOrderId = lData[ lDataIter ].orderId;
		// 	let lOrderDate = lData[ lDataIter ].orderDate;
		// 	let lOrderCost = 0;

		// 	let lSameOrderRows = lData.filter( v => v.orderId == lOrderId );

		// 	for ( let e of lSameOrderRows ) lOrderCost += e.price * e.quantity;

		// 	lData = lData.filter( v => v.orderId != lOrderId );

		// 	this.mMyOrders.push
		// 	(
		// 		{
		// 			order : lOrderId,
		// 			date : lOrderDate,
		// 			cost : lOrderCost
		// 		}
		// 	);
		// }

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
			html += "<tr>";
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


	addEventListeners()
	{
	}

}


// For Jest - check if we are in a Node.js environment
// if so export the class for Jest
if ( typeof module === 'object' && module.exports )
{
  module.exports = MyOrdersList;
}
