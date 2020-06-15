async function loadLanguage(){
    const storLang = sessionStorage.getItem('lang') || 'English';
    const scr = document.createElement('script');
    const dic = {
        'English': 'eng-l.js',
        'Russian': 'rus-l.js',
    };
    scr.src = `./lang/${dic[storLang]}`;
    scr.onload =()=> {
        translate()
    };
    scr.onerror =(err)=> {
        console.log(err)
    };
    document.head.appendChild(scr);
}

function translate(){
    const translateNode = document.querySelectorAll('[data-lang]');
    if (translateNode){
        translateNode.forEach(el => {
            const key = el.dataset.lang;
            if (el.hasAttribute('placeholder')){
                el.placeholder = window.dict[key]
            } else {
                el.innerText = window.dict[key]
            }
        });
    }

}

function changeLanguage() {
    loadLanguage()
}


