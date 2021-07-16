let isUpdate = false;
let personObj = {};
window.addEventListener('DOMContentLoaded',(event) => {

    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function(){
        try{
            checkName(name.value);
            textError.textContent = "";
        }catch(e){
            textError.textContent = e;
        }
    });

    const phnNumber = document.querySelector('#number');
    const numberError = document.querySelector('.number-error');
    phnNumber.addEventListener('input',function(){
        try{
            checkNumber(phnNumber.value);
            numberError.textContent = "";
        }catch(e){
            numberError.textContent = e;
        }
    })

    checkForUpdate();
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
        setPersonObj();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }catch(e){
        return;
    }
}

const setPersonObj = () => {
    if(!isUpdate && site_properties.use_local_storage.match("true")){
        personObj.id = getNewId();
    }
    personObj._fullName = getInputValueById('#name');
    personObj._phoneNumber = getInputValueById('#number')
    personObj._address = getInputValueById('#address');
    personObj._city = getInputValueById('#city');
    personObj._state = getInputValueById('#state');
    personObj._pinCode = getInputValueById('#pinCode');
}

function createAndUpdateStorage() {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if(addressBookList){
        let personData = addressBookList.find(person => person.id == personObj.id);
        if(!personData){
            addressBookList.push(personObj);
        }else{
            const index = addressBookList.map(person => person.id)
                                         .indexOf(personData.id);
            addressBookList.splice(index,1,personObj);
        }
    }else{
        addressBookList = [personObj];
    }
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
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

const checkForUpdate = () => {
    const personJson = localStorage.getItem('editPerson');
    isUpdate = personJson ? true : false;
    if(!isUpdate) return;
    personObj = JSON.parse(personJson);
    setForm();
}

const setForm = () => {
    setValue('#name',personObj._fullName);
    setValue('#number',personObj._phoneNumber);
    setValue('#address',personObj._address);
    setValue('#city',personObj._city);
    setValue('#state',personObj._state);
    setValue('#pinCode',personObj._pinCode);
} 

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}


const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setValue = (id,value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const cancel = () => {
    window.location.replace(site_properties.home_page);
}