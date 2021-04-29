@extends('layout.app')

@section('content')
    <main class="mt-40">
        @include('include.buttons')
        @include('include.userTable')
        @include('include.addUserModal')
        @include('include.editUserModal')
        @include('include.profile')
        @include('include.addOrder')
        @include('include.editOrder')
    </main>
    {{-- add user modal --}}
    {{-- edit user modal --}}

    {{-- add order modal --}}
@endsection