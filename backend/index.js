const path = require( 'path' );
const betterSqlite3 = require( 'better-sqlite3' );
const express = require( 'express' );
const login = require( './login' );

const port = process.env.PORT || 3000;
const db = betterSqlite3( './backend/database/webshop.db' );

const app = express();

app.use( express.static( './frontend' ) );

app.use( express.json( { limit: '100MB' } ) );

app.listen( port, () =>
	console.log( 'Listening on http://localhost:' + port )
);

login( app, db );

const setupRESTapi = require( './rest-api.js' );
setupRESTapi( app, db );

app.all( '*', ( req, res ) =>
	{
		res.status( 404 );
		res.set( 'Content-Type', 'text/html' );
		res.sendFile( path.join( __dirname, '../frontend', '404.html' ) );
	}
);
