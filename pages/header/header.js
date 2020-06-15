var headerModules = [
	{
		name:'logo',
		wrap: '#header-forLogo'
	},
	{
		name:'menu',
		wrap: '#header-forMenu'
	},
	{
		name:'menu-bottom',
		wrap: '#header-forMenuBottom'
	},
	{
		name: config._config.CUSTOMER_CONFIG.LOGGED_IN ? 'login-in' : 'login',
		wrap: '#header-forLogin'
	},
	{
		name:'registration'
	},
];

ld.loadModules(headerModules);
