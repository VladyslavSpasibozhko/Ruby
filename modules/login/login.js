window.Login = class Login {
   constructor(){

   }
   showRegisterForm=()=>{
       const registrationForm = document.getElementById('registration');
       const blur = document.querySelector('.blur');

        blur.classList.toggle('none');
        blur.classList.toggle('block');
        registrationForm.classList.toggle('not-active');
        registrationForm.classList.toggle('active');
    };

   init=()=>{
       const registerBtn = document.getElementById('register');
       registerBtn.addEventListener('click', this.showRegisterForm);
   }
}
window.login = new Login();
login.init();






