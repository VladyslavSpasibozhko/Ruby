window.sportsModules = [
    {
        name:'right-column',
        wrap: '#sports-right-column'
    },
    {
        name:'search',
        wrap: '#sports-search'
    },
    {
        name:'hot-news',
        wrap: '#sports-hot-news'
    },
    {
        name:'favourite',
        wrap: '#sports-favourite'
    },
    {
        name:'classification',
        wrap: '#sports-classification'
    },
    {
        name:'qb-cupon'
    }
];

function sportsCenterContent(){
    const hash = window.location.hash;
    const id = hash.split('/');
    const defaultContent = [
            {
                name:'live-now',
                wrap: '#sports-live-now'
            },
            {
                name:'sport-news',
                wrap: '#sports-sport-news'
            },
            {
                name:'top-bets',
                wrap: '#sports-top-bets'
            },
            {
                name:'highlights-bets',
                wrap: '#sports-highlights-bets'
            }
        ];

    const prematchList = [
        {
            name:'prematch-list',
            wrap: '#sports-prematch-list'
        }
    ];

    const prematchTable = [
        {
            name:'prematch-table',
            wrap: '#sports-prematch-table'
        }
    ];

    if (id[2] && id[2] !== 'table'){
        sportsModules.push(...prematchList)
    } else if (id[2] && id[2] === 'table'){
        sportsModules.push(...prematchTable)
    } else {
        sportsModules.push(...defaultContent)
    }
};

sportsCenterContent();

fetch('./pagesHTML/sports.html')
    .then(res => res.text())
    .then(res => {
        const main = document.querySelector('.main');
        main.innerHTML = res;
    })
    .then(res => ld.loadModules(sportsModules))
    .then(res => changeLanguage())
    .then(res => toTop())
    .catch(err => console.log(err));