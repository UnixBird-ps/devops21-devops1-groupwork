const { test, expect } = require( "@jest/globals" );
require( "./fakedom.js" );
global.listen = require( "../frontend/js/helpers.js" ).listen;
global.formatSEK = require( "../frontend/js/helpers.js" ).formatSEK;
const MyOrdersList = require( "../frontend/js/my-orders-list.js");


describe(
	"Unit tests for the class 'MyOrdersList'",
	() =>
	{
		let lOrdersList = new MyOrdersList();

		test
		(
			"List exists and is empty after constructor",
			() =>
			{
				expect( MyOrdersList.mMyOrders ).toBeDefined();
				expect( MyOrdersList.mMyOrders ).toHaveLength( 0 );
			}
		)


		test
		(
			"List is rendered correctly",
			() =>
			{
				let lMockOrders =
				[
					{ id : 9998, date : "1970-01-01 23:59:58", grandTotal : 1199 },
					{ id : 9999, date : "1970-01-01 23:59:59", grandTotal : 1299 }
				];

				MyOrdersList.mMyOrders = lMockOrders;

				expect( MyOrdersList.mMyOrders ).not.toHaveLength( 0 );

				let lExpectedHTML = `
				<table name="my-orders">
					<caption>My Orders</caption>
					<thead>
						<tr>
							<td>Order#</td><td>Date</td><td>Order total</td>
						</tr>
					</thead>
					<tbody>
						<tr class="orderlist-row" id="i9998">
							<td>9998</td>
							<td>1970-01-01 23:59:58</td>
							<td>1 199,00 kr</td>
						</tr>
						<tr class="orderlist-row" id="i9999">
							<td>9999</td>
							<td>1970-01-01 23:59:59</td>
							<td>1 299,00 kr</td>
						</tr>
					</tbody>
				</table>
				`.trim().replace( /^\s*/gm, "" ).split( "\n" ).map( s => s.trim() ).join( "\n" );

				let lRenderedHTML = lOrdersList.render().replace( /^\s*/gm, "" ).trim().split( "\n" ).map( s => s.trim() ).join( "\n" );

				expect( lRenderedHTML ).toBe( lExpectedHTML );

			}
		)
	}
);
