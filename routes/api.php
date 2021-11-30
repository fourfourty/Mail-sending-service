<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TextController;
use Own\Mail;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::group(['middleware' => ['web']], function () {
// });
Route::post("auth", [UserController::class, 'userLogin']);
Route::post("putUser", [UserController::class, 'userSignUp']);
Route::get("user/{email}", [UserController::class, 'userDetail']);
Route::get('isAuth' , [AuthController::class, 'isAuth']);
Route::post('sendMail' , [Mail::class, 'init']);
Route::get('getText' , [TextController::class, 'getText']);

