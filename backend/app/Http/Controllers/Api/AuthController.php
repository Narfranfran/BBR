<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\Registered;

use App\Rules\Recaptcha;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|confirmed|min:8',
            'recaptcha_token' => ['required', new Recaptcha],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Send Email Verification / Welcome Email
        event(new Registered($user));

        // Auto login
        Auth::login($user);

        return response()->json(['message' => 'Registered successfully', 'user' => $user]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'recaptcha_token' => ['required', new Recaptcha],
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            \Illuminate\Support\Facades\Log::info('Login Failed: Invalid credentials');
            throw ValidationException::withMessages([
                'email' => ['Las credenciales son incorrectas.'],
            ]);
        }

        return response()->json(['message' => 'Login successful', 'user' => Auth::user()]);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out']);
    }

    // Delete Account
    public function deleteAccount(Request $request)
    {
        $user = $request->user();

        Auth::guard('web')->logout();

        $user->delete(); // Cascading delete handles related data (reviews, favorites)

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Cuenta eliminada permanentemente.']);
    }

    public function user(Request $request)
    {
        $user = $request->user()->load(['favorites', 'reviews.bar']);

        // Force UTF-8 conversion for all fields to prevent JSON encoding errors
        $clean = function ($data) use (&$clean) {
            if (is_array($data)) {
                return array_map($clean, $data);
            }
            if (is_string($data)) {
                return mb_convert_encoding($data, 'UTF-8', 'UTF-8');
            }
            if ($data instanceof \Illuminate\Database\Eloquent\Model) {
                 return $clean($data->toArray());
            }
            if ($data instanceof \Illuminate\Database\Eloquent\Collection) {
                 return $clean($data->toArray());
            }
            return $data;
        };

        return response()->json($clean($user));
    }
}
