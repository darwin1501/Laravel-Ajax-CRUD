<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ProfileController extends Controller
{
    public function userProfile(User $user){
        
        $data = [
            'name' => $user->name,
            'email' => $user->email,
            'orders' => $user->order()->get()
        ];

        return $data;
        // return a json
    }
}
