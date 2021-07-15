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

const save = () => {
    try{
        let addressBookData = createEmployeePayroll();
        createAndUpdateStorage(addressBookData);
    }catch(e){
        return;
    }
}

const createEmployeePayroll = () => {
    let addressBookData = new Person();
    addressBookData.id = getNewId();
    addressBookData.fullName = getInputValueById('#name');
    addressBookData.phoneNumber = getInputValueById('#number')
    addressBookData.address = getInputValueById('#address');
    addressBookData.city = getInputValueById('#city');
    addressBookData.state = getInputValueById('#state');
    addressBookData.pinCode = getInputValueById('#pinCode');
    alert(addressBookData.toString());
    return addressBookData;
}

const getNewId = () => {
    let personID = localStorage.getItem("PersonID");
    personID = !personID ? 1 : (parseInt(personID) + 1).toString();
    localStorage.setItem("PersonID",personID);
    return personID;
}

const resetForm = () => {
    setValue('#name','');
    setValue('#number','');
    setValue('#address','');
    setValue('#city','Select City');
    setValue('#state','Select State');
    setValue('#pinCode','Enter PinCode');
} 


const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

function createAndUpdateStorage(addressBookData) {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if(addressBookList != undefined){
        addressBookList.push(addressBookData);
    }else{
        addressBookList = [addressBookData];
    }
    alert(addressBookData.toString());
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}

const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setValue = (id,value) => {
    const element = document.querySelector(id);
    element.value = value;
}