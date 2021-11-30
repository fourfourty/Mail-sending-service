<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class AuthController extends Controller
{
    
    public static function isAuth() 
    {

        //print_r($_SESSION,true);
        return json_encode(Auth::check());
        // if (session()->exists('isAuth')) {
        //     return json_encode(true);
        // } else {
        //     return json_encode(false);
        // }
    }

    private function checkData(string $pass,string $dbpass): bool 
    {
        if (password_verify($pass, $dbpass)) {
            return true;
        } else {
            return false;
        }
    }

    // private function saveAuth(string $currentPass, array $arr): void 
    // {
    //     session(['userid' => $arr['email']]);
    //     // session(['userPassword' => $currentPass]);
    //     session(['name' => $arr['name']]);
    //     session(['role' => $arr['role']]);
    //     session(['phone' => $arr['phone']]);
        
    //     echo json_encode([
    //     'email' => session('userid'),
    //     'name' => session('name'),
    //     'role' => session('role'),
    //     'phone' => session('phone')]);
    // }

    public function auth(Request $request, Response $response) 
    {
        // $login = $request->only('login', 'password');
        // $currentPassword = $request->input('password');
        // $user = DB::select('select * from user where email = :login' ,['login' => $login]);
        // var_dump($login);
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/');
        }

        // $jsonUserArr = json_decode (json_encode ($user, true), true);
        // $userPassword  = $jsonUserArr[0]['password'];
        // $user = $jsonUserArr[0]['email'];
        // $checkedResult = $this->checkData($currentPassword, $userPassword);
        // ['email' => $email,'phone' => $phone,'role' => $role, 'name' => $name] = $jsonUserArr[0];

        // if ($checkedResult) {
        //     // Auth::login($user);
        //     // $this->saveAuth($currentPassword,$jsonUserArr[0]);

        //     return $response
        //         ->withCookie(cookie('isAuth', $login, 0, '/'))
        //         ->withCookie(cookie('currentUserData', json_encode([$email,$phone,$role,$name]), 0, '/'));
        // }
        // else {
        //     return false;
        // }
    }
}
