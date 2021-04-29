<div id="profileModal" class="profile-modal hidden">
    <div class="flex justify-center align-center">
        <div class="bg-white w-80 -mt-80 absolute p-6 r-0 rounded-lg">
            <div>
                <button onclick="closeProfileModal()" class="close-btn p-2 pl-4 pr-4 hover:bg-red-400 hover:text-white">&times;</button>
            </div>
            <p class="text-center"><strong>Profile</strong></p>
            <div class="flex justify-center mt-4">
                
                <div class="w-full">
                    {{-- <input type="hidden" id="orderUserId"> --}}
                    <p id="profileUsername"></p>
                    <p id="profileEmail"></p>
                    {{-- edit profile --}}
                    <br><br>
                    {{-- orders --}}
                    {{-- Total Order:  --}}
                    <p id="totalOrder"class="text-center"></p>
                    <br><br>
                    <p id="userOrders" class="text-center">List of Orders</p>
                    {{-- List of Orders  with edit and remove orders button --}}
                </div>
            </div>
        </div>
    </div>
</div>