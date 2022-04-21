
/**
Writes a debug message with caller's name and row number to screen
For example:
let myVar="12.345";
debugMsg( "myVar: ", myVar, "\nThird" );
Will output:
DEBUG at: path-to-source/file.js:#:#
myVar: 12.345
Third
*/
function debugMsg( ...pMsg )
{
	console.log( "DEBUG at:", ( new Error().stack.split( "at " )[ 2 ] ).trim() );
	let lMsg = "";
	for ( s of [ ...pMsg ] ) lMsg += JSON.stringify( s );
	console.log( lMsg );
}

module.exports = { debugMsg };
