

// generate pagination buttons
const paginationButtons = ((pagination)=>{
    const paginationLinks = document.getElementById('paginationLinks');
    // remove old pagination links
    paginationLinks.innerHTML = "";
   for (const link of pagination.links) {
       let buttonTemplate;

       if(link.active === true){

         buttonTemplate = `<button class='p-4 border-2 border-gray-300 active' onclick='navigatePagination("${link.url}")'>
                                ${link.label}
                            </button>
                            `;
       }else{
        buttonTemplate = `<button class='p-4 border-2 border-gray-300' onclick='navigatePagination("${link.url}")'>
                                ${link.label}
                          </button>
                          `;
       }
         paginationLinks.insertAdjacentHTML('beforeend', buttonTemplate);
    }
    
});

const generateTable = ((users)=>{
    const usersTable = document.getElementById('usersTable');
    // remove old data on tables
    usersTable.innerHTML = "";
        for (const user of users) {
            // format date
            const dateString = user.created_at;
            // new date format
            const D = new Date(dateString);
            const tableRow = `
                <tr id=${user.id}>
                    <td class="border-2 border-gray-400 p-2">${user.name}</td>
                    <td class="border-2 border-gray-400 p-2">${user.email}</td>
                    <td class="border-2 border-gray-400 p-2">${("0"+D.getDate()).slice(-2)}/${("0"+(D.getMonth()+1)).slice(-2)}/${D.getFullYear()}</td>
                    <td class="border-2 border-gray-400 p-2">
                        <div class="dropdown">
                        <div class="dropbtn" style="background-image: url('/svg/setting.svg')"></div>
                        <div class="dropdown-content">
                            <button class="hover:bg-gray-300 w-full p4 btn-edit" onclick="editUserModal()" value=${user.id}>
                                edit
                            </button>
                            <form onsubmit='return deleteUser(${user.id})'>
                                <button class="hover:bg-gray-300 w-full p4 btn-delete">
                                    delete
                                </button>
                            </form>
                        </div>
                        </div>
                    </td>
                </tr>`;
            //loop and insert html element on table body
            usersTable.insertAdjacentHTML('beforeend', tableRow);
        }
});

const searchName = document.getElementById('searchName');
// add event listener onInput on search field
searchName.addEventListener('input', ()=>{
    let currentPageLink = document.getElementById('currentPageLink');
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const name = searchName.value;
    const noResult= document.getElementById('noResult');
    const table = document.getElementById('table');
    const request = new XMLHttpRequest;

    request.open("GET",'/search/'+name, true);
    request.setRequestHeader("X-CSRF-TOKEN", token);
    request.onload = function(){
        const result = JSON.parse(this.responseText);
        // load table
        generateTable(result.data);
        // // load pagination
        paginationButtons(result);
        // set current page link
        currentPageLink.value = result.links[1].url;
        // console.log(result.data.length);
        if(result.data.length === 0){
            noResult.classList.remove('hidden');
            table.classList.add('hidden');
        }else if(result.data.length > 0){
            noResult.classList.add('hidden');
            table.classList.remove('hidden');
        }
    }
    // send request if not empty
    if(!(name === '')){
        request.send();
    }else{
        getAllUsers();
    }
})

// get all users
const getAllUsers = (()=>{
    const currentPageLink = document.getElementById('currentPageLink');
    const request = new XMLHttpRequest;
    
    request.open("GET",'/users', true);
    request.onload = function (){
        // remove old pagination links
        paginationLinks.innerHTML = "";
        // paginated data formated on json
        const pagination = JSON.parse(this.responseText);
        //generate pagination buttons    
        paginationButtons(pagination);
         // load table
        generateTable(pagination.data);
        // set the current page link
        currentPageLink.value = pagination.links[1].url;
        // console.log(pagination);
    };
    request.send();
})

getAllUsers();

const navigatePagination = ((url)=>{
        const currentPageLink = document.getElementById('currentPageLink');
        const paginationLinks = document.getElementById('paginationLinks');
        const request = new XMLHttpRequest;
  
        request.open("GET",url, true);
        request.onload = function(){
            // remove old pagination values
            paginationLinks.innerHTML = "";
            //remove current page link value
            currentPageLink.value = "";
            // set new current page link
            currentPageLink.value = url; 
           // paginated data formated on json
            const pagination = JSON.parse(this.responseText);
             // update pagination links when pagination button has click
             paginationButtons(pagination);
            // load table
            generateTable(pagination.data);
        }
        // check if button was empty
        if(!(url === 'null')){
            // console.log('not empty');
            request.send();
        }
})
// remove, show error messages
const inputs = document.getElementsByClassName('user-inputs');
// eventlisteners for removing error messages and warnings
for (const input of inputs) {
    input.addEventListener('input', function(){
        // rmeove error warning on inputs
        this.classList.remove('error-inputs');
        // get the name attributes of input
        // then add to "ErrMsg" string
        // this will use to search specific id of <p></p> to remove error message 
        const errorTag = `${this.name}ErrMsg`;
        // remove error message when typing
        const getAllErrorTag = document.querySelectorAll(`#${errorTag}`);
        for (const tag of getAllErrorTag) {
            tag.innerHTML = "";
        }
        const invalidEmailTag = document.querySelectorAll('#invalidEmail'); 
        for (const tag of invalidEmailTag) {
            tag.classList.add('hidden');
        }
    })
}
// show error warning and message when email was invalid
const invalidEmail = (()=>{
    const target = event.target || event.srcElement;
    // get the first classname on target element,
    // this classname will use to find the id of the form
    const form = document.getElementById(`${target.className.split(' ')[0]}`)
    target.classList.add('error-inputs');
    // get the specific form with #invalidEmail i.d and remove hidden class
    form.querySelectorAll('#invalidEmail')[0].classList.remove('hidden');
})
// show error warning on required fields
const requiredError = (()=>{
    const target = event.taget || event.srcElement
    target.classList.add('error-inputs');
})
// remove error waring when selecting items on selection
document.getElementById('order').addEventListener('change', function(){
    const target = event.taget || event.srcElement;
    target.classList.remove('error-inputs');
})

const addUser = (()=>{
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value
    const token = document.querySelector('meta[name="csrf-token"]').content; 
    const addUserForm = document.getElementById('addUserForm');
    const request = new XMLHttpRequest();
    const emptyInputs = [];

	request.open("POST",'/users', true);
    request.setRequestHeader("X-CSRF-TOKEN", token);
	request.onload = function(){
        // console.log(this.responseText);
        if(this.responseText === 'usedEmail'){
            document.getElementById('email').classList.add('error-inputs');
            addUserForm.querySelectorAll(`#emailErrMsg`)[0].innerHTML = 'Email already used';
        }else{
            for (const input of inputs) {
                // clear user inputs
                input.value = "";
            }
        }
        // reload the table
        getAllUsers();
	}
    // get all child elements of form with a type of text or email with null value
    for (const element of addUserForm) {
        if((element.type === 'text' || element.type === 'email' ) && element.value === ''){
            emptyInputs.push(element);
        }
    }
    // check if there's empty inputs if there's any then
    // add errors on empty inputs
    if (emptyInputs.length > 0) {
        for (const input of emptyInputs) {
            input.classList.add('error-inputs');
            // get the name attributes of input
            // then concatinate to "ErrMsg" string
            // this will use to search specific id of <p></p> to throw error message on that element
            const errorMsg = `${input.name}ErrMsg`;
            // this will get the specific child element of parent element
            addUserForm.querySelectorAll(`#${errorMsg}`)[0].innerHTML = "This Can't be empty";
            // console.log(editUserForm.querySelectorAll(`#${errorMsg}`));
         }
    }else{
        // send request
        //  key:value
         request.send(JSON.stringify({
            name: name,
            email: email,
        }));
        
    }
    // prevent the form from submitting and reloading the page.
    return false;
});
//Modals
const addUserModal = (()=>{
    document.getElementById('addUserModal').style.display='block';
});

const closeAddUserModal = (()=>{
    document.getElementById('addUserModal').style.display='none';
});

const addOrderModal = (()=>{
    document.getElementById('addOrderModal').style.display='block';
})

const closeAddOrderModal = (()=>{
    document.getElementById('addOrderModal').style.display='none';
});

const editUserModal = (()=>{
    const token = document.querySelector('meta[name="csrf-token"]').content; 
    // get the user id to be edit
    const target = event.target || event.srcElement;
	const user = target.value;
    const request = new XMLHttpRequest();
    
    // route model binding
    request.open("GET",'/edit/'+user, true);
    request.setRequestHeader("X-CSRF-TOKEN", token);
    request.onload = function(){
        const nameInput = document.getElementById('editName');
        const emailInput = document.getElementById('editEmail');
        const userId = document.getElementById('userId');
        const loadedRequest = JSON.parse(this.responseText);
        // load the data on inputs
        nameInput.value = loadedRequest.name;
        emailInput.value = loadedRequest.email;
        userId.value = loadedRequest.id;
        // load modal after the request has loaded
        document.getElementById('editUserModal').style.display='block';
    };
    request.send();
});

const closeEditUserModal = (()=>{
    document.getElementById('editUserModal').style.display='none';
});

const updateUser = (()=>{
    const currentPageLink = document.getElementById('currentPageLink').value;
    const token = document.querySelector('meta[name="csrf-token"]').content; 
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const user = document.getElementById('userId').value;
    const editUserForm = document.getElementById('editUserForm');
    const emptyInputs = [];
    const request = new XMLHttpRequest();
    // const emptyInputs = [];
    // route model binding
    request.open("POST",'/update/'+user, true);
    request.setRequestHeader("X-CSRF-TOKEN", token);
    request.onload = function(){
        if(this.responseText === 'usedEmail'){
            document.getElementById('editEmail').classList.add('error-inputs');
            editUserForm.querySelectorAll(`#emailErrMsg`)[0].innerHTML = 'Email already used';
        }
        // reload the table
        navigatePagination(currentPageLink);
    };
    // get all child elements of form with a type of text with null value
    for (const element of editUserForm) {
        if(element.type === 'text' && element.value === ''){
            emptyInputs.push(element);
        }
    }
    // check if there's empty inputs if there's any then
    // add errors on empty inputs
    if (emptyInputs.length > 0) {
        for (const input of emptyInputs) {
            input.classList.add('error-inputs');
         // get the name attributes of input
         // then concatinate to "ErrMsg" string
         // this will use to search specific id of <p></p> to throw error message on that element
            const errorMsg = `${input.name}ErrMsg`;
            editUserForm.querySelectorAll(`#${errorMsg}`)[0].innerHTML = "This Can't be empty";
         }
    }else{
        // send request
        //  key:value
         request.send(JSON.stringify({
            name: name,
            email: email,
        }));
        
    }
    // prevent the form from submitting and reloading the page.
    return false;
});

const deleteUser = ((userId)=>{
    const userTableRow = document.getElementById(userId);
    const token = document.querySelector('meta[name="csrf-token"]').content; 
    const request = new XMLHttpRequest;
    const deleteConfirmation = confirm('Do you want to delete this?');
    // ajax request
    request.open('delete', '/delete/'+userId, true);
    request.setRequestHeader("X-CSRF-TOKEN", token);
    // send delete request if delete was confirm
    if(deleteConfirmation === true){
        userTableRow.classList.add('hidden');
        request.send();
    }

    return false;
});

// testing
// const postUsers = (()=>{

//     const username = document.getElementById('username').value;
//     const meta = document.querySelector('meta[name="csrf-token"]').content;   

//     const request = new XMLHttpRequest();
// 	request.open("POST",'/users', true);
//     request.setRequestHeader("X-CSRF-TOKEN", meta);

// 	request.onload = function(){
//         // console.log(JSON.parse(this.responseText))
//         // document.getElementById('result').innerHTML = this.responseText
//         console.log(this.responseText)
//         console.log(userId);
// 	}
//     // key:value
// 	request.send(JSON.stringify({
//         username: username,
//         age:23,
//         gender:'male'
//     }));
//     //prevent the form from submitting and reloading the page.
//     return false;
// })

// const bindUser = (()=>{
//     const meta = document.querySelector('meta[name="csrf-token"]').content;  
//     const userId = document.getElementById('userId').value; 

//     const request = new XMLHttpRequest();
// 	request.open("GET",'/users/'+userId, true);
//     request.setRequestHeader("X-CSRF-TOKEN", meta);

// 	request.onload = function(){
//         console.log(this.responseText)
//         // console.log(JSON.parse(this.responseText))
// 	}
//     // key:value
// 	request.send();
//     //prevent the form from submitting and reloading the page.
//     return false;
// })