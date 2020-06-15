const dangerBets = ['43', 'C11RU', '45', '10217'];

function formStrToObj(str){
    str = str.slice(5, str.length-5);
    const obj = {};

    str.split('&').map(snt => {
        const key =  snt.slice(0, 2);
        const val = snt.includes('bt') ?  '1' : snt.slice(3)
        obj[key]=val
    });
    sessionStorage.setItem('bt', JSON.stringify(obj))
};

function encodeURL(pd){
    const url = encodeURIComponent(pd);
    return url
};

//Work with bet system
function transformBet(bet){
    const { ODDS_TYPE:ot } = config._config.CUSTOMER_CONFIG;

    if (bet){
        switch (ot) {
            case '1':
                return transformBetAsDecimal(bet);
            case '2':
                return transformBetAsFraction(bet);
            case '3':
                return transformBetAsAmerican(bet);
            default:
                return transformBetAsDecimal(bet);
        }
    }
    return ''
};
//.
function transformBetAsFraction(bet) {
    if (bet.includes('/')){
        const btArr = bet.split('/');
        const res = ((btArr[0]/btArr[1])+1).toFixed(2)
        return res
    }

    if (bet.includes('+') || bet.includes('-')){
        return  bet.includes('+') ? positiveAmericanBets(bet) : negativeAmericanBets(bet);
    }

    return bet
}
// --/--
function transformBetAsDecimal(bet) {
    if (bet.includes('.')){
        return decimalToFraction(bet)
    }
    
    if (bet.includes('+') || bet.includes('-')){
       const fractionBet = bet.includes('+') ? positiveAmericanBets(bet) : negativeAmericanBets(bet);
       return decimalToFraction(fractionBet)
    }

    return bet
}
//+-
function transformBetAsAmerican(bet){
    if (bet.includes('/')){
        const fractionBet = transformBetAsFraction(bet);
        return fromFractionToAmerican(fractionBet)
    }

    if (bet.includes('.')){
        return fromFractionToAmerican(bet)
    }

    return bet
}

function fromFractionToAmerican(bet) {
    if (Number(bet) >= 2){
        return `+${((Number(bet) - 1)*100).toFixed(0)}`
    } else {
        return `-${((100)/(Number(bet) - 1)).toFixed(0)}`
    }
}

function positiveAmericanBets(bet) {
    const newStr = bet.replace('+', '');
    return ((Number(newStr)/100)+1).toFixed(2)
}

function negativeAmericanBets(bet) {
    const newStr = bet.replace('-', '');
    return ((100/Number(newStr))+1).toFixed(2)
}

function gcd(a, b) {
    return (b) ? gcd(b, a % b) : a;
};

function decimalToFraction (_decimal) {
    let top = _decimal.toString().replace(/\d+[.]/, '');
    const bottom = Math.pow(10, top.length);

    if (_decimal > 1) {
        top	= +top + Math.floor(_decimal) * bottom;
    }

    const x = gcd(top, bottom);
    return `${(top / x) + '/' + (bottom / x)}`
};

///////
// transform JSON
function transformInplayData(data){
    const newData = {};
    let currentCL = '';
    let currentCT = '';
    let currentEV = '';
    let currentMA = '';
    let currentPA = '';

    data.forEach(item => {
        if (item.type === 'CL') {
            newData[item.NA] = item;
            currentCL = item;
            currentCL.ligues = [];

            currentCT = '';
            currentEV = '';
            currentMA = '';
            currentPA = '';
        }

        if (item.type === 'CT') {
            currentCL.ligues.push(item);
            currentCT = item;
            currentCT.events = [];
        }

        if (item.type === 'EV') {
            if (currentCT){
                currentCT.events.push(item);
                currentEV = item;
                currentEV.markets = [];
            } else {
                currentCT = {};
                currentCT.events = [];
                currentEV = item;
                currentEV.markets = [];
                currentCT.events.push(item);

                currentCL.ligues.push(currentCT)
            }
        }

        if (item.type === 'MA') {
            currentEV.markets.push(item);
            currentMA = item;
            currentMA.coef = [];
        }

        if (item.type === 'PA') {
            currentMA.coef.push(item);
            currentPA = item;
        }
    });

    return newData
};
//////

/////
function getCommands (str){
    const commands = str.split(' ');

    const first = [];
    const second = [];

    let current = first;
    commands.map(str => {
        if (str === 'v' || str === 'vs' || str === '@') return current = second;
        current.push(str)
    });

    return [first.join(' '), second.join(' ')]
};

function timer (etu, etm, ets){
    etu = etu.toString();
    etm = etm.toString();
    ets = ets.toString();
    const years = etu.substring(0, 4);
    const month = etu.substring(4, 6);
    const day = etu.substring(6, 8);
    const hours = etu.substring(8, 10);
    const minute = etu.substring(10, 12);
    const second = etu.substring(12, 14);
    const date = years + '-' + month + '-' + day + ' ' + hours + ':' + minute + ':' + second;
    const ts = new Date(date).getTime() / 1000;
    const tn = new Date().getTime() / 1000;
    const offset = new Date().getTimezoneOffset();
    const dt = Math.floor(tn - ts + etm * 60 + ets - Math.abs(offset) * 60);
    let min = Math.floor(dt / 60);
    let sec = dt - min * 60;
    if (min < 10) min = '0' + min;
    if (sec < 10) sec = '0' + sec;
    const timer = min + ':' + sec;
    return timer;
};

function timerTT (etm, ets){
    if (etm < 10) etm = '0' + etm;
    if (ets < 10) ets = '0' + ets;
    const timer = etm + ':' + ets;
    return timer;
};

function getSetScore (score){
    const sc = score.split(',');

    if (sc[0].includes('-') && sc.length === 1){
        return [sc[0].split('-')];
    }
    let res = sc.every(sc=> sc.includes('-'));

    if (res && sc.length >= 2){
        return sc.map(e => e.split('-'))
    }

    return [sc]
};

/////

function withAllSeparators(stake) {
    stake = stake.toString();
    const withDec = addDecSeparatorToStake(stake);
    const withGroupSwp = addGroupSeparatorToStake(withDec);

    return withGroupSwp
}

function addGroupSeparatorToStake(stake) {
    const { CURRENCY_GROUP_SEPARATOR:cgs } = config._config.CUSTOMER_CONFIG;

    return  stake.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${cgs}`);
}

function addDecSeparatorToStake(stake) {
    const { CURRENCY_DECIMAL_SEPARATOR:cds} = config._config.CUSTOMER_CONFIG;
    const newStake = cleanInputValue(stake);

    const fixed = Number(newStake).toFixed(2);
    const addDecSeparator = fixed.replace('.', cds);

    return addDecSeparator
}

function checkValue(value) {
    const regWord = /[a-zA-Z]/g;
    const isWord = value.search(regWord);

    return isWord >= 0 ? true : false;
}

function removeWordsFromInputValue(value) {
    const regWord = /[a-zA-Zа-яА-Я]/g;
    const newValue = value.replace(regWord, '');

    return newValue
}

function cleanInputValue(value) {
    const { CURRENCY_GROUP_SEPARATOR:cgs} = config._config.CUSTOMER_CONFIG;
    const reg = new RegExp(cgs, 'g');
    const cleanValue = value.replace(reg,'');

    const checkedValue = checkValue(cleanValue) ? removeWordsFromInputValue(cleanValue) : cleanValue;
    return checkedValue.length > 8 ? checkedValue.substr(0, 8) : checkedValue;
}

function transformDay(str){
    if (str){
        const year = str.substring(0,4);
        const month = str.substring(4,6);
        const day = str.substring(6,8);
        let time = str.substring(8,12);
        const ls2lt = time.substring(0,2);
        time = time.replace(ls2lt, `${ls2lt}:`);



        /* const date = `${time} ${month}/${day}`;*/
        const date = `${time}`;
        const dt = new Date(year, +month-1, day).getTime();

        return [date, dt]
    } else {
        return ''
    }
};

function transformCMN(str){
    const regExp = /#(\w+|\d+|\W+|\s)/g;
    const substr = str.match(regExp);

    let newStr = str;
    substr.forEach(el => newStr = newStr.replace(el, ''));

    return newStr.split(',')
};

function checkMG(obj){
    const { PD, ID } = obj;
    if (PD){
        const str = `#G${ID}`;
        if (PD.includes(str)){
            return obj
        } else {
            return null
        }
    } else {
        return obj
    }
};

function checkDangerId(id){
    return dangerBets.some(ID => ID === id)
};

function toTop(){
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
};

class Progress {
    constructor(){
        this.width = 10;
        this.intervalId;
    }

     checkProgressWidth =()=> {
        this.width >= 80 ? this.clearInterProgress() : null
    };

     progressLoader =()=> {
        this.intervalId = setInterval(() => {
            this.width += 5;
            this.increaseProgresWidth(this.width);
            this.checkProgressWidth()
        }, 100 )
    };

     increaseProgresWidth =(width)=> {
        this.progressInner.style.width = `${width}%`
    };

     hideProgressLoader =()=> {
        this.progressOuter.classList.add('hide');
        this.progressOuter.classList.remove('show');
    };

     showProgressLoader =()=> {
        this.progressOuter.classList.remove('hide');
        this.progressOuter.classList.add('show');
    };

     clearInterProgress =()=> {
        clearInterval(this.intervalId)
    };

     initLoader =()=> {
        this.progressOuter = document.querySelector('.progress-bar-outer');
        this.progressInner = document.querySelector('.progress-bar-inner');
    };

     progressStart =()=> {
        this.showProgressLoader();
        this.progressLoader();
    };

     progressEnd =()=> {
        this.width = 92;
        this.clearInterProgress();
        this.progressInner.style.width = '';
        this.hideProgressLoader();
    };
}

class LoaderType extends Progress {
    constructor(){
        super();
        this.firstUserEnter = true;
    }

    showMainLoader =()=> {
        const loader = document.querySelector('.loader');
        loader.style.display = 'flex';
    };

    hideMainLoader =()=> {
        const loader = document.querySelector('.loader');
        loader.style.display = 'none';
    };

    disableMainLoader =()=> {
        this.firstUserEnter ? this.firstUserEnter = false : null
    };

    loaderOn =()=> {
        this.initLoader()
        if (this.firstUserEnter){
            this.showMainLoader();
            this.disableMainLoader()
        } else {
            this.progressStart()
        }
    };

    loaderOff =()=> {
        this.hideMainLoader();
        this.progressEnd();
    };
}

const loader = new LoaderType()