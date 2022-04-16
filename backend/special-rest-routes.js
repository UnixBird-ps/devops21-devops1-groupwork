const passwordEncryptor = require('./passwordEncryptor');
const acl = require('./acl');

module.exports = function (app, runQuery, db) {

	app.get('/api/my-orders', (req, res) => {

		let userId = req.session.user?.id;

		runQuery('my-orders', req, res, { customerId: userId }, `
		SELECT * FROM orderDetails WHERE customerId = :customerId
		`);

	});

	// Route for receiving new orders
	app.post(
		"/api/post-new-order", ( req, res ) =>
		{
			// Check user's access right
			if ( !acl( "post-new-order", req ) )
			{
				res.status( 405 );
				res.json( { error: "Not allowed!" } );
				return;
			}
			console.log( req.body );

			let userId = req.session.user?.id;
			let queryParameters = { ...req.body, id: userId };

			let lOrderId = -1;

			try
			{
				let result;
				let lSql = "";
				lSql  = `INSERT INTO orders ( customerId, date )`;
				lSql += ` VALUES ( ${ userId }, '1970-01-01 00:00:00' )`;
				result = db.prepare( lSql ).run();
				lOrderId = result.lastInsertRowid;

				let values = "";
				for ( let i = 0; i < req.body.length; i++ )
				{
					let r = req.body[ i ];
					values += `( ${ result.lastInsertRowid },${ Object.values( r ).map( x => " '" + x + "'" ) } )${ i < req.body.length - 1 ? ",\n" : "" }`;
				}

				lSql  = `INSERT INTO ordersXproducts ( orderId, ${ Object.keys( req.body[ 0 ] ) } )`;
				lSql += ` VALUES ${ values }`,
				result = db.prepare( lSql ).run();
			}
			catch ( e )
			{
				result = { error: e + '' };
				console.log( e );
			}

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
