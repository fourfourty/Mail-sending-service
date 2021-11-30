<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Text;
use Illuminate\Support\Facades\DB;

class TextController extends Controller
{   
    
    public function getText()
    {
        return DB::table('send_text')->get();
    }
    public function putText()
    {
        
    }
}
