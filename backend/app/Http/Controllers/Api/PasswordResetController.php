<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Models\User;
use Carbon\Carbon;

class PasswordResetController extends Controller
{
    // Request a reset code
    public function sendResetCode(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        // Always return success to prevent email enumeration, but log if user missing
        if (!$user) {
            Log::info("Password reset requested for non-existent email: {$request->email}");
            return response()->json(['message' => 'Si el correo existe, se ha enviado un código.']);
        }

        // Generate 6-digit code
        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        // Store code
        DB::table('password_reset_codes')->updateOrInsert(
            ['email' => $request->email],
            [
                'code' => $code,
                'created_at' => Carbon::now()
            ]
        );

        // In a real app, verify Mail config. For now, we Log the code so developer can see it easily.
        Log::info("PASSWORD RESET CODE for {$request->email}: {$code}");

        // Send email (Mailpit defined in .env)
        Mail::raw("Tu código de recuperación es: {$code}", function ($message) use ($request) {
            $message->to($request->email)->subject('Código de recuperación BBr');
        });

        return response()->json(['message' => 'Código enviado correctamente. Revisad los logs en desarrollo.']);
    }

    // Verify code
    public function verifyResetCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6'
        ]);

        $record = DB::table('password_reset_codes')
            ->where('email', $request->email)
            ->where('code', $request->code)
            ->first();

        // Check validity (e.g. 15 mins)
        if (!$record || Carbon::parse($record->created_at)->addMinutes(15)->isPast()) {
             return response()->json(['message' => 'El código es inválido o ha expirado.'], 422);
        }

        return response()->json(['message' => 'Código válido.']);
    }

    // Reset Password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6',
            'password' => 'required|string|confirmed|min:8',
        ]);

        // Verify again
        $record = DB::table('password_reset_codes')
            ->where('email', $request->email)
            ->where('code', $request->code)
            ->first();

        if (!$record || Carbon::parse($record->created_at)->addMinutes(15)->isPast()) {
             return response()->json(['message' => 'El código es inválido o ha expirado.'], 422);
        }

        // Update User
        $user = User::where('email', $request->email)->first();
        if ($user) {
            $user->password = Hash::make($request->password);
            $user->save();

            // Delete used code
            DB::table('password_reset_codes')->where('email', $request->email)->delete();

            return response()->json(['message' => 'Contraseña restablecida correctamente. Ya puedes iniciar sesión.']);
        }

        return response()->json(['message' => 'Usuario no encontrado.'], 404);
    }
}
