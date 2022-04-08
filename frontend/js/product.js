class Product {

  static eventListenersAdded = false;

  // In JS the constructor is named constructor
  // (not after the class name)
  constructor(id, name, price, description, image, myProductList) {

    if (!Product.eventListenersAdded) {
      this.addEventListeners();
    }

    // it could be wist to have specifications
    // for a program where we EXPECT the program
    // to throw errors on bad input
    if (typeof id !== 'number') {
      throw (new Error('id must be a number'))
    }

    // transfer parameters to properties
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;//'';//'https://source.unsplash.com/random/640x360/?'+ name.split(' -')[0];
    this.myProductList = myProductList;
  }

  // A method that shows info about the product as html
  render() {
    let htmlDescription = '<p>' +
      this.description.replaceAll('\n\n', '</p><p>') + '</p>';
    // (why not just the number as id? because the id attribute
    // in html should start with a-z or A-Z according to specs)
    return `
      <div class="product" id="i${this.id}">
        <img src="${this.image}">
        <h3>${this.name}</h3>
        <div>${htmlDescription}</div>
          <p class="price">Price: ${this.price} kr</p>
          <form>
            <input type="number" value="1" class="quantity" min="1" max="100">
            <button type="submit" class="buyButton">Buy</button>
          </form>
      </div>
    `;
  }

	// A method that shows compact info about the product (in a list)
	renderInList() {
		return `
		<div class="productInList" id="i${this.id}">
				<img src="${this.image}">
				<h3>${this.name}</h3>
				<p class="price">Price: ${this.price} kr</p>
				<form>
					<input type="number" value="1" class="quantity" min="1" max="100">
					<button type="submit" class="buyButton">Buy</button>
				</form>
		</div>
		`;
	}

  addEventListeners() {

    listen('submit', '.productInList form, .product form', event => {
      // All web browser wants to reload the page on a form submit
      // (for historical reasons) - we don't want that so we ask
      // the browser to not perform it default action.
      event.preventDefault();

      // get the form element and then the quantity input field
      // - then read the quantity value
      let formElement = event.target;
      let quantityElement = formElement.querySelector('.quantity');
      let quantity = +quantityElement.value;

      // which product did the user click on?
      let productElement = event.target.closest('.productInList, .product');
      // read the id from the id attribute of the product div
      let id = +productElement.getAttribute('id').slice(1);
      // find the product we clicked on in this.products
      // by using the array method find
      let product = this.myProductList.products.find(product => product.id === id);

      this.myProductList.shoppingCart.add(quantity, product);

    });

    Product.eventListenersAdded = true;

  }


}

// For Jest - check if we are in a Node.js environment
// if so export the class for Jest
if (typeof module === 'object' && module.exports) {
  module.exports = Product;
}