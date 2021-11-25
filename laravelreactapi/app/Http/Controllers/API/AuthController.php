<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){

        $validator=Validator::make($request->all(),[
                'first_name'=>'required|max:190',
                'last_name'=>'required|max:190',
                'email'=>'required|email|max:190|unique:users,email',
                'phone'=>'required|max:190',
                'address'=>'required|max:190',
                'password'=>'required|min:8',
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->errors(),
            ]);
        }
        else{
             $user=User::create([
                 'first_name'=>$request->first_name,
                 'last_name'=>$request->last_name,
                 'email'=>$request->email,
                 'phone'=>$request->phone,
                 'address'=>$request->address,
                 'password'=>Hash::make($request->password),
             ]);

             $token=$user->createToken($user->email.'_Token')->plainTextToken;

             return response()->json([
                'status'=>200,
                'first_name'=>$user->first_name,
                'last_name'=>$user->last_name,
                'email'=>$user->email,
                'phone'=>$user->phone,
                'address'=>$user->address,
                'token'=>$token,
                'message'=>'Registered Succesfully',
            ]);

        }
    }


    public function login(Request $request)

    {

        $validator=Validator::make($request->all(),[
            'email'=>'required|max:191',
            'password'=>'required',
        ]);

        if($validator->fails())

        {
            return response()->json([
                'validation_errors' => $validator->errors(),
            ]);
        }

        else
        {

             $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid Credentials',
                ]);
            }

            else
            {

                $token=$user->createToken($user->email.'_Token')->plainTextToken;

                return response()->json([
                    'status'=>200,
                    'first_name'=>$user->first_name,
                    'last_name'=>$user->last_name,
                    'email'=>$user->email,
                    'phone'=>$user->phone,
                    'address'=>$user->address,
                    'token'=>$token,
                    'message'=>'Logged In Succesfully',
                ]);
            }
        }

    }

    public function logout(Request $request){

         $request->user()->currentAccessToken()->delete();

         return response()->json([
            'status'=>200,
            'message'=>'Logged Out Successfully',
        ]);
    }

}
