var MyBets = class MyBets {
    constructor(){
        this.container='';
        this.links=[];
        this.currentLink='';
        this.betsBody='';
    }

    templateForCashOut=()=>{
        this.betsBody.innerHTML=`
                  <div class="myBets-item">
                <div class="myBets-item-header desktop_font" >
                    <div class="myBets-item-header-left">
                        <span>$ 0.40</span>
                        <span>Single</span>
                    </div>
                    <div class="myBets-item-header-right">
                        <button class="edit-bet desktop_font_btn">Edit Bet</button>
                    </div>
                </div>
                <div class="myBets-item-body">
                    <div class="myBets-item-body-left">
                        <div class="item-betResult-desk">U23 Braga</div>
                        <div class="item-betKind desk">Fulltime Result</div>
                        <div class="item-betInfo desk">
                            <span class="item-betInfo-commands ">Braga U23 v Estoni U23</span>
                            <span class="item-betInfo-result">0-1</span>
                            <span class="item-betInfo-time">23:20</span>
                        </div>
                    </div>
                    <div class="myBets-item-body-right">
                        <span class="item-bet-koef-desk">1.71</span>
                    </div>
                </div>
                <div class="myBets-item-body-bottom">
                    <button class="sport-icon soccer"></button>
                </div>
                <div class="myBets-item-footer">
                    <div class="item-stake">To Stake <br> $0.40</div>
                    <div class="item-toReturn">To Return <br> $0.60</div>
                    <div class="item-CashOut">
                        <button class="CashOut-Btn desktop_font_btn">Cash Out $0.37</button>
                    </div>
                </div>
            </div>

              <div class="myBets-item">
                <div class="myBets-item-header desktop_font" >
                    <div class="myBets-item-header-left">
                        <span>$ 0.40</span>
                        <span>Single</span>
                    </div>
                    <div class="myBets-item-header-right">
                        <button class="edit-bet desktop_font_btn">Edit Bet</button>
                    </div>
                </div>
                <div class="myBets-item-body">
                    <div class="myBets-item-body-left">
                        <div class="item-betResult-desk">U23 Braga</div>
                        <div class="item-betKind desk">Fulltime Result</div>
                        <div class="item-betInfo desk">
                            <span class="item-betInfo-commands ">Braga U23 v Estoni U23</span>
                            <span class="item-betInfo-result">0-1</span>
                            <span class="item-betInfo-time">23:20</span>
                        </div>
                    </div>
                    <div class="myBets-item-body-right">
                        <span class="item-bet-koef-desk">1.71</span>
                    </div>
                </div>
                <div class="myBets-item-body-bottom">
                    <button class="sport-icon soccer"></button>
                </div>
                <div class="myBets-item-footer">
                    <div class="item-stake">To Stake <br> $0.40</div>
                    <div class="item-toReturn">To Return <br> $0.60</div>
                    <div class="item-CashOut">
                        <button class="CashOut-Btn desktop_font_btn">Cash Out $0.37</button>
                    </div>
                </div>
            </div>

              <div class="myBets-item">
                <div class="myBets-item-header desktop_font" >
                    <div class="myBets-item-header-left">
                        <span>$ 0.40</span>
                        <span>Single</span>
                    </div>
                    <div class="myBets-item-header-right">
                        <button class="edit-bet desktop_font_btn">Edit Bet</button>
                    </div>
                </div>
                <div class="myBets-item-body">
                    <div class="myBets-item-body-left">
                        <div class="item-betResult-desk">U23 Braga</div>
                        <div class="item-betKind desk">Fulltime Result</div>
                        <div class="item-betInfo desk">
                            <span class="item-betInfo-commands ">Braga U23 v Estoni U23</span>
                            <span class="item-betInfo-result">0-1</span>
                            <span class="item-betInfo-time">23:20</span>
                        </div>
                    </div>
                    <div class="myBets-item-body-right">
                        <span class="item-bet-koef-desk">1.71</span>
                    </div>
                </div>
                <div class="myBets-item-body-bottom">
                    <button class="sport-icon soccer"></button>
                </div>
                <div class="myBets-item-footer">
                    <div class="item-stake">To Stake <br> $0.40</div>
                    <div class="item-toReturn">To Return <br> $0.60</div>
                    <div class="item-CashOut">
                        <button class="CashOut-Btn desktop_font_btn">Cash Out $0.37</button>
                    </div>
                </div>
            </div>

        `
    };

    templateForLive=()=>{
        this.betsBody.innerHTML=`
            <div class="myBets-body-defaultItem">
                <p>You are no bets Live Now</p>
                <p>Any of your In-Play can be viewed here</p>
            </div>
        `
    };

    templateForUnsettled=()=>{
        this.betsBody.innerHTML=`
            <div class="myBets-body-defaultItem">
                <p>There are no unsettled bets</p>
                <p>Any of your Unsettled bets will appear here</p>
            </div>
        `
    };

    templateForSettled=()=>{
        this.betsBody.innerHTML=`
            <div class="myBets-body-defaultItem">
                <p>There are no settled bets</p>
                <p>Settled bets appear here for 24 hours</p>
            </div>
        `
    };

    templateForAll=()=>{
        this.betsBody.innerHTML=`
            <div class="myBets-body-defaultItem">
                <p>You have no bets</p>
                <p>Come back to Edit, Cash Out or find out your most recent bets</p>
            </div>
        `
    };

    loadData=()=>{
        let link = this.currentLink;
        if (link === 'cash-out' ) {
            this.templateForCashOut()
        } else if( link==='live'){
            this.templateForLive()
        } else if(link==='unsettled'){
            this.templateForUnsettled()
        } else if(link==='settled'){
            this.templateForSettled()
        } else {
            this.templateForAll()
        }
    };

    activeBtn=(btn)=>{
        this.links.map(el => el.classList.remove('active'));
        btn.classList.add('active');
    };

    setPage=(e)=>{
        this.currentLink=e.target.dataset.name;
        this.loadData();
        this.activeBtn(e.target);
    };

    eventForLinks=()=>{
        this.container.querySelectorAll('a')
            .forEach(el => {
                this.links.push(el);
                el.addEventListener('click', this.setPage);
            })
    };

    init=()=>{
        this.container=document.getElementById('my-bets-mainContainer');
        this.betsBody=document.getElementById('myBets-body');

        this.eventForLinks()
        this.templateForCashOut()
    }
};

var my_bets = new MyBets();
my_bets.init();