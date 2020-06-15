window.QbCupon = class QbCupon {
    constructor(y, x, button){
        this.x = x;
        this.y = y;
        this.button = button;
        this.div = null;
    }

    render =(x, y)=> {
        const div = document.createElement('div');
        div.className = 'qb-Cupon'
        div.style.top = `${x}px`;
        div.style.left = `${y}px`;
        div.innerHTML = `
            <div class="qb-QuickBetMessageHeader hide ">
                <div class="qb-QuickBetMessageHeader_Message "></div>
                <div class="qb-QuickBetMessageHeader_Close "></div>
            </div>
            <div class="qb-QuickBetSelection ">
                <div class="qb-QuickBetSelection_Close fa fa-times "></div>
                <div class="qb-QuickBetSelection_Row ">
                    <div class="qb-QuickBetSelection_Selection ">Draw</div>
                    <div class="qb-QuickBetSelection_Handicap qb-QuickBetSelection_Handicap-empty "></div>
                    <div class="qb-QuickBetSelection_OddsAt ">@</div>
                    <div class="qb-QuickBetSelection_Oddscontainer ">
                        <div class="qb-QuickBetSelection_Odds ">9.00</div>
                    </div>
                </div>
                <div class="qb-QuickBetSelection_BetTypeContainer ">
                    <div class="qb-QuickBetSelection_BetType ">Fulltime Result</div>
                </div>
                <div class="qb-QuickBetSelection_Fixture ">AR Guelma Women v CF Akbou Women</div>
            </div>
            <div class="qb-QuickBetUseBetCredits hide ">
                <div class="qb-QuickBetUseBetCredits_CheckBoxWrapper ">
                    <div class="qb-QuickBetUseBetCredits_CheckBox "></div>
                </div>
                <div class="qb-QuickBetUseBetCredits_TextWrapper ">
                    <div class="qb-QuickBetUseBetCredits_Text "></div>
                </div>
            </div>
            <div class="qb-QuickBetStake ">
                <div class="qb-QuickBetStake_BumperLine ">
                    <div class="qb-QuickBetStake_StakeLine ">
                        <div class="qb-QuickBetStake_Button ">-</div>
                        <input type="text" class="qb-QuickBetStake_InputField ">
                        <div class="qb-QuickBetStake_Button ">+</div>
                    </div>
                    <div class="qb-QuickBetStake_Bumpers ">
                        <div class="qb-QuickBetStake_BumperButton ">+5</div>
                        <div class="qb-QuickBetStake_BumperButton ">+10</div>
                        <div class="qb-QuickBetStake_BumperButton ">+50</div>
                    </div>
                </div>
            </div>
            <div class="qb-QuickBetBetCreditsMessage hide ">
                <div class="qb-QuickBetBetCreditsMessage_Container ">
                    <div class="qb-QuickBetBetCreditsMessage_CreditMessage "></div>
                </div>
                <div class="qb-QuickBetBetCreditsMessage_ReturnsMessage "></div>
            </div>
            <div class="qb-QuickBetFooter ">
                <div class="qb-QuickBetFooter_Button ">
                    <div class="qb-QuickBetFooter_PlaceButtonContent ">
                        <div class="qb-QuickBetFooter_Stake ">$80.00</div>
                        <div class="qb-QuickBetFooter_PlaceText ">Place Bet</div>
                        <div class="qb-QuickBetFooter_ToReturnWrapper ">
                            <span class="qb-QuickBetFooter_ToReturnLabel ">To Return</span>
                            <span class="qb-QuickBetFooter_NetReturnLabel hide ">Net Return</span>
                            <span class="qb-QuickBetFooter_ToReturnAmount ">720.00</span>
                        </div>
                    </div>
                    <div class="qb-QuickBetFooter_AcceptButtonContent hide ">
                        <div class="qb-QuickBetFooter_AcceptText ">Accept &amp; Place Bet</div>
                    </div>
                    <div class="qb-QuickBetFooter_PlacingButtonContent hide ">
                        <div class="qb-QuickBetFooter_PlacingText ">Processing</div>
                    </div><!---->
                </div>
            </div>
        `
        div.querySelector('.qb-QuickBetSelection_Close').addEventListener('click', this.removeCupon)
        return div
    };

    saveDiv =(div)=> {
        document.body.appendChild(div);
        this.div = div;
        this.button.classList.add('on');
    };

    removeCupon =()=> {
        qbC.qbCupon = null;
        document.body.removeChild(this.div);
        this.button.classList.remove('on');
    };

    init =()=> {
        this.saveDiv(this.render(this.x, this.y));
    };
};

window.QbCuponMethod = class QbCuponMethod {
    constructor(){
        this.qbCupon = null;
    }

    buttonData =(btn, e)=> {
        const id = btn.dataset.id;

        const data = JSON.parse(sessionStorage.getItem('bt'));
        const qBStake =  JSON.parse(sessionStorage.getItem('qB'));

        if (qBStake) {
            const left = e.pageX;
            const top = e.pageY;
            this.createQbCupon(left, top, btn);
        } else {
            this.checkStake(data, btn, id)
        }
    };

    checkStake =(data, btn, id)=> {
        const checking = data.ns ? data.ns.includes(id) : false;
        checking ? this.removeStake(data, id) :  this.addStake(btn);
    };

    /*Add Stake To Betslip*/
    addStake =(btn)=> {
        const fi = btn.dataset.fi;
        const sprID = btn.dataset.sportId;
        const id = btn.dataset.id;
        const od = btn.dataset.od;

        this.addToStorage(fi, sprID, id, od);
        this.addReq()
    };

    addToStorage =(fi, sprID, id, od)=> {
        const reqStr = `pt=N#o=${od}#f=${fi}#fp=${id}#so=0#c=${sprID}#id=${fi}-${id}Y#|TP=BS${fi}-${id}#||`;
        const storDat = JSON.parse(sessionStorage.getItem('bt'));

        if(storDat){
            storDat.ns = storDat.ns ? storDat.ns += reqStr : storDat.ns=reqStr;
            this.setSesStorage(storDat)
        }
    };

    addReq =()=> {
        betslip.betslipLoaderShow();
        fetch('http://bestline.bet/betslip/refreshslip', {
            method:"POST",
            body:sessionStorage.getItem('bt')
        })
        .then(res => res.text())
        .then(res => {
            betslip.container.innerHTML = res;
            formStrToObj(betslip.container.querySelector('script').innerText);
            betslip.betslipLoaderHide();
            betslip.checkUserPage();
            this.transformBetToOddType()
        })
        .then(res => {
            this.searchActiveButton();
            this.addCurrencySymbol();
            betslip.addListeners();
            betslip.addClassQuickBtn();
        })
        .catch(err => console.log('addBetsItem', console.log(err)))
    };

    /*Remove Stake*/
    removeStake =(data, id)=> {
        data.ns.split('||').map(el => {
            if (el.includes(id)){
                const nwd = data.ns.replace(`${el}||`, '');
                data.ns = nwd;
                this.setSesStorage(data)
            }
        });
        this.deleteReq();
    };

    deleteReq =()=> {
        betslip.betslipLoaderShow();
        fetch('https://www.bestline.bet/betslip/?refreshslip',{
            method:"POST",
            body:sessionStorage.getItem('bt')
        })
            .then(res => res.text())
            .then(res => {
                betslip.container.innerHTML = res;
                const str = betslip.container.querySelector('script').innerText;

                formStrToObj(str);
                betslip.checkUserPage();
                betslip.betslipLoaderHide()
                this.transformBetToOddType()
            })
            .then(res => {
                this.searchActiveButton();
                betslip.addListeners();
                betslip.addClassQuickBtn();
            })
            .catch(err => console.log('delete req', err))

    };

    deleteAllItems =()=> {
        betslip.betslipLoaderShow()
        return fetch('https://www.bestline.bet/betslip/?refreshslip',{
            method:"POST",
            body:{}
        })
            .then(res => res.text())
            .then(res => {
                betslip.container.innerHTML = res;
                const str = betslip.container.querySelector('script').innerText;
                formStrToObj(str);
                betslip.checkUserPage();
                betslip.betslipLoaderHide()
            })
            .then(res => {
                this.unactiveAllActiveBtn();
                betslip.addListeners();
                betslip.addClassQuickBtn();
                betslip.bsMessage();
            })
            .catch(err => console.log('Delete All Items Request',err))
    };

    /*Quick Bet Cupon*/
    createQbCupon =(left, top, btn)=> {
        if (this.qbCupon){
            this.qbCupon.removeCupon()
        }
        this.qbCupon = new QbCupon(left, top, btn);
        this.qbCupon.init();
    };

    /*Another Function*/

    transformBetToOddType =()=> {
        const { ODDS_TYPE:od } = config._config.CUSTOMER_CONFIG;
        betslip.container.querySelectorAll('.bs-Odds')
            .forEach(item => {
               const coef = item.innerText;
               item.innerText = transformBet(coef)
            });
    };

    setSesStorage =(data)=> {
        sessionStorage.setItem('bt', JSON.stringify(data));
    };

    searchActiveButton =()=> {
        const data = JSON.parse(sessionStorage.getItem('bt'));
        if (data && data.ns) {
            const fpArr = data.ns.match(/fp=\d*/g);
            const btn = document.querySelectorAll('.coef_item');

            if (btn && fpArr) {
                btn.forEach(el => {
                    el.classList.remove('on')
                    fpArr.map(id => {
                        id = id.replace('fp=', '')
                        if (el.dataset.id === id) {
                            el.classList.add('on')
                        }
                    });
                });
            }
        }else {
            this.unactiveAllActiveBtn()
        }
    };

    unactiveAllActiveBtn =()=> {
        const btn = document.querySelectorAll('.coef_item');
        btn.forEach(el => {
            el.classList.remove('on')
        });
    };

    addCurrencySymbol =()=> {
        betslip.container.querySelectorAll('.bs-StakeToReturn_Value')
            .forEach(item => item.innerHTML += ` ${betslip.currencySymbolTemplate()}`)
    };
};

window.qbC = new QbCuponMethod();

