window.InlpayChanger = class InplayChanger {
    constructor(){
        this.modules = ['overview', 'event',  'calendar' ]
    }

    init =()=> {
        const arr = window.location.hash.split('/');
        const hash = arr[2];

        if (hash !== '' && hash !== undefined) {
            this.modules.map(ph => {
                if (hash === ph) {
                    ld.loadSingleModule('./modules', ph, '#contentCenter');
                }
            });
        }
    }
};

window.inlpayChanger = new InlpayChanger();
inlpayChanger.init();


