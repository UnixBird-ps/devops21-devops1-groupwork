
class MyOrderDetails
{
	constructor( pOrderId )
	{
		this.mOrderId = pOrderId;

		this.mOrderDetails = [];
	}


	formatSEK( number )
	{
		return new Intl.NumberFormat( 'sv-SE', { style: 'currency', currency: 'SEK' } ).format( number );
	}


	// Render list of orders
	render()
	{
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


	async fetchRender()
	{
		let result = fetch( '/api/my-order-details/' + this.mOrderId )
		.then
		(
			( lRes ) => lRes.json()
		).then
		(
			( lRes ) =>
			{
				// create a new property called mMyOrders
				this.mOrderDetails.length = 0;

				// Loop through the data we fetched and populate our list
				for ( let lOrderDetail of Object.values( lRes ) ) this.mOrderDetails.push( lOrderDetail );

				return this.render();
			}
		);

		return await result;
	}

}


// For Jest - check if we are in a Node.js environment
// if so export the class for Jest
if ( typeof module === 'object' && module.exports )
{
  module.exports = MyOrderDetails;
}
