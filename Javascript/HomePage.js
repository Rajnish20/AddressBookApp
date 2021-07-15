let personList;
window.addEventListener('DOMContentLoaded',(event) => {
    personList = getPersonDataFromStorage();
    createInnerHtml();
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
           <img src="../assets/delete-black-18dp.svg" id="1" onclick="remove(this)" alt="delete">
           <img src="../assets/create-black-18dp.svg" id="1" onclick="update(this)" alt="edit">
          </td>
        </tr>
       `;
    }    
    document.querySelector('#display').innerHTML = innerHtml;
}