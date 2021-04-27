<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\Builder;

class UsersController extends Controller
{
    // public function getUsers(User $user){
    //    return $user->name;  
    // }
    public function searchUser($name)
    {
        // $name = $request->json('name');
        $user = User::query()
                    ->where('name', 'LIKE', "%{$name }%")
                    ->paginate(2);
        return $user;
        // return $name;
    }

    public function getAllUsers()
    {
        $users = User::latest()->get();
        return $users;
        
    }

    public function addUsers(Request $request)
    {
        //this function get the json request instead of input,
        //because, javascript get the input and transfer it to ajax request
        //formated on json.
        // $name = $request->json('name');
        // $email = $request->json('email');

        // validate email
        // $this->validate($request,[
        //     'username' => 'required',
        //     'email' => 'required|email'
        // ]);        
        // catch error on email must be unique
        try{
            // store to database
            DB::table('users')->insert([
                'name' => $request->json('name'),
                'email' => $request->json('email'),
                'created_at' =>  \Carbon\Carbon::now()
            ]);

            return "stored successfully";
        }
        catch(QueryException $e){
            $errorCode = $e->errorInfo[1];
            // check email already exists
            // email has unique attributes
            if($errorCode == 1062)
            {
                return "usedEmail";
            }
        }
        //get all json request
        // $data = $request->json()->all();
    }

    public function editUser(User $user)
    {
        return $user;
    }

    public function updateUser(User $user, Request $request)
    {
        // catch error on email must be unique
        try{
            // insert data to Users table
            $user->name = $request->json('name');
            $user->email = $request->json('email');
            $user->save();

            return "stored successfully";
        }
        catch(QueryException $e){
            $errorCode = $e->errorInfo[1];
            // check email already exists
            // email has unique attributes
            if($errorCode == 1062)
            {
                return "usedEmail";
            }
        }
    }

    public function deleteUser(User $user){
        $user->delete();
    }

    public function showWelcome()
    {
        return view('welcome');
    }
}
