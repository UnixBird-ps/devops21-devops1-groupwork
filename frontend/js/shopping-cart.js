
class ShoppingCart {

  constructor() {
    this.addOrderButtonEvent();
	this.addCancelButtonEvent();
	this.addDelTableRowEvent();
  }

  orderRows = [];

  add(quantity, product) {

	// check if the product alread is in the cart
    let found = false;
    for (let orderRow of this.orderRows) {
      if (orderRow.product === product) {
        // add quantity
        orderRow.quantity += quantity;
        found = true;
      }
    }

	// if the product wasn't in the cart already
    if (!found) {
		// Add a new order row
		this.orderRows.push({
		  quantity,
		  product
		});
	}

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
		let html = '<div class="cartContainer">'
		html += '<table class="shoppingCart">';
		let totalSum = 0;
		for (let orderRow of this.orderRows) {
			let rowSum =
			orderRow.quantity * orderRow.product.price;
			html += `
			<tr class="tableRow" id="${orderRow.product.id}">
				<td><button class="delCartWare">X</button></td>
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
			<td>${this.formatSEK(totalSum)}</td>
		</tr>`;
		html += '</table>';
		html += `<div class="cartButtons"><button class="cancelButton">Cancel</button>
		<button class="orderButton">Order</button></div>`;
		html += '</div>';
		return html;
	}

	addDelTableRowEvent(){
		listen('click', '.delCartWare', event =>{
			let rowElement = event.target.closest('.tableRow, .product');
			let rowId = +rowElement.getAttribute('id');
			//alert('AAAA');
			let index = 0;
			for(let nOrder in this.orderRows){
				if(rowId === this.orderRows[nOrder].product.id){
					this.orderRows.splice(index, 1);
				}
				index ++;
			}
			if(this.orderRows.length === 0){
				grabEl('.cartContainer').style.display = 'none';
			}else{
				document.querySelector('footer').innerHTML = this.render();
			}
			return;
		});
	}

	addOrderButtonEvent() {
		listen('click', '.orderButton', () => {
		  	let shoppingCart = grabEl('.shoppingCart')
			this.addOrders();
			console.log(shoppingCart);
			grabEl('.cartContainer').style.display = 'none';
			return;
		});
	}

	addCancelButtonEvent() {
		listen('click', '.cancelButton',()=>{
			this.orderRows = [];
			grabEl('.cartContainer').style.display = 'none';
			return;
		});
	}
	
	addOrders() {
		let data = this.orderRows; 
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
				console.log('Success:', data);
				//alert('YOU DID IT');
			})
			.catch((error) => {
				console.error('Error:', error);
				//alert('FAILURE');
			});
			this.orderRows = [];
	}
}


// For Jest - check if we are in a Node.js environment
// if so export the class for Jest
if ( typeof module === 'object' && module.exports )
{
  module.exports = ShoppingCart;
}
