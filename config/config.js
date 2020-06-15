class Config {
    constructor(){
        this._config = {};
    }

    loadConfig = ()=> {
         fetch('./json/config.json')
            .then(res => res.json())
            .then(res => this._config = res)
            .then(res => ld.loadParts())
            .then(res => ld.changePage())
            .catch(err => console.log(err))
    };
}

const config = new Config();
config.loadConfig();
