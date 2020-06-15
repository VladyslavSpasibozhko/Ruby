window.ClassificationInplay = class ClassificationInplay {
    constructor(){
        this.container;
        this.data = {};
        this.timersIds;
        this.favouriteEventsContainer;
    }

    headerButton =()=> {
        const div = document.createElement('div');
        div.className = 'classification_inplay_button flex-container align-justify';
        div.innerHTML = `
            <div class="button-left flex-container align-center">
                <button class="all">All</button>
                <button class="watch"></button>
            </div>
            <div class="button-right">
                <button class="arrows fa fa-angle-double-left"></button>
            </div>`
        return div
    };

    templateForRavourites =()=> {
        const div = document.createElement('div');
        div.className = 'classification_inplay_favourites';
        div.innerHTML = `
            <div class="classification_inplay_favourites_header flex-container align-justify">
                <div class="favourites_title">Favourites</div>
                <div class="favourites_icons flex-container align-justify align-center">
                    <div class="star-active"></div>
                    <div class="favourites_arrow fa fa-angle-down"></div>
                </div>
            </div>
            <div class="classification_inplay_favourites_for_events"></div>`

        this.favouriteEventsContainer = div.querySelector('.classification_inplay_favourites_for_events');
        this.showInFavourites();
        return div
    };

    competitionContainer =(data)=> {
        const { NA, ID, PC, IT, ligues } = data;
        const div = document.createElement('div');
        div.setAttribute('data-id', ID);
        div.setAttribute('data-it', IT);
        div.setAttribute('data-pc', PC);

        div.className = 'classification_inplay_competition';

        div.append(this.competitionTitle(NA));
        div.append(this.competitionEventContainer(ligues));

        return div
    };

    competitionTitle =(NA)=> {
        const div = document.createElement('div');
        div.className = 'classification_inplay_competition_title flex-container align-justify'; /*closed*/
        div.innerHTML = `
                <div class="classification_inplay_competition_title_name">${NA}</div>
                <div class="classification_inplay_competition_title_icons flex-container align-justify">
                    <div class="sport-icon">
                        <div class="sports-soccer"></div>
                    </div>
                    <div class="collapse"></div>
                </div>`

        div.addEventListener('click', (e) => this.closeBlock(e, 'classification_inplay_competition_title'));
        return div
    };

    competitionEventContainer =(ligues)=> {
        const div = document.createElement('div');
        div.className = 'classification_inplay_competition_event_container';

        ligues.forEach(item => {
            const { FF, ID, IT, events } = item;
            div.setAttribute('data-id', ID);
            div.setAttribute('data-ff', FF);
            div.setAttribute('data-it', IT);
            div.append(this.competitionLeagueTitle(item));
            div.append(this.eventsContainer(events, ID));
        });

        return div
    };

    competitionLeagueTitle =(data)=> {
        const { NA } = data;
        const div = document.createElement('div');

        if (!NA){
            return div
        }

        div.className = 'classification_inplay_competition_league flex-container align-justify closed';
        div.innerHTML = `
                <div class="classification_inplay_competition_league_title">${NA}</div>
                <div class="classification_inplay_competition_league_icons flex-container align-justify align-center-middle">
                    <div class="collapse"></div>
                </div>`;
        div.addEventListener('click', (e)=>this.closeBlock(e, 'classification_inplay_competition_league'));
        // div.querySelector('.star').addEventListener('click', this.toFavorite);
        return div
    };

    eventsContainer =(data, ID)=> {
        const div = document.createElement('div');
        div.className = 'classification_inplay_competition_league_events';

        data.forEach(item => {
            div.append(this.eventTemplate(item, ID, false));
        });

        return div
    };

    eventTemplate =(event, id, favour)=> {
        const { FI, ID, IT, SS, NA, DC, PI, XP } = event;
        const commands = getCommands(NA);
        const div = document.createElement('div');
        const active = this.getHashId() === ID ? 'active' : '';
        const storageCheck = this.checkInStorage(ID);

        div.setAttribute('data-id', ID);
        div.setAttribute('data-it', IT);
        div.setAttribute('data-fi', FI);

        div.className = `event_container_outer 
                         flex-container 
                         align-justify 
                         ${active} 
                         ${storageCheck && !favour ? 'hide' : ''}`;

        div.innerHTML = `
            <div class="star ${favour ? 'star_active' : ''} event-to_fav"></div>
            <div class="event_left">
                <div class="event_command">${commands[0]}</div>
                <div class="event_command">${commands[1]}</div>
            </div>
            <div class="event_right">
                ${PI ? this.eventSetScoreTemplate(SS, XP, id) : this.eventHalfScoreTemplate(SS)}
            </div>
        `;

        const timeNode = div.querySelector('.event_time');
        DC === '1' && !PI ? this.showMatchTime(timeNode, event) : null;

        div.addEventListener('click', this.openEvent);
        div.querySelector('.event-to_fav')
            .addEventListener('click', (e)=> this.toFavorite(e, event, id));
        return div
    };

    eventHalfScoreTemplate =(SS)=> {
       return `<div class="event_score">${SS}</div>
               <div class="event_time"></div>`
    };

    eventSetScoreTemplate =(SS, XP, id)=> {
       const score =  id === '91' || id === '92' || !id ? getSetScore(XP) : getSetScore(SS);

       return `
            <div class="event_set_score flex-container">
                ${score.map(item => {
                  return `<div class="event_set_score_column flex-container flex-dir-column"> 
                                <div class="set_score">${item[0] || 0}</div>
                                <div class="set_score">${item[1] || 0}</div>
                          </div>`
                }).join('')}
            </div>
            `
    };

    composeBlock =()=> {
        const c = this.container;
        c.append(this.headerButton());
        c.append(this.templateForRavourites());
        this.appendContent()
    };

    appendContent =()=> {
        const c = this.container;
        const d = this.data;

        Object.keys(d).forEach(key => {
            c.append(this.competitionContainer(d[key]));
        });

    };

    init =(data)=> {
       this.timersIds = [];
       this.container = document.getElementById('classification_inplay_container');
       const formatedData = transformInplayData(data);
       this.data = formatedData;
       this.composeBlock();
       console.log(this.data)

        window.addEventListener('hashchange',classificationInplay.clearAllIntervals);
    };

    ////////////

    closeBlock =(e, parent)=> {
        const elem = e.target.closest(`.${parent}`);
        elem.classList.toggle('closed');
    };

    toFavorite =(e, event)=> {
        e.stopPropagation();
        const check = this.checkInStorage(event.ID);
        check ? this.removeFromFavourite(event) : this.addToFavourite(event);

        this.showInFavourites();
        this.hideElement(event.ID);
    };

    addToFavourite =(event)=> {
        const storData = this.fromStorage();
        storData.push(event);
        this.toStorage(storData);

    };

    removeFromFavourite =(event)=> {
        const storData = this.fromStorage();
        const newData = storData.filter(item => event.ID !== item.ID ? item : null);
        this.toStorage(newData)
    };

    showInFavourites =()=> {
        const data = this.fromStorage();
        this.favouriteEventsContainer.innerHTML = '';
        data.forEach(item => this.favouriteEventsContainer.append(this.eventTemplate(item, null, true)))
    };

    toStorage =(data)=> {
        localStorage.setItem('favEvents', JSON.stringify(data))
    };

    fromStorage =()=> {
        return JSON.parse(localStorage.getItem('favEvents')) || [];
    };

    checkInStorage =(id)=> {
        const storData = this.fromStorage();
        const check = storData.some(item => item.ID === id);
        return check
    };

    hideElement =(id)=> {
        const containers = this.container.querySelectorAll('.classification_inplay_competition_event_container');
        containers.forEach(item => {
            const elem = item.querySelector(`.event_container_outer[data-id="${id}"]`);
            elem ? elem.classList.toggle('hide') : null
        })
    };

    openEvent =(e)=> {
        const elem = e.target.closest('.event_container_outer');
        const id = elem.dataset.id;

        window.location = `./#/inplay/event/${id}`
    };

    getHashId =()=> {
        return window.location.hash.split('/')[3]
    };

    showMatchTime =(node, data)=> {
        const { TU, TT, TS, TM } = data;
        const intervalId = setInterval(()=> {
            node.innerText = this.checkTime(TU, TT, TS, TM)
        }, 1000);

        this.timersIds.push(intervalId)
    };

    checkTime =(TU, TT, TS, TM)=> {
        if (TT === '1') {
            return timer(TU,TM,TS)
        }
        if (TT === '0'){
            return timerTT(TM, TS)
        }
    };

    clearAllIntervals =()=> {
        this.timersIds.forEach(id => clearInterval(id));
        window.removeEventListener('hashchange', this.clearAllIntervals)
    };
};

window.classificationInplay = new ClassificationInplay();