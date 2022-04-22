
class MyOrderDetails
{
	constructor( pOrderId )
	{
		this.mOrderId = pOrderId;

		this.mOrderDetails = [];

		// // create a new property called mMyOrders
		// this.mOrderDetails =
		// [
		// 	{ id : 1, name :        "Soap",  price :  9.95,  quantity: 2, total : 19.90  },
		// 	{ id : 2, name : "Conditioner",  price : 12.95,  quantity: 1, total : 12.95 }
		// ];

		this.readDataFromDb();

		//debugMsg( "this.mOrderDetails:\n", this.mOrderDetails );

		// // add some event listeners
		// this.addEventListeners();
	}


	async readDataFromDb()
	{
		this.mOrderDetails.length = 0;// = [];

		// Get data from backend
		let lData = await ( await fetch( '/api/my-order-details/' + this.mOrderId ) ).json();

		// Loop through the data we fetched and populate our
		for ( let lOrderDetail of Object.values( lData ) )
		{
			this.mOrderDetails.push( lOrderDetail );
		}
	}


	formatSEK( number )
	{
		return new Intl.NumberFormat( 'sv-SE', { style: 'currency', currency: 'SEK' } ).format( number );
	}


	// Render list of orders
	render()
	{
		debugMsg( "typeof this.mOrderDetails:\n", typeof this.mOrderDetails );
		console.log( this.mOrderDetails );
		console.log( this.mOrderDetails.length );

		let lLabels = [ "Name", "Price", "Quantity", "Total" ];

		let html = "";
		html += "<table name='order-details'>";
		if ( this.mOrderDetails.length > 0 )
			html += "<caption>Order details</caption>";
		else
			html += "<caption>Could't find any item for this order</caption>";

		html += "<thead>";
		html += "<tr>";
		for ( let lLabel of lLabels ) html += "<td>" + lLabel + "</td>";
		html +="</tr>";
		html += "</thead>";
		html += "<tbody>";
		for ( let iDetailRow of this.mOrderDetails )
		{
			html += `<tr class='detail-row' id='i${ iDetailRow.id }'>`;
			html += "<td>" + iDetailRow.name + "</td>";
			html += "<td>" + iDetailRow.price + "</td>";
			html += "<td>" + iDetailRow.quantity + "</td>";
			html += "<td>" + this.formatSEK( iDetailRow.total ) + "</td>";
			html +="</tr>";
		}
		html += "</tbody>";
		html += "</table>";

		// Return html for all the products
		return html;
	}

}


// For Jest - check if we are in a Node.js environment
// if so export the class for Jest
if ( typeof module === 'object' && module.exports )
{
  module.exports = MyOrderDetails;
}
