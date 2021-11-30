<?php

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

Route::get('/', function () {
    return view('welcome');
});
Route::get('/sign-in', function () {
    return view('welcome');
});
Route::get('/home', function () {
    return view('welcome');
});
Route::get('/send', function () {
    return view('welcome');
});
Route::get('/add-user', function () {
    return view('welcome');
});
