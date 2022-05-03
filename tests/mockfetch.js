
const orgFetch = fetch;
global.fetch = ( url, options) => 
{
	if (url.indexOf( "http" ) < 0 )
	{
		url = "http://localhost:3000" + url;
	}
	return orgFetch();
}
