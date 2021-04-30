<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\ProfileController;
use App\Models\User;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// Route::get('/', [UsersController::class, 'getAllUsers'])->name('home');
Route::get('/', function(){
    // $users = User::latest()->get();
        return view('home');
})->name('home');

Route::get('/users', function(){
    $users = User::latest()->paginate(2);
    return $users;
});

// Route::get('/users', [UsersController::class, 'getAllUsers']);
Route::get('/edit/{user}', [UsersController::class, 'editUser']);
Route::post('/update/{user}', [UsersController::class, 'updateUser']);
Route::get('/search/{name}', [UsersController::class, 'searchUser']);
// Route::match(array('GET', 'POST'), '/search', [UsersController::class, 'searchUser']);
Route::delete('/delete/{user}', [UsersController::class, 'deleteUser']);
// for testing ajax request
// Route::get('/users/{user}', [UsersController::class, 'getUsers']);
Route::post('/users', [UsersController::class, 'addUsers'])->name('test.post');

// order
Route::get('/order/{user}', [OrdersController::class, 'userOrder']);
Route::get('/userorders/{userId}', [OrdersController::class, 'userOrders']);
Route::post('/addorder', [OrdersController::class, 'addUserOrder']);
Route::get('/editorder/{order}', [OrdersController::class, 'editUserOrder']);
Route::post('/updateorder/{orderId}', [OrdersController::class, 'updateOrder']);

// profile
Route::get('/profile/{user}', [ProfileController::class, 'userProfile']);