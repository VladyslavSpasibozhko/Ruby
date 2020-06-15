window.prematchModules = [
	{
		name:'right-column',
		wrap: '#prematch-right-column'
	},
	{
		name:'search',
		wrap: '#prematch-search'
	},
	{
		name:'hot-news',
		wrap: '#prematch-hot-news'
	},
	{
		name:'favourite',
		wrap: '#prematch-favourite'
	},
	{
		name:'classification',
		wrap: '#prematch-classification'
	}
];

fetch('./pagesHTML/prematch.html')
	.then(res => res.text())
	.then(res => {
		const main = document.querySelector('.main');
		main.innerHTML = res;
	})
	.then(res => ld.loadModules(prematchModules))
	.then(res => changeLanguage())
	.catch(err => console.log(err))