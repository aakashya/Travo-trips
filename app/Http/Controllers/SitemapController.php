<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SitemapController extends Controller
{
    // Fixed marketing pages — kept in sync by hand with FIXED_VIEW_PATHS in App.tsx (only the
    // public, indexable ones; account/auth/book-now pages have no reason to be in a sitemap).
    private const STATIC_PATHS = ['/', '/trips', '/team', '/about-us', '/contact-us'];

    public function index(): Response
    {
        $baseUrl = rtrim(config('app.url'), '/');

        $paths = self::STATIC_PATHS;
        foreach (array_keys(config('trips')) as $tripId) {
            $paths[] = "/trips/{$tripId}";
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        foreach ($paths as $path) {
            $loc = $path === '/' ? $baseUrl . '/' : $baseUrl . $path;
            $xml .= '  <url><loc>' . e($loc) . '</loc></url>' . "\n";
        }
        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'application/xml; charset=UTF-8');
    }
}
