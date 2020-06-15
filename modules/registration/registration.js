class Registration {
    constructor() {
        this.step = 1;
        this.user = {
            Details: {
                Login: '',
                Password: '',
            },
            Information: {
                Country: '',
                Currency: '',
                FirstName: '',
                SecondName:'',
                Phone: {
                    Operator: '',
                    Number: '',
                },
                Email: '',
                BirthDate: {
                    Day: '',
                    Month: '',
                    Year: '',
                },
                Adress: '',
                Gender: '',
            },
            Confirmation: {
                InfoProcessed: false,
                LegalAge: false,
                LegalAgeCasino: false,
                Rules: false,
            }
        }
    }

    loadHeader=()=>{
        const formHeader = document.getElementById('sign-up-nav');
        formHeader.innerHTML = ` 
           <a class="sign-up-nav-item active" data-index="1">
            <p class="font title">1</p>
            <p class="font">ДЕТАЛИ ПОЛЬЗОВАТЕЛЯ</p>
          </a>
          <a class="sign-up-nav-item" data-index="2">
            <p class="font title">2</p>
            <p class="font">ПЕРСОНАЛЬНАЯ<br>ИНФОРМАЦИЯ</p>
          </a>
          <a class="sign-up-nav-item" data-index="3">
            <p class="font title">3</p>
            <p class="font">ПОДТВЕРЖДЕНИЕ</p>
          </a>
        `
    };

    userDetails=()=>{
        const formBody = document.getElementById('sign-up-body');
        formBody.innerHTML = `
        <div class="sign-up-body-item">
            <p class="sign-up-body-title font text-uppercase">
                <span>Имя пользователя:</span>
                <sup>⚹</sup>
            </p>
            <div class="wrapper a-center">
                <input type="text" class="field sign-up-body-field" name="Login" minlength="8" maxlength="16" required value=${this.user.Details.Login}>
            </div>
        </div>
        <div class="sign-up-body-item">
             <p class="sign-up-body-title font text-uppercase">
                 <span>Пароль:</span>
                 <sup>⚹</sup>
             </p>
            <div class="flex-container align-middle">
                <input type="password" class="field sign-up-body-field" name="Password" minlength="6" maxlength="15" required>
                <div class="password_check"><!-- low, medium, hight -->
                    <span class="password-check-item"></span>
                    <span class="password-check-item"></span>
                    <span class="password-check-item"></span>
                    <span class="password-check-item"></span>
                    <span class="password-check-item"></span>
                    <span class="password-check-item"></span>
                </div>
            </div>
        </div>
        <div class="sign-up-body-item">
            <p class="sign-up-body-title font text-uppercase">
                <span>Пожалуйста, подтвердите пароль:</span>
                <sup>⚹</sup>
            </p>
            <input type="password" class="field sign-up-body-field" name="ConfirmPassword" id="confPass" minlength="6"  maxlength="15" required>
        </div>
        <div class="block">
             <hr class="sign-up-body-separate">
             <p class="font text-center sign-up-body-inform">Все поля, отмеченные символом (<sup class="font">⚹</sup>), обязательны для заполнения</p>
        </div>`

        this.loadFooter();
        formBody.querySelectorAll('input').forEach(item => {
            item.addEventListener('input', this.detailsBlockInputValidity);
            item.value !== '' ? this.chooseAllElements(item) : null
        });

        this.checkPageValidity()
    };

    personalInformation=()=>{
        const formBody = document.getElementById('sign-up-body');
        const { Information } = this.user;
        formBody.innerHTML=`
        <div class="sign-up-body-item">
            <p class="sign-up-body-title font text-uppercase">
                <span>Страна:</span>
                <sup>⚹</sup>
            </p>
            <select class="select sign-up-body-select" name="Country" required >
                <option value="">Страна</option>
                <option value="1">Украина</option>
            </select>
        </div>
        <div class="sign-up-body-item ">
            <p class="sign-up-body-title font text-uppercase">
                <span>Предпочитаемая валюта:</span>
                <sup>⚹</sup>
            </p>
            <select class="select sign-up-body-select w25" name="Currency" required >
                <option value="">Валюта</option>
                <option value="1">UAH</option>
                <option value="2">USD</option>
                <option value="3">EURO</option>
            </select>
        </div>
        <div class="sign-up-body-item flex-container align-middle" id="nameBlock">
            <div class="w50 mr">
                <p class="sign-up-body-title font text-uppercase">
                    <span>Имя:</span>
                    <sup>⚹</sup>
                </p>
                <input type="text" 
                       class="field sign-up-body-field"     
                       name="FirstName"
                       required 
                       maxlength="15" 
                       minlength="2" 
                       value=${Information.FirstName}>
            </div>
            <div class="w50">
                <p class="sign-up-body-title font text-uppercase">
                    <span>Фамилия:</span>
                    <sup>⚹</sup>
                </p>
                 <input type="text" 
                        class="field sign-up-body-field" 
                        name="SecondName"
                        required 
                        maxlength="20" 
                        minlength="2" 
                        value=${Information.SecondName}>
                       
            </div>
        </div>
        <div class="sign-up-body-item">
            <p class="sign-up-body-title font text-uppercase">
                <span>Мобильный телефон:</span>
                <sup>⚹</sup>
            </p>
             <div class="flex-container align-items">
                 <div class="block mr">
                    <img src="./img/icon-country/Ukraine.ico" class="sign-up-body-country icon-country">
                    <select class="select sign-up-body-select country" name="Operator" required>
                        <option value=""></option>
                        <option value="1">+380</option>
                     </select>
                 </div>
                <input type="text" class="field sign-up-body-field" name="Number" minlength="9" maxlength="9" required value=${Information.Phone.Number} >
             </div>
        </div>
        <div class="sign-up-body-item">
            <p class="sign-up-body-title font text-uppercase">
                <span>Email:</span>
                <sup>⚹</sup>
            </p>
            <input type="email" class="field sign-up-body-field" name="Email"  required value=${Information.Email}>
        </div>
        <div class="sign-up-body-item ">
            <p class="sign-up-body-title font text-uppercase">
                <span>Дата рождения:</span>
                <sup>⚹</sup>
            </p>
        <div class="flex-container align-middle">
            <select class="select sign-up-body-select mr" required name="Day">
                <option value="">00</option>
                <option value="1">04</option>
            </select>
            <select class="select sign-up-body-select mr" required name="Month">
                <option value="">00</option>
                <option value="1">Январь</option>
            </select>
            <select class="select sign-up-body-select" required name="Year">
                <option value="">0000</option>
                <option value="1">1980</option>
            </select>
        </div>
    </div>
        <div class="sign-up-body-item">
            <p class="sign-up-body-title font text-uppercase">Адресc:</p>
                <input type="text" class="field sign-up-body-field" name="Adress" minlength="5" maxlength="40" required  value=${Information.Adress}>
         </div>
        <div class="sign-up-body-item">
            <p class="sign-up-body-title font text-uppercase mb">
                <span>Пол:</span>
                <sup>⚹</sup>
            </p>
            <div class="flex-container align-middle">
                <input type="radio" class="radio" id="man" name="Gender" value="man" required ${Information.Gender === 'man' ? 'checked' : null}>
                <label for="man" class="font sign-up-body-label">Мужской</label>
                <input type="radio" class="radio" id="woman" name="Gender" value="woman" required  ${Information.Gender === 'woman' ? 'checked' : null}>
                <label for="woman" class="font sign-up-body-label">Женский</label>
            </div>
        </div>
        <div class="block">
            <hr class="sign-up-body-separate">
                <p class="font text-center sign-up-body-inform ">Все поля, отмеченные символом (<sup class="font">⚹</sup>), обязательны для заполнения</p>
        </div>`

        this.footerForAnotherPage();

        formBody.querySelectorAll('input').forEach(item => {
            if(item.type !== 'radio'){
                item.value !== '' ? this.chooseAllElements(item) : null;
                item.addEventListener('input', this.personalBlockInputValidity);
            } else {
                item.checked ? this.chooseAllElements(item) : null;
                item.addEventListener('change', this.personalBlockInputValidity);
            }
        });

        formBody.querySelectorAll('select').forEach(item => {
            item.addEventListener('change', this.personalBlockSelectValidity);
            this.selectedOptions(item);
            item.value !== '' ? this.chooseAllElements(item) : null
        });

        this.checkPageValidity()
    };

    confirmation=()=>{
    const formBody = document.getElementById('sign-up-body');
    formBody.innerHTML = `
        <div class="flex-container align-middle mb">
            <input type="checkbox" class="checkbox sign-up-body-checkbox" required name="InfoProcessed" ${this.user.Confirmation.InfoProcessed ? 'checked' : null}>
        <p class="font sign-up-body-title">Согласен, что моя личная информация будет проверена и обработана в соответствии с действующим законодательством Грузии.</p>
        </div>
        <div class="flex-container align-middle mb">
            <input type="checkbox" class="checkbox sign-up-body-checkbox" required name="LegalAge" ${this.user.Confirmation.LegalAge ? 'checked' : null}>
            <p class="font sign-up-body-title">Подтверждаю, что мне больше 18 лет для того, чтобы играть в онлайн тотализаторе</p>
        </div>
        <div class="flex-container align-middle mb">
            <input type="checkbox" class="checkbox sign-up-body-checkbox" required name="LegalAgeCasino" ${this.user.Confirmation.LegalAgeCasino ? 'checked' : null}>
            <p class="font sign-up-body-title">Подтверждаю, что мне больше 21 года, для того чтобы играть в онлайн-казино.</p>
        </div>
        <div class="flex-container align-middle">
            <input type="checkbox" class="checkbox sign-up-body-checkbox" required name="Rules" ${this.user.Confirmation.Rules ? 'checked' : null}>
            <p class="font sign-up-body-title">Прочитал и принимаю <a href="#" class="text-underline sign-up-body-title">общие правила и условия сайта</a></p>
        </div>`

        this.footerForAnotherPage();
        formBody.querySelectorAll('input').forEach(item => {

           item.addEventListener('change', this.confirmationInputValidity)
        });

        this.checkConfirmationPageValidity();
    };

    footerForAnotherPage=()=>{
    const footer = document.getElementById('sign-up-footer');

    footer.innerHTML=`
        <button class="button primary sign-up-footer-button" id="prev">
            <p class="fa fa-angle-left mr"></p> 
                Назад
            </button>
        <button class="button primary sign-up-footer-button disabled" id="next" disabled>
                Далее 
             <p class="fa fa-angle-right"></p>
        </button>`
        footer.querySelector('#prev').addEventListener('click', this.toPrevStep);
        footer.querySelector('#next').addEventListener('click', this.toNextStep);
    };

    loadFooter=()=>{
        const footer = document.getElementById('sign-up-footer');
        footer.innerHTML = `
            <button class="button primary sign-up-footer-button disabled" 
                    id="nextBig" 
                    disabled>
                    Далее 
                         <p class="fa fa-angle-right"> </p>
                    </button>
        `
        footer.querySelector('button').addEventListener('click', this.toNextStep)
    };

    congratulationTemplate=()=>{
        const formHeader = document.getElementById('sign-up-nav');
        const formBody = document.getElementById('sign-up-body');
        const formFooter = document.getElementById('sign-up-footer');

        formHeader.innerHTML = `
            <p class="font title white" style="margin: 10px">Регистрация завершена</p>
        `
        formBody.innerHTML = `
            <div>
                <p class="font title white">Поздравляем!</p>
            </div> 
        `
        formFooter.innerHTML = `
            <button class="button primary sign-up-footer-button" id="closeForm"> Закрыть</button>
        `
        formFooter.querySelector('#closeForm').addEventListener('click', this.closeForm)

    };

    checkPageValidity=()=>{
        const formBody = document.getElementById('sign-up-body');
        const inputs = formBody.querySelectorAll('input');
        const selects = formBody.querySelectorAll('select');

        let elements = [...inputs, ...selects];

        let valid = elements.every(elem => {
            let correct = elem.closest('.sign-up-body-item').classList.contains('corrected');
            return elem.validity.valid && correct
        });

        this.disabledOrEnableBtn(valid);
    };

    loadCurrentPage=()=>{
        document.querySelectorAll('.sign-up-nav-item').forEach(item => {
            item.classList.remove('active');

            if (Number(item.dataset.index) === this.step){
                this.activeTitle(item);
            }

            this.step === 1 ? this.userDetails() : null;
            this.step === 2 ? this.personalInformation() : null;
            this.step === 3 ? this.confirmation() : null;
        });
    };

    activeTitle=(elem)=>{
        elem.classList.add('active')
    };

    correctTitle=()=>{
       document.querySelectorAll('.sign-up-nav-item').forEach(item => {
            if (Number(item.dataset.index) === this.step){
                item.classList.add('correct')
            }
        })
    };

    incorrectTitle=()=>{
        document.querySelectorAll('.sign-up-nav-item').forEach(item => {
            if (Number(item.dataset.index) === this.step){
                item.classList.remove('correct')
            }
        })
    };

    disabledOrEnableBtn=(bool)=>{
        const bigBtn = 'nextBig';
        const smallBtn = 'next';
        let current;

        this.step === 1 ? current=bigBtn : current=smallBtn;

        const btn = document.getElementById(`${current}`);

        if(bool){
            btn.removeAttribute('disabled');
            btn.classList.remove('disabled')
        } else {
            btn.setAttribute('disabled', 'true');
            btn.classList.add('disabled')
        }

    };

    toNextStep=()=>{
        this.correctTitle();

        if (this.step === 3){
          return this.sendData()
        }

        if (this.step < 3){
            this.step++;
            this.loadCurrentPage();
        }
    };

    toPrevStep=()=>{
        if (this.step > 1){
            this.step--;
            this.loadCurrentPage();
            this.incorrectTitle();
        }
    };

    closeForm=()=>{
        const form = document.getElementById('registration');
        const blur = document.querySelector('.blur ');

        form.classList.remove('active');
        form.classList.add('not-active');

        blur.classList.remove('block');
        blur.classList.add('none');
    };

    chooseAllElements=(elem)=>{
        let parentElem = elem.closest('.sign-up-body-item');
        let inputs = parentElem.querySelectorAll('input');
        let selects = parentElem.querySelectorAll('select');
        let arr = [...inputs, ...selects ];

        if (arr.length > 1){
          let valid = arr.every(item => item.validity.valid);
          valid ? this.markFieldAsSuccess(elem) : this.markFieldAsFail(elem)
        } else {
            elem.validity.valid ? this.markFieldAsSuccess(elem) : this.markFieldAsFail(elem)
        }
    };

    markFieldAsSuccess=(elem)=>{
        let parentElem = elem.closest('.sign-up-body-item');
        parentElem.classList.add('corrected');
        parentElem.classList.remove('uncorrected');
    };

    markFieldAsFail=(elem)=>{
        let parentElem = elem.closest('.sign-up-body-item');
        parentElem.classList.remove('corrected');
        parentElem.classList.add('uncorrected');
    };

    confirmationPassword=()=>{
        const { Password } = this.user.Details;
        const confPass = document.getElementById('confPass');

        Password === confPass.value && Password !== '' ?
            this.markFieldAsSuccess(confPass) :
            this.markFieldAsFail(confPass)

    };

    securityPassword=(elem)=>{
        const value = elem.value;
        const parent = document.querySelector(".password_check");

        const lowerLetter = value.match(/[a-z]/g);
        const upperLetter = value.match(/[A-Z]/g);
        const digit = value.match(/[0-9]/g);

        if (value.length === 0){
            parent.classList.remove('low', 'medium', 'hight')
        }
        if (digit){
            parent.classList.add('low');
            parent.classList.remove('medium','hight')
        }
        if (digit && lowerLetter && value.length > 6 || digit && upperLetter && value.length > 6){
            parent.classList.remove('low', 'hight')
            parent.classList.add('medium')
        }
        if (digit && upperLetter && lowerLetter && value.length > 10){
            parent.classList.remove('low','medium')
            parent.classList.add('hight')
        }
    };

    detailsBlockInputValidity=(e)=>{
        const elem = e.target;
        const fieldChecking = elem.value.match(/(\W)/g);

        if (!fieldChecking){
            this.chooseAllElements(elem);
            this.user.Details[elem.name]=elem.value;
        } else {
            this.markFieldAsFail(elem)
        }

        if (elem.name === 'Password'){
            this.securityPassword(elem);
            this.confirmationPassword();
        }

        if (elem.name === 'ConfirmPassword'){
            this.confirmationPassword()
        }

        this.checkPageValidity()
    };

    checkNameAndSurname=(elem)=>{
        let str = elem.value;
        const name = str.match(/[^A-Za-zА-Яа-я\s -]/g);
        const nameBlock = document.getElementById('nameBlock');
        const inputs = nameBlock.querySelectorAll('input');

        let checking =  [...inputs].every(item => name || item.value === '' ? true : false)

        checking ? this.markFieldAsFail(elem) : this.chooseAllElements(elem);
    };

    checkNumberPhone=(elem)=>{
        let str = elem.value;
        const num = str.match(/\d{9}/g);

        num ? this.chooseAllElements(elem) : this.markFieldAsFail(elem)
    };

    checkEmail=(elem)=>{
        let str = elem.value;
        const email = str.match(/(\w+)(\.|\-)?(\w+)?(\@)(\w+\.)(\w+)(\.)?(\w+)?/g);

        email && email[0] === elem.value ? this.chooseAllElements(elem) : this.markFieldAsFail(elem)
    };

    personalBlockInputValidity=(e)=>{
        let elem = e.target;
        this.elemClasification(elem.name)[elem.name]=elem.value;

        if (elem.name === 'FirstName' || elem.name === 'SecondName'){
            this.checkNameAndSurname(elem);
        }
        if (elem.name === 'Number'){
            this.checkNumberPhone(elem);
        }
        if (elem.name === 'Email'){
            this.checkEmail(elem)
        }

        if (elem.name === 'Adress' || elem.name === 'Gender'){
            this.chooseAllElements(elem)
        }

        this.checkPageValidity()
    };

    personalBlockSelectValidity=(e)=>{
        let elem = e.target;
        this.chooseAllElements(elem);
        this.elemClasification(elem.name)[elem.name]=elem.value;

        this.checkPageValidity()
    };

    elemClasification=(name)=>{
        if  (name === 'Day' || name === 'Month' || name === 'Year'){
            return this.user.Information.BirthDate
        } else if  (name === 'Operator' || name === 'Number'){
            return this.user.Information.Phone
        } else {
            return this.user.Information
        }
    };

    checkConfirmationPageValidity=()=>{
        const formBody = document.getElementById('sign-up-body');
        const inputs = formBody.querySelectorAll('input');

        let valid = [...inputs].every(item =>  item.checked)

        this.disabledOrEnableBtn(valid)
    };

    confirmationInputValidity=(e)=>{
        let elem = e.target;
        this.user.Confirmation[elem.name]=elem.checked;

        this.checkConfirmationPageValidity()
    };

    selectedOptions=(elem)=>{
        elem.querySelectorAll('option').forEach(item => {
             let value = this.elemClasification(elem.name)[elem.name];
             if (item.value === value){
                 item.selected = 'selected'
             }
        });
    };

    sendData=()=>{
        const { Confirmation} = this.user;

        let checking = Object.keys(Confirmation).every(key => {
            return Confirmation[key] === true
        });

        if (checking){
            console.log(this.user);
            this.congratulationTemplate()
            fetch('http://ruby.bet/',{
                method: "POST",
                body:JSON.stringify(this.user),
                headers: {
                    "Content-Type":"application/json"
                }
            })
            .then(res => res.json())
            .then(res=> {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

        }
    };

    init=()=>{
        const closeBtn = document.getElementById('closeRegForm');
        closeBtn.addEventListener('click', this.closeForm);

        this.loadHeader();
        this.userDetails();
    }

}

var registration = new Registration();
registration.init();




