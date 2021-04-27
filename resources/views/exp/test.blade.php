@extends('layout.app')

@section('content')
    {{-- button to get data on database--}}
    {{-- table  --}}
    {{-- <form onsubmit="return getUsers()"> --}}
        {{-- @csrf --}}
        {{-- <button id="add-records">Get</button> --}}
        {{-- <button id="add-records">Get</button>
    </form> --}}
    
    <p id="result"></p>
    <form onsubmit="return postUsers()">
        <input class="rounded-lg p-4 w-full border-2 border-gray-300 mb-2" name="username" id="username" placeholder="username">
        <button id="add-records">Post</button>
    </form>

    <form onsubmit="return bindUser()">
        <input type="hidden" id="userId" value= {{$id}}>
        <button id="add-records">Bind</button>
    </form>

    {{-- <form action= {{ route('test.post')}} method="POST">
        @csrf
        <input class="rounded-lg p-4 w-full border-2 border-gray-300 mb-2" name="username" id="username" placeholder="username">
        <button id="add-records">Post</button>
    </form> --}}
@endsection