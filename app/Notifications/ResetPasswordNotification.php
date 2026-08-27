<?php

namespace App\Notifications;

use App\Mail\ForgotPasswordMail;
use Illuminate\Auth\Notifications\ResetPassword as BaseResetPassword;
use Illuminate\Mail\Mailable;
use Illuminate\Notifications\Notifiable;

class ResetPasswordNotification extends BaseResetPassword
{
    /**
     * Build the branded TRAVO reset-password mail.
     *
     * @param  Notifiable  $notifiable
     */
    public function toMail($notifiable): Mailable
    {
        $resetUrl = rtrim(config('app.url'), '/').'/reset-password?'.http_build_query([
            'token' => $this->token,
            'email' => $notifiable->getEmailForPasswordReset(),
        ]);

        return (new ForgotPasswordMail($notifiable->name, $resetUrl))
            ->to($notifiable->getEmailForPasswordReset());
    }
}
