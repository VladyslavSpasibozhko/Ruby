loader.loaderOn()
window.betsModules = [
    {
        name:'search',
        wrap:'#my-bets-search'
    },
    {
        name:'right-column',
        wrap:'#my-bets-right-column'
    },
    {
        name:'bets-big'
    }
];

fetch('./pagesHTML/my-bets.html')
    .then(res => res.text())
    .then(res => {
        const main = document.querySelector('.main');
        main.innerHTML = res;
    })
    .then(res => ld.loadModules(betsModules))
    .then(res => changeLanguage())
    .then(res => toTop())
    .then(res => loader.loaderOff())
    .catch(err => console.log(err))
