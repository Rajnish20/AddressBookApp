let personList;
window.addEventListener('DOMContentLoaded',(event) => {
    personList = getPersonDataFromStorage();
    createInnerHtml();
    localStorage.removeItem('editPerson');
});

const getPersonDataFromStorage = () => {
    return localStorage.getItem('AddressBookList') ?
                        JSON.parse(localStorage.getItem('AddressBookList')) : [];
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
    localStorage.setItem("AddressBookList",JSON.stringify(personList));
    createInnerHtml();
}

const update = (node) => {
    let personData = personList.find(person => person.id == node.id);
    if(!personData) return;
    localStorage.setItem('editPerson',JSON.stringify(personData));
    window.location.replace(site_properties.form);
}
