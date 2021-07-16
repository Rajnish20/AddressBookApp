let personList;
window.addEventListener('DOMContentLoaded',(event) => {
    if(site_properties.use_local_storage.match("true")){
        getPersonDataFromStorage();
    }else{
        getPersonDataFromServer();
    }
});


const getPersonDataFromStorage = () => {
    personList = localStorage.getItem('AddressBookList') ?
                        JSON.parse(localStorage.getItem('AddressBookList')) : [];
    processPersonDataResponse();
}

const processPersonDataResponse = () => {
    createInnerHtml();
    localStorage.removeItem('editPerson');
}

const getPersonDataFromServer = () => {
    makeServiceCall("GET",site_properties.server_url,true)
    .then(responseText => {
        personList = JSON.parse(responseText);
        processPersonDataResponse();
    })
    .catch(error => {
        console.log("GET Error Status "+JSON.stringify(error));
        personList = [];
        processPersonDataResponse();
    });

}

const createInnerHtml = () => {
    if (personList.length == 0) return;
    const headerHtml = "<th>FullName</th><th>Address</th><th>City</th><th>State</th><th>PinCode</th><th>Phone Number</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    for (const personData of personList){
        innerHtml = `${innerHtml}
         <tr>
          <td>${personData._fullName}</td>
          <td>${personData._address}</td>
          <td>${personData._city}</td>
          <td>${personData._state}</td>
          <td>${personData._pinCode}</td>
          <td>${personData._phoneNumber}</td>
          <td>
           <img id="${personData.id}" src="../assets/delete-black-18dp.svg" onclick="remove(this)" alt="delete">
           <img id="${personData.id}" src="../assets/create-black-18dp.svg" onclick="update(this)" alt="edit">
          </td>
        </tr>
       `;
    }    
    document.querySelector('#display').innerHTML = innerHtml;
}


const remove = (node) => {
    let personData = personList.find(person => person.id == node.id);
    if(!personData) return;
    const index = personList.map(person => person.id)
                                .indexOf(personData.id);
    personList.splice(index,1);
    if(site_properties.use_local_storage.match("true")){
        localStorage.setItem("AddressBookList",JSON.stringify(personList));
        createInnerHtml();
    }else{
        const deleteURL = site_properties.server_url+"/"+personData.id.toString();
        makeServiceCall("DELETE",deleteURL,false)
         .then(responseText => {
             createInnerHtml();
         })
         .catch(error => {
             console.log("Delete error status :"+JSON.stringify(error));
         });
    }   
}

const update = (node) => {
    let personData = personList.find(person => person.id == node.id);
    if(!personData) return;
    localStorage.setItem('editPerson',JSON.stringify(personData));
    window.location.replace(site_properties.form);
}
