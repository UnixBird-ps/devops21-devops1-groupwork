
class MyOrderDetails
{
	constructor( pOrderId )
	{
		// Save the order ID
		this.mOrderId = pOrderId;

		// Keep track during life time
		this.mOrderDetails = [];
	}


	/**
	Returns HTML containing a table with the order details
	*/
	render()
	{
		let lLabels = [ "Name", "Price", "Quantity", "Row Total" ];

		let html = "";
		html += "<table name='order-details'>";
		if ( this.mOrderDetails.length <= 0 )
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
			html += "<td>" + formatSEK( iDetailRow.total ) + "</td>";
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
		let lRes = await ( await fetch( '/api/my-order-details/' + this.mOrderId ) ).json();
		// Start from an empty list
		this.mOrderDetails.length = 0;
		// Loop through the data we fetched and populate our list
		for ( let lOrderDetail of Object.values( lRes ) ) this.mOrderDetails.push( lOrderDetail );
		// Return HTML
		return this.render();
	}

}


// For Jest - check if we are in a Node.js environment
// if so export the class for Jest
if ( typeof module === 'object' && module.exports )
{
  module.exports = MyOrderDetails;
}
