const passwordEncryptor = require('./passwordEncryptor');
const acl = require('./acl');
const debugMsg = require( './debug-funcs.js' ).debugMsg;

module.exports = function (app, runQuery, db) {

	app.get('/api/my-orders', (req, res) => {

		let userId = req.session.user?.id;

		runQuery('my-orders', req, res, { customerId: userId }, `
		SELECT * FROM orderDetails WHERE customerId = :customerId
		`);

	});


	// Route for receiving new orders
	app.post(
		"/api/new-order", ( req, res ) =>
		{
			// Check that the current user has the right to create new orders
			if ( !acl( "new-order", req ) )
			{
				res.status( 405 );
				res.json( { error: "Not allowed!" } );
				return;
			}

			// Get user id from session
			let userId = req.session.user?.id;
			let lOrderId = -1;

			try
			{
				// Prep time string
				let lTimeStr = new Date().toISOString();
				// replace 'T' with a space
				lTimeStr = lTimeStr.split( "T" ).join( " " );
				// remove miliseconds part and time zone abbreviation character
				lTimeStr = lTimeStr.split( "." )[ 0 ];

				// Add single order row to db
				let result;
				let lSql = "";
				lSql  = `INSERT INTO orders ( customerId, date )`;
				lSql += ` VALUES ( ${ userId }, '${ lTimeStr }' )`;
				result = db.prepare( lSql ).run();
				lOrderId = result.lastInsertRowid;

				// Add product rows of the order to db
				let values = "";
				for ( let i = 0; i < req.body.length; i++ )
				{
					let r = req.body[ i ];
					// Construct ( productId, quantity ) for every row,
					// adding a comma at the end of every but the last row
					values += `( ${ result.lastInsertRowid },${ Object.values( r ).map( x => " '" + x + "'" ) } )${ i < req.body.length - 1 ? ",\n" : "" }`;
				}
				lSql  = `INSERT INTO ordersXproducts ( orderId, ${ Object.keys( req.body[ 0 ] ) } )`;
				lSql += ` VALUES\n${ values }`,
				debugMsg( "lSql:\n", lSql );
				result = db.prepare( lSql ).run();
			}
			catch ( e )
			{
				result = { error: e + '' };
				console.log( e );
			}

			// Prep a respone to HTTP client
			res.json( { status : "Was accepted", lastInsertRowid : lOrderId } );
		}
	);


  function editMyUserInfo(req, res) {

    delete req.body.userRole;

    let userId = req.session.user?.id;

    let queryParameters = { ...req.body, id: userId };

    if (queryParameters.password) {
      queryParameters.password = passwordEncryptor(queryParameters.password);
    }

    // If you knew about this route
    // you could elevated your userRole directly because it lacked
    delete req.body.userRole;

    runQuery('edit-my-user-info', req, res, queryParameters, `
        UPDATE customers
        SET ${Object.keys(req.body).map(x => x + ' = :' + x)}
        WHERE id = :id
    `);

    let stmt = db.prepare('SELECT * FROM customers WHERE id = :id');
    let updatedUserInfo = stmt.all({ id: queryParameters.id })[0];
    delete updatedUserInfo.password;
    req.session.user = updatedUserInfo;
  }
  app.put('/api/edit-my-user-info', editMyUserInfo);
  app.patch('/api/edit-my-user-info', editMyUserInfo);

}
