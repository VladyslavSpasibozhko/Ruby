loader.loaderOn()
window.accountModules = [
    {
        name:'right-column',
        wrap: '#account-right-column'
    },
    {
        name:'usermenu',
        wrap: '#account-usermenu'
    },
    {
        name:'search',
        wrap: '#account-search'
    },
    {
        name:'account-setting'
    },
    {
        name:'qb-cupon'
    },
];

fetch('./pagesHTML/account.html')
    .then(res => res.text())
    .then(res => {
        const main = document.querySelector('.main');
        main.innerHTML = res;
    })
    .then(res => ld.loadModules(accountModules))
    .then(res => changeLanguage())
    .then(res => toTop())
    .then(res => loader.loaderOff())
    .catch(err => console.log(err));
