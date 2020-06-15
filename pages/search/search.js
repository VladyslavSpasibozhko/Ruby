window.searchPageModules = [
    {
        name:'right-column',
        wrap: '#search-right-column'
    },
    {
        name:'search',
        wrap: '#search-search'
    },
    {
        name:'hot-news',
        wrap: '#search-hot-news'
    },
    {
        name:'search-result',
        wrap:'#search-search-result'
    },
    {
        name:'qb-cupon'
    }
];

fetch('./pagesHTML/search.html')
    .then(res => res.text())
    .then(res => {
        const main = document.querySelector('.main');
        main.innerHTML = res;
    })
    .then(res => ld.loadModules(searchPageModules))
    .then(res => changeLanguage())
    .then(res => toTop())
    .catch(err =>console.log(err))