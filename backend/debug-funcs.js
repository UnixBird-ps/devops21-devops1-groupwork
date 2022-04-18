
/**
Writes a debug message with caller's name and row number to the screen
Usage:
debugMsg( "Value of arg:\n", "Content of arg" );
Output will look like:
DEBUG:
path-to-source/file.js
Value of arg:
Content of arg
*/
function debugMsg( ...pMsg )
{
	console.log( "DEBUG message at:", ( new Error().stack.split( "at " )[ 2 ] ).trim() );
	let lMsg = "";
	for ( s of [ ...pMsg ] ) lMsg += s;
	console.log( lMsg );
}

module.exports = { debugMsg };
