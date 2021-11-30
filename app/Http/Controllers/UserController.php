<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    private $status_code    =        200;

    public function userSignUp(Request $request) {
        $data = $request->input('data');
        $validator              =        Validator::make($request->input('data'), [
            "name"              =>          "required",
            "email"             =>          "required|email",
            "password"          =>          "required",
            "phone"             =>          "required",
            "role"             =>          "required"
        ]);

        if($validator->fails()) {
            return response()->json(["status" => "failed", "success" => false, "message" => "Ошибка валидации", "errors" => $validator->errors()]);
        }

        // $name                   =       $data['name'];
        // $name                   =       explode(" ", $name);
        // $first_name             =       $name[0];
        // $last_name              =       "";

        // if(isset($name[1])) {
        //     $last_name          =       $name[1];
        // }

        $userDataArray          =       array(
            // "first_name"         =>          $first_name,
            // "last_name"          =>          $last_name,
            "name"               =>          $data['name'],
            "email"              =>          $data['email'],
            "password"           =>          md5($data['password']),
            "phone"              =>          $data['phone'],
            "role"               =>          $data['role']
        );

        $user_status            =           User::where("email", $data['email'])->first();

        if(!is_null($user_status)) {
           return response()->json(["status" => "failed", "success" => false, "message" => "Такой email уже существует"]);
        }

        $user                   =           User::create($userDataArray);

        if(!is_null($user)) {
            return response()->json(["status" => $this->status_code, "success" => true, "message" => "Успешная регистрация", "data" => $user]);
        }

        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Ошибка регистрации"]);
        }
    }


    // ------------ [ User Login ] -------------------
    public function userLogin(Request $request) {

        $validator          =       Validator::make($request->all(),
            [
                "email"             =>          "required|email",
                "password"          =>          "required"
            ]
        );

        if($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        }


        // check if entered email exists in db
        $email_status       =       User::where("email", $request->email)->first();


        // if email exists then we will check password for the same email

        if(!is_null($email_status)) {
            $password_status    =   User::where("email", $request->email)->where("password", md5($request->password))->first();

            // if password is correct
            if(!is_null($password_status)) {
                $user           =       $this->userDetail($request->email);

                return response()->json(["status" => $this->status_code, "success" => true, "message" => "Успешно", "data" => $user]);
            }

            else {
                return response()->json(["status" => "failed", "success" => false, "message" => "Неверный логин или пароль."]);
            }
        }

        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Логин не существует"]);
        }
    }

    // ------------------ [ User Detail ] ---------------------
    public function userDetail($email) {
        $user               =       array();
        if($email != "") {
            $user           =       User::where("email", $email)->first();
            return $user;
        }
    }
}

