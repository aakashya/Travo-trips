<!doctype html>
<html lang="en">
  <head>
    @php
      // $tripName is passed in by the catch-all route in routes/web.php for a real
      // /trips/{id} page, so a shared link at least gets an accurate title/description —
      // full per-trip images would need trip data available server-side, which today only
      // lives in the TS files, so the OG image stays one strong shared default for now.
      $defaultTitle = 'TRAVO | Curated Group Trips Across India, Nepal & Bhutan';
      $defaultDescription = 'TRAVO curates small-group trips across Andaman, Goa, Nepal, Bhutan, Kerala & the Himalayas — transparent pricing, verified captains, ages 18-35.';
      $pageTitle = isset($tripName) ? "{$tripName} | TRAVO" : $defaultTitle;
      $pageDescription = isset($tripName)
        ? "Book {$tripName} with TRAVO — curated small-group departures, transparent all-inclusive pricing, and 24/7 ground support."
        : $defaultDescription;
      $ogImage = rtrim(config('app.url'), '/') . '/images/og/og-default.jpg';
    @endphp
    <!-- Google Tag Manager -->
    <script nonce="{{ request()->attributes->get('csp_nonce') }}">(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KHMK27LG');</script>
    <!-- End Google Tag Manager -->
    <!-- Google tag (gtag.js) -->
    <script nonce="{{ request()->attributes->get('csp_nonce') }}" async src="https://www.googletagmanager.com/gtag/js?id=G-3TP0L5Z29K"></script>
    <script nonce="{{ request()->attributes->get('csp_nonce') }}">
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-3TP0L5Z29K');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="{{ $pageDescription }}">
    <meta name="theme-color" content="#1c1917">
    <link rel="canonical" href="{{ url()->current() }}">
    <link rel="icon" href="/favicon_io/favicon.ico" sizes="any">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png">
    <link rel="manifest" href="/favicon_io/site.webmanifest">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="TRAVO">
    <meta property="og:locale" content="en_IN">
    <meta property="og:title" content="{{ $pageTitle }}">
    <meta property="og:description" content="{{ $pageDescription }}">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:image" content="{{ $ogImage }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $pageTitle }}">
    <meta name="twitter:description" content="{{ $pageDescription }}">
    <meta name="twitter:image" content="{{ $ogImage }}">

    @if (request()->is('/'))
      <link rel="preload" as="video" type="video/mp4" href="/images/hero/travo-hero-mobile-720p.mp4" media="(max-width: 767px)" fetchpriority="high">
      <link rel="preload" as="video" type="video/mp4" href="/images/hero/travo-hero-720p.m4v" media="(min-width: 768px) and (max-width: 1023px)" fetchpriority="high">
      <link rel="preload" as="video" type="video/mp4" href="/images/hero/travo-hero.m4v" media="(min-width: 1024px)" fetchpriority="high">
    @endif
    <title>{{ $pageTitle }}</title>
    @viteReactRefresh
    @vite('resources/js/src/main.tsx')
  </head>
  <body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KHMK27LG"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <div id="root"></div>
  </body>
</html>
