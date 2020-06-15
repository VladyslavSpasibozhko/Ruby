window.forEventMod =['scoreboard', 'classification-inplay'];

forEventMod.map(it => {
	if (it === 'scoreboard'){
		ld.loadSingleModule('./modules', 'scoreboard' );
	} else {
		ld.loadSingleModule('./modules', `${it}`,`#inplay-${it}` );
	}
});

window.Event = class Event {
	constructor() {
		this.html = '';
		this.scoreboardNode;
		this.tableNode;
		this.classificationNode;
		this.inplayData;
		this.stakeId = [];
	}

	transformDate =(obj)=> {
		let currentEV = '';
		let currentTG = '';
		let currentES = '';
		let currentSC = '';
		let currentMA = '';
		let currentCO = '';
		let currentSG = '';
		let currentST = '';

		obj.map(item => {
			if (item.type === 'EV') {
				this[item.type] = item;
				currentEV = item;
				currentEV.MA = [];
			}

			// commands
			if (item.type === 'TG') {
				currentEV.TG = item;
				currentTG = item;
				currentTG.TE = [];
			}

			if (item.type === 'TE') {
				currentTG.TE.push(item);
			}

			//statistics

			if (item.type === 'ES') {
				currentEV.ES = item;
				currentES = item;
				currentES.SC = [];
			}

			if (item.type === 'SC') {
				currentES.SC.push(item)
				currentSC = item;
				currentSC.SL = [];
			}

			if (item.type === 'SL') {
				currentSC.SL.push(item);
			}

			//statistic2

			if (item.type === 'SG') {
				currentEV.SG = item;
				currentSG = item;
				currentSG.ST = []
			}
			if (item.type === 'ST') {
				currentSG.ST.push(item)
			}

			//markets

			if (item.type === 'MA') {
				currentEV.MA.push(item);
				currentMA = item;
				currentMA.CO = [];
			}
			if (item.type === 'CO') {
				currentMA.CO.push(item);
				currentCO = item;
				currentCO.PA = [];

			}
			if (item.type === 'PA') {
				currentCO.PA.push(item)
			}

		});
		this.drawData()
	};

	defaultTemplate =()=> {
		this.scoreboardNode.innerHTML = `<div class="font white event-defaultMes"> 
				You don't chose any sport event, please <br>
 				back to 'Overview' page and choose any likely event 
 				</div>`
	}

	forEventCategoryTemplate =()=> {
		const div = document.createElement('div');
		div.className = 'maTable__row';
		div.id = 'maTable__row_main_top';
		div.innerHTML = `<div class="maTable__cell">
							<div class="maTable__category closed">
								<p class="icon fa fa-usd"></p>
								<p class="text font">MAIN BETS</p>
							</div>
						</div>`
		div.addEventListener('click', this.hideMaTable);
		return div
	}

	forEventSubCategoryTemplate =(data)=> {
		const div = document.createElement('div');
		div.className = 'maTable__cell full';
		div.innerHTML = `
				<div class="flex-container align-middle maInfo">
					<span class="star maInfo__icon"></span>
					<span class="font white ellipsis maInfo__text">${data.NA}</span>
					<hr class="maInfo__separate">
					<a class="maInfo__inform"></a>
				</div>`;
		div.addEventListener('click', this.hideSubCategory);
		div.querySelector('.star').addEventListener('click', this.markAsImportant)
		return div
	}

	forEventDataTemplate =(data, cl)=> {
		const {NA, SU, IT, OD, ID, FI} = data;
		const SU2 = (SU == 1) ? 'disabled' : '';

		const div = document.createElement('div');
		div.className = `maTable__cell ${cl}`;
		div.innerHTML = `
				<button class="coef_item button coefficient ${SU2} ${this.markActiveBtn(ID)}" 
						data-it="${IT}" 
						data-id="${ID}"
						data-fi="${FI}"
						data-od="${OD}">
					<p class="font ellipsis"> ${NA ? NA : ''}</p>
					${SU == 1 ? `<span class="fa fa-lock lock"></span>` : `<p class="font down blick">${transformBet(OD)}</p>`}
				</button>		
		`

		div.querySelector('.coef_item').addEventListener('click', this.buttonData);
		return div
	}

	forEventDataColumnTemplate =(data, PY, SY) => {
		const sy = SY == 9 ? true : false;

		const {NA, SU, IT, OD, ID, FI} = data;
		const SU2 = (SU == 1) ? 'disabled' : '';

		const div = document.createElement('div');
		div.className = `maTable__cell`;
		div.innerHTML = `
				<button class="coef_item button ${sy ? 'coefficient-title' : 'coefficient'} ${SU2} ${this.markActiveBtn(ID)}" 
						data-it="${IT}"
						data-od="${OD}"
						data-id="${ID}"
						data-fi="${FI}">
					<p class="font ellipsis"> ${NA ? NA : ''}</p>
					${sy ? '<p class="font"></p>' : (SU == 1 ? `<span class="fa fa-lock lock"></span>` : `<p class="font down blick">${transformBet(OD)}</p>`)}	
				</button>`

		div.querySelector('.coef_item').addEventListener('click', this.buttonData);
		return div
	};

	titleTemplateForBets =(CO)=> {
		const div = document.createElement('div');
		div.className = 'bets_title';
		div.innerHTML = `
			${CO.NA && !CO.NA.includes('Count') ? CO.NA : ''}
		`
		return div
	};

	loadScoreboard =(ev, te)=> {
		this.scoreboardNode.appendChild(scoreboard.drawData(ev, te));
		scoreboard.checkTime(ev)
	};

	loadClassification =()=> {
		classificationInplay.init(this.inplayData);
	};

	loadData = async ()=> {
		loader.loaderOn();
		try {
			const inplayData = await this.inplayReq();
			const eventData = await this.eventReq(inplayData);
			eventData ? this.transformDate(eventData) : window.location = './#/inplay/event';
			loader.loaderOff();
		} catch (e) {
			this.defaultTemplate();
			loader.loaderOff();
			console.log(e)
		}
	};

	inplayReq = async ()=> {
		const inplayReq = await fetch('http://bestline.bet/api/?key=inplay');
		const inplayReqJson = await inplayReq.json();
		this.inplayData = inplayReqJson;
		return inplayReqJson
	};

	eventReq = async (data)=> {
		const id = this.getHash();
		const currentSport = localStorage.getItem('sportId') || '1';

		const eventId = id || this.getCurrentSport(data, currentSport);

		const eventReq = await fetch(`http://bestline.bet/api/?key=${eventId}`);
		const eventReqJson = await eventReq.json();
		return eventReqJson
	};

	renderMarketCO =(mark, node)=> {
		const {CO} = mark;
		if (CO.length === 1) {
			const cl = Number(CO[0].CN) === 2 ? 'half' : '';

			CO[0].PA.map(pa => {
				node.appendChild(this.forEventDataTemplate(pa, cl))
			});
		}

		if (CO.length > 1) {
			CO.map(co => {
				const {PY, SY} = co;
				const div = document.createElement('div');
				div.className = `bets_column ${SY == 9 ? 'title' : '' }`;

				div.appendChild(this.titleTemplateForBets(co));

				co.PA.map(pa => {
					div.appendChild(this.forEventDataColumnTemplate(pa, PY, SY))
				});
				node.appendChild(div)
			});
		}
	};

	drawData =()=> {
		const {EV} = this;
		if (EV) {
			this.loadScoreboard(EV);
			this.loadClassification();
			this.tableNode.appendChild(this.forEventCategoryTemplate());

			EV.MA.map(mark => {
				const {IT, OR} = mark;

				const SU = (mark.SU == 1) ? 'disabled' : '';
				const div = document.createElement('div');
				div.className = `maTable__row ${SU}`;
				div.setAttribute('data-it', IT);
				div.setAttribute('data-or', OR);

				div.appendChild(this.forEventSubCategoryTemplate(mark));
				this.renderMarketCO(mark, div);

				this.tableNode.appendChild(div)
			});
		} else {
			this.defaultTemplate()
		}
	};

	init =()=> {
		this.scoreboardNode = document.getElementById('event-forScoreboard');
		this.tableNode = document.getElementById('event-forTable');
		this.classificationNode = document.getElementById('classification_inplay_container');
		this.activeCoefBtn();
		this.loadData();
	};

	/////

	getHash =()=> {
		const link = window.location.hash;
		const id = link.split('/')[3];
		return id
	};

	getCurrentSport =(res, id)=> {
		let currentCL;
		let EVid;
		res.map(item => {
			if (item.type === 'CL'){
				currentCL = item.ID
			}
			if (currentCL === id){
				if (item.type === 'EV'){
					if (!EVid){
						EVid = item.ID
					}
				}
			}
		});

		window.history.pushState('', '', `#/inplay/event/${EVid}`)
		return EVid
	};

	hideMaTable =()=> {
		const tablet_field = document.getElementById('event-forTable');
		tablet_field.classList.toggle('hide_maTablet')
	}

	hideSubCategory =(e)=> {
		const itemContainer = e.target.closest('.maTable__row ');
		itemContainer.classList.toggle('hide_maTablet')
	}

	markAsImportant =(e)=> {
		e.stopPropagation()
		const itemContainer = e.target.closest('.maTable__row');
		itemContainer.classList.toggle('betToTop');
		e.target.classList.toggle('star_active');
	}

	activeCoefBtn =()=> {
		const data = JSON.parse(sessionStorage.getItem('bt'));
		if (data && data.ns){
			data.ns.split('||').map(str => {
				if (str){
					const word = str.match(/(\bfp=)(\d*)/g);
					this.stakeId.push(word[0].replace('fp=',''))
				}
			});
		} else {
			this.stakeId = [];
		}
	};

	markActiveBtn =(id)=> {
		return this.stakeId.map(fp => fp === id ? 'on' : '').join('')
	};

	buttonData =(e)=> {
		const parent = e.target.closest('.coef_item');
		qbC.buttonData(parent, e)
	};
};

window.sportEvent = new Event();
sportEvent.init();





