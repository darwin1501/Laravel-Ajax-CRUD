<div id="editUserModal" class="user-modal hidden">
    <div class="flex justify-center align-center">
        <div class="bg-white w-4/4 -m-44 absolute p-6 r-0 rounded-lg">
            <div>
                <button onclick="closeEditUserModal()" class="close-btn p-2 pl-4 pr-4 hover:bg-red-400 hover:text-white">&times;</button>
            </div>
            <p class="text-center">Edit User</p>
            <div class="flex justify-center mt-4">
                <div class="input-container">
                    <input type="hidden" id="userId">
                    <form onsubmit="return updateUser()" id="editUserForm">
                        <p id="nameErrMsg" class="text-center edit text-red-500"></p>
                        <input type="text" name="name" id="editName" class="user-inputs p-4 w-4/4 bg-gray-200 rounded-lg border-2 border-gray-300 text-center" placeholder="username">
                        <br>
                        <br>
                        <p id="emailErrMsg" class="text-center text-red-500"></p>
                        <p id="invalidEmail" class="text-center hidden text-red-500">Invalid Email</p>
                        <input type="email" name="email" oninvalid="invalidEmail()" id="editEmail" class="editUserForm user-inputs p-4 w-4/4 bg-gray-200 rounded-lg border-2 border-gray-300 text-center" placeholder="email">
                        <br>
                        <br> 
                        <button class="w-full bg-blue-400 rounded-lg text-white text-center p-4 pr-4 pl-4">Update</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>