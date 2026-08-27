<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        // Generated once per request and stashed on the request so the Blade view can stamp the
        // same value onto its two inline <script> tags — see request()->attributes in welcome.blade.php.
        $nonce = base64_encode(random_bytes(16));
        $request->attributes->set('csp_nonce', $nonce);

        $response = $next($request);
        $isLocal = app()->environment('local');

        // CSP is a production concern and is skipped entirely in local dev: Vite's dev-mode
        // module scripts and its inline React-refresh bootstrap snippet are injected by the
        // laravel-vite-plugin's own Blade directives, which can't be made to carry our nonce, and
        // 'strict-dynamic' (needed below for Google Tag Manager) disables host-based allowlisting
        // entirely — the two don't have a clean overlap worth chasing for a dev-only header.
        if (! $isLocal) {
            // 'strict-dynamic' is what makes Google Tag Manager (a script that itself injects
            // further scripts for whatever tags are configured in its dashboard) work under a
            // strict CSP: a script loaded via the nonce is trusted to load further scripts
            // regardless of their own origin. The explicit https: hosts alongside it are the
            // fallback for older browsers that don't understand 'strict-dynamic'.
            $csp = implode('; ', [
                "default-src 'self'",
                "script-src 'self' 'nonce-{$nonce}' 'strict-dynamic' https://www.googletagmanager.com",
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                // GTM/GA4 fall back to plain <img> pixel beacons for some hits (e.g. googletagmanager.com/td)
                // alongside their normal fetch/XHR beacons, so both need to be in img-src too.
                "img-src 'self' data: https://images.unsplash.com https://commons.wikimedia.org https://www.googletagmanager.com https://www.google-analytics.com",
                "font-src 'self' data: https://fonts.gstatic.com",
                "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
                "frame-src https://www.googletagmanager.com",
                "object-src 'none'",
                "base-uri 'self'",
                "form-action 'self'",
                "frame-ancestors 'self'",
            ]);

            $response->headers->set('Content-Security-Policy', $csp);
            // Scoped to this host only (no includeSubDomains) since other subdomains on the same
            // root domain, if any exist, aren't confirmed to be served over HTTPS too.
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000');
        }

        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');

        return $response;
    }
}
