window.inplayModules = [
    {
        name:'search',
        wrap: '#inplay-search'
    },
    {
        name:'qb-cupon',
    },
    {
        name:'right-column',
        wrap: '#inplay-right-column'
    },
    {
        name:'inplay-changer',
    },
];

fetch('./pagesHTML/inplay.html')
    .then(res => res.text())
    .then(res => {
       const main = document.querySelector('.main');
       main.innerHTML = res;
    })
    .then(res => ld.loadModules(inplayModules))
    .then(res => toTop())
    .catch(err => console.log(err));

