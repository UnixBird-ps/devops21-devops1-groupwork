const os = require( "os" );
require( "./fakedom.js" );
const { test, expect } = require( "@jest/globals" );
global.listen = require( "../frontend/js/helpers.js" ).listen;
const Product = require( "../frontend/js/product.js");
const debugMsg = require( "../backend/debug-funcs.js" );


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
				let lRenderStr = lTestProduct.render();
				console.log( lRenderStr );
				lRenderStr = lRenderStr.split( os.EOL );
				console.log( lRenderStr );
				for ( s of lRenderStr ) s = s.trim() + os.EOL;
				console.log( lRenderStr );
				lRenderStr = lRenderStr.join();
				console.log( lRenderStr );
			}
		);

	}
);
