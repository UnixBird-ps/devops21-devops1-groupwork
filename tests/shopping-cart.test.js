
require( './fakedom.js' );
global.listen = require( '../frontend/js/helpers.js' ).listen;
const { test, expect } = require( '@jest/globals' );


describe(
	'Unit tests for the class ShoppingCart',
	() =>
	{
		const ShoppingCart = require( '../frontend/js/shopping-cart.js' );
		const myShoppingCart = new ShoppingCart();


		test( 'Shopping cart should be empty',
			() =>
			{
				expect( myShoppingCart.orderRows ).toHaveLength( 0 );
			}
		);


		test( 'Adding product to shopping cart',
			() =>
			{
				let lFakeProduct =
				{
					id : 9999,
					name : 'The brick',
					price : 14.95,
					description : 'A very useful tool',
					image: ''
				}

				myShoppingCart.add( 2, lFakeProduct );

				let lFirstProduct = myShoppingCart.orderRows[ 0 ].product;

				expect( lFirstProduct.id ).toBe( 9999 );
				expect( lFirstProduct.name ).toBe( 'The brick' );
				expect( lFirstProduct.price ).toBe( 14.95 );
				expect( lFirstProduct.description ).toBe( 'A very useful tool' );
			}
		);


		test( 'Shopping cart should have one row',
			() =>
			{
				expect( myShoppingCart.orderRows ).toHaveLength( 1 );
			}
		);

	}
)
