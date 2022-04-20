
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
		for ( let iRowItem of lData )
		{
			this.mMyOrders.push
			(
				{
					"Order" : iRowItem.orderId,
					"Date" : iRowItem.orderDate,
					"Product" : iRowItem.name,
					"Quantity" : iRowItem.quantity
				}
			);
		}
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
			for ( let lVal of Object.values( iOrderRow ) ) html += "<td>" + lVal + "</td>";
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
