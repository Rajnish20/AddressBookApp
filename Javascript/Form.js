window.addEventListener('DOMContentLoaded',(event) => {

    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function(){
        try{
            new Person().fullName = name.value;
            textError.textContent = "";
        }catch(e){
            textError.textContent = e;
        }
    });

    const phnNumber = document.querySelector('#number');
    const numberError = document.querySelector('.number-error');
    phnNumber.addEventListener('input',function(){
        try{
            new Person().phoneNumber = phnNumber.value;
            numberError.textContent = "";
        }catch(e){
            numberError.textContent = e;
        }
    })

});