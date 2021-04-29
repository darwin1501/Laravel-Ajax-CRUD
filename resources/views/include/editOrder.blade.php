<div id="editOrderModal" class="hidden">
    <div class="flex justify-center align-center">
        <div class="bg-white w-4/4 -m-44 absolute p-6 r-0 rounded-lg">
            <div>
                <button onclick="closeEditOrderModal()" class="close-btn p-2 pl-4 pr-4 hover:bg-red-400 hover:text-white">&times;</button>
            </div>
            <p id ="editOrderLabel" class="text-center"></p>
            <div class="flex justify-center mt-4">
                <div class="input-container">
                    <input type="hidden" id="orderUserId">
                    <form  onsubmit="return addOrder()" id="addOrderForm">
                        <select name="editOrder" id="editOrder" class="rounded-lg p-4 w-full border-2 border-gray-300 mb-3" required oninvalid="requiredError()">
                            <option value=""> -- Select Products --</option>
                            <option value="apple">Apple</option>
                            <option value="bannana">Bannana</option>
                            <option value="chocolate">Chocolate</option>
                            <option value="mango">Mango</option>
                        </select>
                        <br>
                        <br>
                        <p id="qtyErrMsg" class="text-center text-red-500"></p>
                        <input type="number" name="editQuantity" id="editQuantity" required oninvalid="requiredError()" min="1" placeholder="Quantity" class="user-inputs quantity rounded-lg p-4 w-full border-2 border-gray-300 mb-3">
                        <br>
                        <br> 
                        <button class="w-full bg-blue-400 rounded-lg text-white text-center p-4 pr-4 pl-4">Update</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>