<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Order;

class OrdersController extends Controller
{
    public function userOrder(User $user)
    {
        return $user;
    }

    public function addUserOrder(Request $request)
    {
        $userId = $request->json('userId');
        $order = $request->json('order');
        $quantity = $request->json('quantity');

        // store
        DB::table('orders')->insert([
            'user_id' => $userId,
            'product_name' => $order,
            'quantity' => $quantity,
            'created_at' => \Carbon\Carbon::now()
        ]);
        // return `{$userId}, {$order}, {$quantity}`;
        // return $order;
    }
}
