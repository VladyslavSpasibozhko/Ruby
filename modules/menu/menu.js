window.MainMenu = class MainMenu {
    constructor(){
        this.container;
        this.links = [
            {
                href: './#/sports/',
                lang:'sports_lnk',
                text:'Sports',
                name:'sports',
                view: true
            },
            {
                href: './#/inplay/overview',
                lang:'inplay_lnk',
                text:'Inplay',
                name:'inplay',
                view: true
            },
            {
                href: './#/my-bets/',
                lang:'my_bets',
                text:'My Bets',
                name:'my-bets',
                view: config._config.CUSTOMER_CONFIG.LOGGED_IN
            },
        ];
        this.linksNodes = [];
    }

    createLink =(data)=> {
        const { href, lang, text, view, name } = data;
        if (!view) return;

        const active = name === this.currentlink ? 'active' : '';
        const a = document.createElement('a');
        a.className = `font menu-item ${active}`;
        a.setAttribute('href', href);
        a.setAttribute('data-lang', lang);
        a.setAttribute('data-name', name);
        a.innerText = text;

        this.linksNodes.push(a);
        this.container.append(a);

    };

    appendLink =()=> {
        this.links.forEach(a => this.createLink(a))
    };

    init =()=> {
        this.container = document.getElementById('mainHeaderMenu');
        this.getCurrentLink();
        this.appendLink();
        window.addEventListener('hashchange', this.activeLink)
    };

    ////

    activeLink =()=> {
        this.getCurrentLink();
        this.linksNodes.forEach(a => {
            a.dataset.name === this.currentlink
                ? a.classList.add('active')
                : a.classList.remove('active');
        });
    };

    getCurrentLink =()=> {
        this.currentlink = window.location.hash.split('/')[1];
    };
};

window.mainMenu = new MainMenu();
mainMenu.init();