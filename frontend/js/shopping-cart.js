
class ShoppingCart {

	constructor()
	{
		this.orderRows = ShoppingCart.orderRows = [];

		// Call only once
		if ( !ShoppingCart.eventListenersAdded )
		{
			this.addEventListeners();
		}
	}

  add(quantity, product) {

	// check if the product alread is in the cart
    let found = false;
    for (let orderRow of ShoppingCart.orderRows) {
      if (orderRow.product === product) {
        // add quantity
        orderRow.quantity += quantity;
        found = true;
      }
    }

	// if the product wasn't in the cart already
    if (!found) {
		// Add a new order row
		ShoppingCart.orderRows.push({
		  quantity,
		  product
		});
	}

    // for now render the shopping cart to the footer
    document.querySelector( ".cartContainer" ).innerHTML = this.render();
  }


	render()
	{
		// create a html table where we display
		// the order rows of the shopping cart
		let html = "";//'<div class="cartContainer">'
		html += '<table class="shoppingCart">';
		let totalSum = 0;
		for (let orderRow of ShoppingCart.orderRows) {
			let rowSum = orderRow.quantity * orderRow.product.price;
			html += `
			<tr class="tableRow" id="${orderRow.product.id}">
				<td>
					<button type="button" class="close delCartWare" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</td>
				<td>${ orderRow.quantity }</td>
				<td>${ orderRow.product.name }</td>
				<td>${ formatSEK( orderRow.product.price ) }</td>
				<td>${ formatSEK( rowSum ) }</td>
			</tr>
			`;
			totalSum += rowSum;
		}
		// add the totalSum
		html += `<tr>
			<td colspan="3">Total:</td>
			<td>${formatSEK(totalSum)}</td>
		</tr>`;
		html += '</table>';
		html += `<div class="cartButtons">
		<button class="btn btn-sm btn-outline-dark cancelButton">Cancel</button>
		<button class="btn btn-sm btn-outline-dark orderButton">Order</button></div>`;
		//html += '</div>';
		return html;
	}


	addOrders() {
		let data = ShoppingCart.orderRows; 
		let nProducts = [];
		for(let nOrder in data){
			let nLib = {};
			nLib['productId'] = data[nOrder].product.id;
			nLib['quantity'] = data[nOrder].quantity;
			nProducts.push(nLib);
		}
		// send request to backend
		fetch('/api/new-order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(nProducts),
		})
			.then(response => response.json())
			.then(data => {
				if ( data?.error?.toLowerCase().includes( "not allowed" ) )
					alert( "Please login to place order" );
				else
				{
					ShoppingCart.orderRows = [];
					grabEl('.cartContainer').innerHTML = "";//style.display = 'none';
					alert( "Order was sent. Thank you for your order." );
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}


	addEventListeners()
	{
		listen('click', '.delCartWare', event =>{
			let rowElement = event.target.closest('.tableRow, .product');
			let rowId = +rowElement.getAttribute('id');
			let index = 0;
			for(let nOrder in ShoppingCart.orderRows){
				if(rowId === ShoppingCart.orderRows[nOrder].product.id){
					ShoppingCart.orderRows.splice(index, 1);
				}
				index ++;
			}
			if(ShoppingCart.orderRows.length === 0){
				grabEl('.cartContainer').innerHTML = ""; //.style.display = 'none';
			}else{
				//document.querySelector('footer').innerHTML = this.render();
				document.querySelector( ".cartContainer" ).innerHTML = this.render();
			}
			return;
		});


		listen('click', '.orderButton', () => {
		  	//let shoppingCart = grabEl('.shoppingCart')
			this.addOrders();
			return;
		});


		listen('click', '.cancelButton',()=>{
			ShoppingCart.orderRows = [];
			grabEl('.cartContainer').innerHTML = "";//style.display = 'none';
			return;
		});

		ShoppingCart.eventListenersAdded = true;
	}

}


// For Jest - check if we are in a Node.js environment
// if so export the class for Jest
if ( typeof module === 'object' && module.exports )
{
  module.exports = ShoppingCart;
}
