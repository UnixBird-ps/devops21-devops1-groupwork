
// Node.js where Jest run has no DOM
// but we can fake it using the correct libraries
// Documentation: https://www.npmjs.com/package/jsdom
const jsdom = require( 'jsdom' );
const { JSDOM } = jsdom;

// fs is a built in module to read and write files
// path is a built in module to work with file paths
const fs = require( 'fs' );
const path = require( 'path' );

// load our index file
const dom = new JSDOM( fs.readFileSync( path.join( __dirname, '../frontend/index.html' ) ) );

// now fake our document object needed for
// querySelector etc
global.document = dom.window.document;
