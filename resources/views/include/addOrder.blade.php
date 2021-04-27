<div id="addOrderModal" class="order-modal hidden">
    <div class="flex justify-center align-center">
        <div class="bg-white w-4/4 -m-44 absolute p-6 r-0 rounded-lg">
            <div>
                <button onclick="closeAddOrderModal()" class="close-btn p-2 pl-4 pr-4 hover:bg-red-400 hover:text-white">&times;</button>
            </div>
            <p class="text-center">Add an Order</p>
            <div class="flex justify-center mt-4">
                <div class="input-container">
                    <form  id="addOrderForm">
                        <select name="order" id="order" class="rounded-lg p-4 w-full border-2 border-gray-300 mb-3" required oninvalid="requiredError()">
                            <option value=""> -- Select Products --</option>
                            <option value="apple">Apple</option>
                            <option value="bannana">Bannana</option>
                            <option value="chocolate">Chocolate</option>
                            <option value="mango">Mango</option>
                        </select>
                        <br>
                        <br>
                        <p id="qtyErrMsg" class="text-center text-red-500"></p>
                        <input type="number" id="quantity" required oninvalid="requiredError()" name="quantity" min="1" placeholder="Quantity" class="user-inputs quantity rounded-lg p-4 w-full border-2 border-gray-300 mb-3">
                        <br>
                        <br> 
                        <button class="w-full bg-blue-400 rounded-lg text-white text-center p-4 pr-4 pl-4">Add</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>