class LoadModules {
    constructor(){
        this.pagesName = ['inplay', 'sports', 'account', 'my-bets', 'search'];
        this.currentUrl;
    }

    getUrl =()=> {
        const page = window.location.hash.split('/')[1];
        const name = this.pagesName.find(item => page === item);

        name ? this.currentUrl = page : window.location = './#/sports';
    };

    changePage =()=> {
        this.getUrl();
        this.loadPages();
    };

    loadParts =()=> {
        const parts = ['header', 'footer'];
        parts.map(item => this.loadSingleModule('pages',item))
    };

    loadPages =()=> {
        this.pagesName.map(pg => {
            if (pg === this.currentUrl) {
                const path = `./pages/${this.currentUrl}/${this.currentUrl}.js`;
                this.appendScript(path)
            }
        })
    };

    loadModules = arr =>  {
        arr.map(el => {
            const pathHTML = `./modules/${el.name}/${el.name}.html`;
            const pathJS = `./modules/${el.name}/${el.name}.js`;
            fetch(`${pathHTML}`)
                .then(res => res.text())
                .then(res => el.wrap ? this.loadHTML(el.wrap, res) : null)
                .then(res => this.appendScript(pathJS))
                .catch(err => console.log(err))
        });
    };

    loadSingleModule =(part, name, wrap)=> {
        const path = `${part}/${name}/${name}.html`;
        const js = `${part}/${name}/${name}.js`;

        if (wrap){
            return fetch(`${path}`)
                .then(res => res.text())
                .then(res => ld.loadHTML(wrap, res))
                .then(res => this.appendScript(js))
                .catch(err => console.log(err))
        } else {
            return new Promise((res, rej) => this.appendScript(js))

        }
    };

    appendScript =(path)=> {
        const script = document.createElement('script');
        script.src = path;
        script.async = false;
        document.head.appendChild(script);
    };

    loadHTML =(wrap, res)=> {
        const wrapper = document.querySelector(`${wrap}`);
        wrapper.innerHTML = res
    };

    init =()=> {
        window.addEventListener('hashchange', this.changePage);
    };

}

const ld = new LoadModules();
ld.init();




