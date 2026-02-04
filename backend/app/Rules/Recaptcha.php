<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Http;

class Recaptcha implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $response = Http::withoutVerifying()->asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => env('RECAPTCHA_SECRET_KEY'),
            'response' => $value,
            'remoteip' => request()->ip(),
        ]);

        \Illuminate\Support\Facades\Log::info("ReCAPTCHA Debug: ", [
            'secret_exists' => !empty(env('RECAPTCHA_SECRET_KEY')),
            'secret_prefix' => substr(env('RECAPTCHA_SECRET_KEY'), 0, 5) . '...',
            'remote_ip' => request()->ip(),
            'google_response' => $response->json(),
        ]);

        if (!$response->json('success')) {
            $fail('La verificación reCAPTCHA falló. Por favor, inténtelo de nuevo.');
        }
    }
}
