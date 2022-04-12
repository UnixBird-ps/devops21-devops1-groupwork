
class ShoppingCart {

  orderRows = [];

  add(quantity, product) {
    // Add a new order row
    this.orderRows.push({
      quantity,
      product
    });

    console.log(this.orderRows);

    // for now render the shopping cart to the footer
    document.querySelector('footer').innerHTML =
      this.render();
  }


	formatSEK(number)
	{
		return new Intl.NumberFormat( 'sv-SE', { style: 'currency', currency: 'SEK' } ).format( number );
	}


	render()
	{
		// create a html table where we display
		// the order rows of the shopping cart
		let html = '<table class="shoppingList">';
		let totalSum = 0;
		for (let orderRow of this.orderRows) {
			let rowSum =
			orderRow.quantity * orderRow.product.price;
			html += `
			<tr>
				<td>${ orderRow.quantity }</td>
				<td>${ orderRow.product.name }</td>
				<td>${ this.formatSEK( orderRow.product.price ) }</td>
				<td>${ this.formatSEK( rowSum ) }</td>
			</tr>
			`;
			totalSum += rowSum;
		}
		// add the totalSum
		html += `<tr>
			<td colspan="3">Total:</td>
			<td>${  this.formatSEK( totalSum ) }</td>
		</tr>`;
		html += '</table>';
		return html;
	}

}


// For Jest - check if we are in a Node.js environment
// if so export the class for Jest
if ( typeof module === 'object' && module.exports )
{
  module.exports = ShoppingCart;
}