const os = require( "os" );
require( "./fakedom.js" );
const { test, expect } = require( "@jest/globals" );
global.listen = require( "../frontend/js/helpers.js" ).listen;
const Product = require( "../frontend/js/product.js");
const debugMsg = require( "../backend/debug-funcs.js" ).debugMsg;


describe(
	'Unit tests for the class Product',
	() =>
	{
		let lFakeProductData =
		{
			id : 9999,
			name : 'The brick',
			price : 14.95,
			description : 'A very useful tool',
			image: ''
		}

		let lTestProduct = new Product(
			lFakeProductData.id,
			lFakeProductData.name,
			lFakeProductData.price,
			lFakeProductData.description,
			lFakeProductData.image,
			null
		);


		test( 'Creation of a product',
			() =>
			{
				expect( lTestProduct.id ).toBe( 9999 );
				expect( lTestProduct.name ).toBe( 'The brick' );
				expect( lTestProduct.price ).toBe( 14.95 );
				expect( lTestProduct.description ).toBe( 'A very useful tool' );
			}
		);


		test( 'Rendering of a product',
			() =>
			{
				// Prep a string that will be compared with the received string from renderer
				// Removing any leading and trailing new-lines, removing any indentation
				let lExpectedHTML = `
				<div class="product" id="i9999">
				<img src="">
				<h3>The brick</h3>
				<div><p>A very useful tool</p></div>
				<p class="price">Price: 14.95 kr</p>
				<form>
				<input type="number" value="1" class="quantity" min="1" max="100">
				<button type="submit" class="buyButton">Buy</button>
				</form>
				</div>
				`.trim().split( "\n" ).map( s => s.trim() ).join( "\n" );

				// Get the rendering string
				// Removing any leading and trailing new-lines, removing any indentation
				let lRenderedHTML = lTestProduct.render().trim().split( "\n" ).map( s => s.trim() ).join( "\n" );

				expect( lRenderedHTML ).toBe( lExpectedHTML );
			}
		);


		test( 'Rendering of a product in list',
			() =>
			{
				// Prep a string that will be compared with the received string from renderer
				// Removing any leading and trailing new-lines, removing any indentation
				let lExpectedHTML = `
				<div class="productInList" id="i9999">
				<div class="product-img">
				<img src="">
				</div>
				<div class="product-info">
				<h3>The brick</h3>
				<p class="price">Price: 14.95 kr</p>
				<form>
				<input type="number" value="1" class="quantity" min="1" max="100">
				<button type="submit" class="buyButton">Buy</button>
				</form>
				</div>
				</div>
				`.trim().split( "\n" ).map( s => s.trim() ).join( "\n" );

				// Get the rendering string
				// Removing any leading and trailing new-lines, removing any indentation
				let lRenderedHTML = lTestProduct.renderInList().trim().split( "\n" ).map( s => s.trim() ).join( "\n" );

				expect( lRenderedHTML ).toBe( lExpectedHTML );
			}
		);

	}
);
