class ProductList {

  constructor() {
    // add some event listeners
    this.addEventListeners();

    // When we create a new ProductList
    // call the methodreadDataFromFIle
    this.readDataFromDb();

    // Create a new shopping cart
    this.shoppingCart = new ShoppingCart();
  }

  // async methods/functions can use the keyword
  // await to wait for things like loading data etc.
  async readDataFromDb() {
    // read the json data
    let rawData = await fetch('/api/products');
    // convert from json to a JavaScript data structure
    // data will be an array of generic objects
    let data = await rawData.json();

    // convert the data to an array of 100 instances of Product
    // for...of = foreach

    // create a new property called products
    this.products = [];

    // loop through the data we fetched from json
    for (let element of data) {
      // create an instance of Products based on a generic object
      // from the son data
      // (note: this = this Productlist)
		let lImgSrc = element.img_url.indexOf( "http" ) < 0 ? "./images/" + element.img_url : element.img_url;
      let aProduct = new Product(element.id, element.name,
        element.price, element.description, lImgSrc, this);
      // add the product to the products array
      this.products.push(aProduct);
    }

    // Render the product list and replace the contents
    // of the main-tag in our html with the product list
    //grabEl('main').innerHTML = this.render();
  }

	// Render a list of products
	render()
	{
		debugMsg();
		console.log( this.products );
		if ( !this.products ) await readDataFromDb();

		// Create the variable html - an empty string
		let html = "";
		html += "<p>Click on a product name to see product details.</p>";
		// Loop through all products and add the html
		// for each product to the html variable
		for (let product of this.products) {
		html += product.renderInList();
		}
		// Return html for all the products
		return html;
	}

  addEventListeners() {

    // Add a click event handler for a product in a list
    listen('click', '.productInList h3', event => {
      // which product did the user click on?
      let productElement = event.target.closest('.productInList');

      // read the id from the id attribute of the product div
      let id = +productElement.getAttribute('id').slice(1);

      // find the product we clicked on in this.products
      // by using the array method find
      let product = this.products.find(product => product.id === id);

      // replace the content in the main element with the
      // detailed html for the product
      grabEl('main').innerHTML = `
        <button class="backButton">
          Back to product list
        </button>`
        + product.render();
    });

    // Add an event listener for the back button
    listen('click', '.backButton', () => {
      // replace the contents of main with the product list
      grabEl('main').innerHTML = this.render();
    });

  }

}


// For Jest - check if we are in a Node.js environment
// if so export the class for Jest
if (typeof module === 'object' && module.exports) {
  module.exports = ProductList;
}
