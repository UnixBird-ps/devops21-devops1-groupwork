const { defaults } = require( "jest-config" );

module.exports =
{
	testRunner : "jasmine2",
	reporters: [ "default", "jest-allure" ],
	setupFilesAfterEnv: [ "jest-allure/dist/setup" ]
};
