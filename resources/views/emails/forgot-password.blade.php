<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset your TRAVO password</title>
</head>
<body style="margin:0; padding:0; background-color:#F3F1EC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F1EC; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; background-color:#ffffff; border-radius:24px; overflow:hidden; border:1px solid #E5E2DA;">

          <!-- Header banner -->
          <tr>
            <td style="background-color:#181411; padding:32px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#9C753B; border-radius:6px; padding:6px 10px;">
                    <span style="color:#ffffff; font-family: 'Courier New', Courier, monospace; font-weight:800; font-size:13px; letter-spacing:1.5px;">TRAVO</span>
                  </td>
                  <td style="padding-left:10px;">
                    <span style="color:#9a938a; font-family: 'Courier New', Courier, monospace; font-weight:700; font-size:10px; letter-spacing:2px; text-transform:uppercase;">Customer Portal</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 36px 8px 36px;">
              <p style="margin:0 0 4px 0; font-size:11px; font-weight:800; letter-spacing:2px; text-transform:uppercase; color:#9C753B;">Password Reset Requested</p>
              <h1 style="margin:0 0 20px 0; font-size:24px; line-height:1.3; font-weight:900; color:#181411; letter-spacing:-0.3px;">Let's get you back into your account.</h1>

              <p style="margin:0 0 16px 0; font-size:14px; line-height:1.7; color:#4b4741;">
                Hi {{ $recipientName }},
              </p>
              <p style="margin:0 0 24px 0; font-size:14px; line-height:1.7; color:#4b4741;">
                We received a request to reset the password for your TRAVO account. Click the button below to choose a new password. This link is valid for the next <strong>{{ $expiresInMinutes }} minutes</strong>.
              </p>

              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px 0;">
                <tr>
                  <td style="border-radius:14px; background-color:#9C753B;">
                    <a href="{{ $resetUrl }}" target="_blank" style="display:inline-block; padding:14px 32px; font-size:13px; font-weight:800; letter-spacing:1px; text-transform:uppercase; color:#ffffff; text-decoration:none;">
                      Reset My Password
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px 0; font-size:12px; line-height:1.7; color:#918c84;">
                Button not working? Copy and paste this link into your browser:<br>
                <a href="{{ $resetUrl }}" style="color:#9C753B; word-break:break-all;">{{ $resetUrl }}</a>
              </p>

              <div style="padding:16px 18px; background-color:#FAF7F0; border:1px solid #EFE9DC; border-radius:14px; margin-bottom:8px;">
                <p style="margin:0; font-size:12px; line-height:1.6; color:#6b665e;">
                  If you didn't request a password reset, you can safely ignore this email — your password will remain unchanged.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 36px 32px 36px; border-top:1px solid #EFEBE2;">
              <p style="margin:0 0 4px 0; font-size:11px; font-weight:800; letter-spacing:1px; text-transform:uppercase; color:#181411;">TRAVO Expeditions Guest Care</p>
              <p style="margin:0; font-size:12px; line-height:1.7; color:#918c84;">
                Need help? Write to us at <a href="mailto:hello@travotrips.com" style="color:#9C753B; text-decoration:none;">hello@travotrips.com</a>
              </p>
            </td>
          </tr>

        </table>

        <p style="max-width:520px; margin:20px auto 0 auto; font-size:11px; line-height:1.6; color:#a39d93; text-align:center;">
          &copy; {{ date('Y') }} TRAVO Trips. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
