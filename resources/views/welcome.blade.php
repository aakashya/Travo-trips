@php
    $heroBgImage = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85';
    $campImage = 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=2200&q=85';

    $routeStops = [
        [
            'id' => 'delhi',
            'name' => 'Delhi',
            'coords' => ['x' => 8, 'y' => 78],
            'description' => 'The group gathers at the metro gate, bags loaded, music ready, and the first round of introductions starts before the highway opens.',
            'tag' => 'Night boarding',
            'altitude' => '709',
        ],
        [
            'id' => 'murtal',
            'name' => 'Murthal',
            'coords' => ['x' => 24, 'y' => 62],
            'description' => 'A late night dhaba halt for chai, parathas, and the first proper ice breaker before the plains start giving way to hills.',
            'tag' => 'Highway halt',
            'altitude' => '748',
        ],
        [
            'id' => 'manali',
            'name' => 'Manali',
            'coords' => ['x' => 42, 'y' => 38],
            'description' => 'Pine air, wooden cafes, mall road strolls, and warm stay check-ins mark the first mountain chapter of the escape.',
            'tag' => 'Local vibe',
            'altitude' => '6,726',
        ],
        [
            'id' => 'solang',
            'name' => 'Solang',
            'coords' => ['x' => 56, 'y' => 24],
            'description' => 'Snow slides, optional adventure sports, and panoramic valley views turn the trip into a proper high-altitude playground.',
            'tag' => 'Adventure slope',
            'altitude' => '8,400',
        ],
        [
            'id' => 'kasol',
            'name' => 'Kasol',
            'coords' => ['x' => 76, 'y' => 48],
            'description' => 'The Parvati Valley slows everything down with riverside camps, pine trails, cafe hopping, DJ energy, and bonfire warmth.',
            'tag' => 'Riverside camp',
            'altitude' => '5,182',
        ],
        [
            'id' => 'manikaran',
            'name' => 'Manikaran',
            'coords' => ['x' => 90, 'y' => 28],
            'description' => 'A calm spiritual stop with hot springs and Gurudwara visit before the loop bends back toward the return road.',
            'tag' => 'Hot springs',
            'altitude' => '5,774',
        ],
    ];

    $roadPath = collect($routeStops)
        ->map(fn ($stop, $index) => ($index === 0 ? 'M' : 'L').' '.$stop['coords']['x'].' '.$stop['coords']['y'])
        ->implode(' ');

    $timelineItems = [
        [
            'day' => 'Day 0',
            'title' => 'Delhi Departure and Overnight Highway Run',
            'quote' => 'The first playlist made strangers feel like a crew.',
            'image' => 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80',
            'highlights' => [
                'Evening assembly at New Delhi Metro Gate 1 with captain briefing.',
                'Overnight AC Tempo Traveller journey toward Himachal.',
                'Highway dinner and chai break for introductions.',
            ],
        ],
        [
            'day' => 'Day 1',
            'title' => 'Manali Arrival, Local Streets, and Bonfire Evening',
            'quote' => 'Cold air, hot food, and cafes that felt like cabins.',
            'image' => 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
            'highlights' => [
                'Check-in, freshen up, and lunch at the stay.',
                'Old Manali cafe walk, Hadimba side visit, and market time.',
                'Dinner with music, games, and bonfire bonding.',
            ],
        ],
        [
            'day' => 'Day 2',
            'title' => 'Solang Valley Snow Adventures',
            'quote' => 'The snow did not care who knew each other yesterday.',
            'image' => 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80',
            'highlights' => [
                'Breakfast and transfer to Solang Valley or snow point as per conditions.',
                'Optional skiing, ATV, zipline, tube slide, and photography.',
                'Return to Manali for dinner and open-floor group night.',
            ],
        ],
        [
            'day' => 'Day 3',
            'title' => 'Kasol Riverside Camps and Parvati Valley Party',
            'quote' => 'The river kept time while the campfire kept us awake.',
            'image' => 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1400&q=80',
            'highlights' => [
                'Scenic transfer through Kullu toward Kasol.',
                'Cafe hopping, flea lanes, river walk, and campsite check-in.',
                'Riverside DJ, bonfire, buffet dinner, and stargazing.',
            ],
        ],
        [
            'day' => 'Day 4',
            'title' => 'Manikaran Hot Springs and Overnight Return',
            'quote' => 'The quiet morning gave the loud memories a place to settle.',
            'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
            'highlights' => [
                'Morning visit to Manikaran Gurudwara and hot springs.',
                'Lunch, photo time, and return departure toward Delhi.',
                'Overnight drive with comfort halts and captain support.',
            ],
        ],
        [
            'day' => 'Day 5',
            'title' => 'Delhi Arrival with a New Travel Circle',
            'quote' => 'The trip ended, but the group chat did not.',
            'image' => 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
            'highlights' => [
                'Early morning Delhi drop at the same assembly zone.',
                'Digital memory folder sharing and feedback collection.',
                'Future batch invites for the next mountain chapter.',
            ],
        ],
    ];

    $experienceMoments = [
        ['id' => 'snow', 'title' => 'Snow slopes with thrill-ready captains', 'tag' => 'Solang energy', 'image' => 'https://images.unsplash.com/photo-1551524164-6cf2ac89e4d1?auto=format&fit=crop&w=900&q=80', 'icon' => 'snowflake'],
        ['id' => 'cafes', 'title' => 'Old Manali cafe hopping and street walks', 'tag' => 'Cafe culture', 'image' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80', 'icon' => 'coffee'],
        ['id' => 'camp', 'title' => 'Riverside camping beside pine shadows', 'tag' => 'Parvati nights', 'image' => 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80', 'icon' => 'tent'],
        ['id' => 'bonfire', 'title' => 'Bonfire, DJ, games, and stranger bonding', 'tag' => 'Campfire social', 'image' => 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=900&q=80', 'icon' => 'flame'],
    ];

    $inclusions = [
        ['text' => 'AC Tempo Traveller transport from Delhi and back.', 'icon' => 'bus'],
        ['text' => 'Hotel stay in Manali on sharing basis.', 'icon' => 'hotel'],
        ['text' => 'Riverside camp stay in Kasol with bedding.', 'icon' => 'tent'],
        ['text' => 'Meals as per itinerary with hygienic buffet setup.', 'icon' => 'utensils'],
        ['text' => 'Local transfers for Manali, Solang, Kasol, and Manikaran.', 'icon' => 'mountain'],
        ['text' => 'Bonfire night with music and group activities.', 'icon' => 'flame'],
        ['text' => 'DJ vibe night at the Kasol campsite.', 'icon' => 'music'],
        ['text' => 'Trip captains, ground assistance, and verified vendors.', 'icon' => 'user-check'],
        ['text' => 'Tolls, parking, driver charges, and green taxes included.', 'icon' => 'receipt'],
    ];

    $exclusions = [
        ['text' => 'Adventure activity tickets such as paragliding, skiing, ATV, ropeway, or rafting.'],
        ['text' => 'Personal shopping, cafe bills, laundry, room heater upgrades, or snacks outside the meal plan.'],
        ['text' => 'Any extra stay, route change, or vehicle cost caused by weather, landslides, closures, or personal delay.'],
        ['text' => 'Medical expenses, travel insurance, and costs for guests choosing to separate from the group.'],
        ['text' => 'Anything not clearly listed in the included pass perks.'],
    ];

    $packingChecklist = [
        ['category' => 'Warm Layers', 'items' => ['Thermal innerwear', 'Puffer or padded jacket', 'Woollen cap and muffler', 'Warm socks set', 'Gloves for snow']],
        ['category' => 'Footwear', 'items' => ['Comfortable trekking shoes', 'Extra slippers', 'Waterproof shoe cover', 'Small towel', 'Reusable laundry pouch']],
        ['category' => 'Travel Basics', 'items' => ['Government ID proof', 'Power bank', 'Phone charger', 'Sunglasses', 'Small backpack']],
        ['category' => 'Health Kit', 'items' => ['Personal medicines', 'Motion sickness tablet', 'Moisturizer and lip balm', 'Sunscreen SPF 50', 'Sanitizer']],
        ['category' => 'Camp Essentials', 'items' => ['Reusable water bottle', 'Torch or headlamp', 'Quick snacks', 'Reusable cutlery', 'Dry bag for electronics']],
        ['category' => 'Optional Add-ons', 'items' => ['Camera memory card', 'Bluetooth speaker', 'Board or card game', 'Small notebook', 'Trip flag or prop']],
    ];

    $termsAccordion = [
        ['title' => 'Booking and slot confirmation', 'content' => 'Seats are confirmed only after the booking amount is received and the traveler details are verified by the Travo team. Sharing preferences are honored where possible but depend on group mix and room availability.'],
        ['title' => 'Cancellation and refund policy', 'content' => 'Bookings are transferable with advance notice. Refunds depend on the cancellation window because stays, vehicle slots, and camp inventory are blocked in advance for each batch.'],
        ['title' => 'Weather and route changes', 'content' => 'Mountain routes can change because of snow, rain, landslides, permits, or police instructions. The captain may adjust the route, sequence, or activity plan to keep the batch safe and moving.'],
        ['title' => 'Safety and group discipline', 'content' => 'Guests must follow captain instructions, avoid risky solo movement, respect local communities, and keep the campsite clean. Any unsafe or abusive behavior can lead to removal from the trip without refund.'],
        ['title' => 'Health and fitness advisory', 'content' => 'This is a road and mountain trip with cold nights, altitude changes, and long drives. Travelers with medical conditions should consult a doctor before booking and must carry their required medication.'],
    ];

    $storyChapters = [
        ['title' => 'Delhi Departure', 'subtitle' => 'Strangers assemble as night falls', 'desc' => 'Warm handshakes, board the traveler, and hit the highway with upbeat tracks playing.', 'icon' => 'compass', 'color' => 'border-amber-500/20 bg-amber-500/5 text-amber-300'],
        ['title' => 'Manali Local Vibe', 'subtitle' => 'Cafe hopping and bonfire jams', 'desc' => 'Old Manali streets, steaming thukpa, cozy wooden cafes, and stories by the fire.', 'icon' => 'smile', 'color' => 'border-sky-500/20 bg-sky-500/5 text-sky-300'],
        ['title' => 'Snow Adventures', 'subtitle' => 'High altitudes and pure adrenaline', 'desc' => 'Solang slopes and Rohtang views with sliding, skiing, and freezing mountain laughs.', 'icon' => 'sparkles', 'color' => 'border-yellow-500/20 bg-yellow-500/5 text-yellow-300'],
        ['title' => 'Kasol Riverside Camps', 'subtitle' => 'DJ nights under starry pinewoods', 'desc' => 'Warm camps along Parvati river with beats, hot buffet food, and late-night circles.', 'icon' => 'layers', 'color' => 'border-emerald-500/20 bg-emerald-500/5 text-emerald-300'],
        ['title' => 'Manikaran Visit', 'subtitle' => 'Spiritual detox and hot springs', 'desc' => 'A calming morning walk into the Gurudwara and natural geothermal pools.', 'icon' => 'map-pin', 'color' => 'border-pink-500/20 bg-pink-500/5 text-pink-300'],
        ['title' => 'Return with Memories', 'subtitle' => 'Strangers leave as long-term friends', 'desc' => 'An overnight return journey filled with shared laughter, memory cards, and group bonds.', 'icon' => 'heart', 'color' => 'border-red-500/20 bg-red-500/5 text-red-300'],
    ];

    $totalItemsCount = collect($packingChecklist)->sum(fn ($group) => count($group['items']));

    $icon = function (string $name, string $class = 'w-5 h-5'): string {
        $class = e($class);
        $paths = [
            'alert' => '<path d="M10.3 3.3 2.6 16.7A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-3.3L13.7 3.3a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
            'bus' => '<path d="M6 3h12a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"/><path d="M7 18v2"/><path d="M17 18v2"/><path d="M3 10h18"/><path d="M7 14h.01"/><path d="M17 14h.01"/>',
            'calendar' => '<path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 9h18"/><rect x="3" y="4" width="18" height="18" rx="3"/>',
            'check' => '<path d="m20 6-11 11-5-5"/>',
            'chevron-down' => '<path d="m6 9 6 6 6-6"/>',
            'chevron-left' => '<path d="m15 18-6-6 6-6"/>',
            'chevron-right' => '<path d="m9 18 6-6-6-6"/>',
            'clock' => '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
            'coffee' => '<path d="M4 7h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z"/><path d="M16 8h2a3 3 0 0 1 0 6h-2"/><path d="M6 2v2"/><path d="M10 2v2"/><path d="M14 2v2"/>',
            'compass' => '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8Z"/>',
            'download' => '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
            'eye' => '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
            'flame' => '<path d="M12 22c4 0 7-3 7-7 0-3-1.6-5.5-4.3-7.6.2 2.1-.6 3.4-2 4.1.1-3-1.4-5.4-4.2-7.5.3 3.8-3.5 5.9-3.5 10.8C5 18.5 8 22 12 22Z"/>',
            'footprints' => '<path d="M6.5 14.5c1.7.5 2.5 1.7 2.2 3.1-.3 1.3-1.6 2.1-3.1 1.7-1.5-.4-2.4-1.6-2.1-3 .3-1.5 1.3-2.3 3-1.8Z"/><path d="M17.5 4.5c1.7.5 2.5 1.7 2.2 3.1-.3 1.3-1.6 2.1-3.1 1.7-1.5-.4-2.4-1.6-2.1-3 .3-1.5 1.3-2.3 3-1.8Z"/><path d="M8 9h.01"/><path d="M10 7h.01"/><path d="M12 6h.01"/><path d="M16 15h.01"/><path d="M14 17h.01"/><path d="M12 18h.01"/>',
            'heart' => '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>',
            'help' => '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.8 2.8 0 0 1 5 1.7c0 2-2.5 2.2-2.5 4.3"/><path d="M12 18h.01"/>',
            'hotel' => '<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M16 9h2a2 2 0 0 1 2 2v10"/><path d="M8 7h.01"/><path d="M12 7h.01"/><path d="M8 11h.01"/><path d="M12 11h.01"/><path d="M2 21h20"/>',
            'layers' => '<path d="m12 2 9 5-9 5-9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
            'luggage' => '<path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><rect x="5" y="6" width="14" height="15" rx="2"/><path d="M9 10v7"/><path d="M15 10v7"/>',
            'map-pin' => '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
            'message' => '<path d="M21 12a8 8 0 0 1-8 8H7l-4 3 1.3-5A8 8 0 1 1 21 12Z"/>',
            'minus' => '<path d="M5 12h14"/>',
            'mountain' => '<path d="m3 20 7-14 4 8 2-4 5 10Z"/><path d="m10 6 2 4 2-2"/>',
            'music' => '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
            'pause' => '<path d="M8 5v14"/><path d="M16 5v14"/>',
            'play' => '<path d="m8 5 11 7-11 7Z"/>',
            'plus' => '<path d="M12 5v14"/><path d="M5 12h14"/>',
            'quote' => '<path d="M7 17a4 4 0 0 1-4-4V7h6v6H6a2 2 0 0 0 2 2Z"/><path d="M18 17a4 4 0 0 1-4-4V7h6v6h-3a2 2 0 0 0 2 2Z"/>',
            'receipt' => '<path d="M5 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1V2Z"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h5"/>',
            'rotate' => '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v6h6"/>',
            'shield' => '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
            'smile' => '<circle cx="12" cy="12" r="9"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 15s1.5 2 4 2 4-2 4-2"/>',
            'snowflake' => '<path d="M12 2v20"/><path d="m4.9 4.9 14.2 14.2"/><path d="M2 12h20"/><path d="m4.9 19.1 14.2-14.2"/><path d="m8 2 4 4 4-4"/><path d="m8 22 4-4 4 4"/>',
            'sparkles' => '<path d="M12 3 14 9l6 2-6 2-2 6-2-6-6-2 6-2Z"/><path d="M19 3v4"/><path d="M21 5h-4"/><path d="M5 17v3"/><path d="M6.5 18.5h-3"/>',
            'star' => '<path d="m12 2 3 6 6.5.9-4.7 4.6 1.1 6.5-5.9-3.1L6.1 20l1.1-6.5L2.5 8.9 9 8Z"/>',
            'sun' => '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.9 19.1 1.4-1.4"/><path d="m17.7 6.3 1.4-1.4"/>',
            'tent' => '<path d="M3 20 12 4l9 16Z"/><path d="M12 4v16"/><path d="m8 20 4-7 4 7"/>',
            'ticket' => '<path d="M3 9a3 3 0 0 0 0 6v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a3 3 0 0 0 0-6V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z"/><path d="M13 5v14"/>',
            'timer' => '<path d="M10 2h4"/><path d="M12 14l3-3"/><circle cx="12" cy="14" r="8"/>',
            'user-check' => '<path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="m17 11 2 2 4-4"/>',
            'users' => '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.8"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
            'utensils' => '<path d="M4 2v8"/><path d="M8 2v8"/><path d="M6 2v20"/><path d="M14 2v20"/><path d="M14 2c4 2 5 7 1 10"/>',
            'x' => '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
            'x-circle' => '<circle cx="12" cy="12" r="9"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
        ];

        return '<svg xmlns="http://www.w3.org/2000/svg" class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'.($paths[$name] ?? $paths['compass']).'</svg>';
    };
@endphp

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="TRAVO Trips Manali Kasol escape single page itinerary, inclusions, checklist, and booking.">
        <title>TRAVO Trips - Manali Kasol Escape</title>

        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="bg-[#050B14] text-white antialiased">
        <main id="travo-page" class="min-h-screen bg-[#050B14] text-white selection:bg-amber-400 selection:text-black overflow-x-hidden">
            <section id="hero" class="relative min-h-screen w-full overflow-hidden bg-black flex flex-col justify-between text-white">
                <div
                    id="hero-parallax"
                    class="absolute inset-0 bg-cover bg-center select-none pointer-events-none transition-transform duration-700 ease-out scale-105"
                    style="background-image: url('{{ $heroBgImage }}');"
                ></div>
                <div class="absolute inset-0 bg-gradient-to-t from-[#050B14] via-black/20 to-black/60 pointer-events-none"></div>
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(5,11,20,0.1)_0%,rgba(0,0,0,0.75)_100%)] pointer-events-none"></div>
                <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                    <div class="absolute w-[200%] h-1/2 -top-10 left-[-50%] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-3xl animate-[pulse_12s_infinite]"></div>
                </div>
                <div class="absolute inset-0 pointer-events-none opacity-40">
                    <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                    <div class="absolute top-[15%] right-1/3 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-[pulse_3s_infinite]"></div>
                    <div class="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-[pulse_4s_infinite]"></div>
                    <div class="absolute top-[40%] left-1/5 w-1 h-1 bg-yellow-200 rounded-full animate-pulse"></div>
                </div>

                <header class="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between pointer-events-auto">
                    <a href="#hero" class="flex items-center space-x-2">
                        <span class="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-black text-black tracking-widest text-lg shadow-lg shadow-amber-500/20">T</span>
                        <span class="text-2xl font-black tracking-wider text-white">TRAVO<span class="text-amber-400">.</span></span>
                    </a>
                    <nav class="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wider text-gray-300">
                        <a href="#itinerary" class="hover:text-amber-400 transition-colors">ITINERARY</a>
                        <a href="#experiences" class="hover:text-amber-400 transition-colors">THE VIBES</a>
                        <a href="#whats-included" class="hover:text-amber-400 transition-colors">COVERS</a>
                        <a href="#checklist" class="hover:text-amber-400 transition-colors">CHECKLIST</a>
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold animate-pulse">
                            {!! $icon('flame', 'w-3.5 h-3.5') !!} NEXT TRIP SEAT RESERVED: 82%
                        </span>
                    </nav>
                    <button type="button" data-open-booking class="px-5 py-2 text-xs uppercase tracking-wider font-bold text-black bg-amber-400 hover:bg-amber-300 transition-all rounded-full hover:scale-105 active:scale-95 shadow-md shadow-amber-400/20">
                        Book Now
                    </button>
                </header>

                <div class="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 flex-grow mb-12 my-auto">
                    <div class="w-full lg:w-3/5 text-left space-y-6">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold tracking-wider text-amber-400 animate-[bounce_3s_infinite]">
                            HIGH ALTITUDE GROUP ESCAPE
                        </div>

                        <h1 class="text-5xl md:text-7xl xl:text-8xl font-black tracking-tight leading-tight select-none">
                            MANALI <br>
                            <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">KASOL</span>
                            ESCAPE
                        </h1>

                        <p class="text-xl md:text-2xl font-bold text-gray-200 border-l-4 border-amber-400 pl-4 py-1">
                            "From Delhi roads to Himalayan nights."
                        </p>

                        <p class="text-sm md:text-base text-gray-300 max-w-lg leading-relaxed font-light">
                            Snow adventures, cafe hopping, riverside camps, bonfire nights, DJ vibes, and unforgettable mountain memories. Specially mapped for wild souls and road trippers.
                        </p>

                        <div class="pt-4 flex flex-wrap gap-4 items-center">
                            <button type="button" data-open-booking class="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 text-black font-extrabold uppercase text-sm tracking-wider rounded-full shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 transition-all">
                                Secure Your Seat
                            </button>
                            <button type="button" data-scroll-target="#chapter-intro" class="px-6 py-4 border border-white/20 bg-white/5 hover:bg-white/15 text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all flex items-center gap-2">
                                Explore the Journey
                            </button>
                        </div>
                    </div>

                    <div class="w-full sm:w-4/5 lg:w-[380px] p-[1px] rounded-3xl bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-2xl backdrop-blur-xl">
                        <div class="p-6 rounded-3xl bg-[#090D16]/80 text-left space-y-6">
                            <div class="flex justify-between items-center pb-2 border-b border-white/10">
                                <span class="text-xs font-semibold text-gray-400 uppercase tracking-widest">Trip Pass Specifications</span>
                                <span class="px-2 py-0.5 rounded text-[10px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase animate-pulse">Deluxe Batch</span>
                            </div>

                            <div class="flex items-start gap-3">
                                <div class="p-2.5 rounded-xl bg-white/5 text-amber-400">{!! $icon('compass', 'w-5 h-5 animate-spin') !!}</div>
                                <div>
                                    <p class="text-[10px] uppercase font-bold tracking-wider text-gray-400">Route Map</p>
                                    <p class="text-base font-extrabold text-white">Delhi to Kasol Loop</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3">
                                <div class="p-2.5 rounded-xl bg-white/5 text-amber-400">{!! $icon('calendar', 'w-5 h-5') !!}</div>
                                <div>
                                    <p class="text-[10px] uppercase font-bold tracking-wider text-gray-400">Upcoming Batch</p>
                                    <p class="text-base font-extrabold text-white">10 June 2026</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3">
                                <div class="p-2.5 rounded-xl bg-white/5 text-amber-400">{!! $icon('timer', 'w-5 h-5') !!}</div>
                                <div>
                                    <p class="text-[10px] uppercase font-bold tracking-wider text-gray-400">Journey Span</p>
                                    <p class="text-base font-extrabold text-white font-mono">4 Nights / 5 Days</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3">
                                <div class="p-2.5 rounded-xl bg-white/5 text-amber-400">{!! $icon('users', 'w-5 h-5') !!}</div>
                                <div>
                                    <p class="text-[10px] uppercase font-bold tracking-wider text-gray-400">Experience Type</p>
                                    <p class="text-base font-extrabold text-white">Group Trip (Ages 18-35)</p>
                                </div>
                            </div>

                            <div class="bg-white/5 p-4 rounded-2xl flex justify-between items-center border border-white/5">
                                <div>
                                    <p class="text-[10px] text-gray-400 uppercase font-semibold">Starting Point Fare</p>
                                    <p class="text-xl font-black text-white">&#8377;6,999 <span class="text-xs font-normal text-gray-400">/ traveler</span></p>
                                </div>
                                <span class="text-[11px] font-bold text-teal-400 bg-teal-400/10 px-2 py-1 rounded border border-teal-400/20">All Included</span>
                            </div>

                            <button type="button" data-open-booking class="w-full py-4 text-center bg-amber-400 hover:bg-amber-300 transition-all font-black text-xs uppercase tracking-widest text-black rounded-2xl shadow-lg hover:shadow-amber-400/25 active:scale-[0.98]">
                                Book Your Seat
                            </button>
                        </div>
                    </div>
                </div>

                <button type="button" data-scroll-target="#chapter-intro" class="relative z-20 pb-6 text-center cursor-pointer flex flex-col items-center gap-1 hover:text-amber-400 transition-colors animate-bounce mx-auto">
                    <span class="text-[10px] uppercase tracking-widest font-extrabold text-gray-400">Scroll to unveil story</span>
                    {!! $icon('chevron-down', 'w-4 h-4 text-amber-400') !!}
                </button>
            </section>

            <section id="chapter-intro" class="relative bg-[#050B14] py-24 md:py-32 px-6 overflow-hidden">
                <div class="absolute top-1/4 left-0 w-96 h-96 bg-[#00f2fe]/5 rounded-full filter blur-3xl pointer-events-none"></div>
                <div class="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

                <div class="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
                    <div class="flex flex-col justify-center space-y-8">
                        <div class="space-y-4">
                            <span class="text-xs uppercase tracking-widest font-black text-amber-400">TRAVO PHILOSOPHY</span>
                            <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                                Not just a trip.<br>
                                <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">A mountain story.</span>
                            </h2>
                        </div>

                        <p class="text-lg text-gray-300 font-medium leading-relaxed">
                            Every travel company sells tickets, stays, and checklists of standard landmarks. We do not check boxes. We write chapters.
                        </p>

                        <div class="space-y-6 text-gray-400 text-sm md:text-base leading-relaxed font-light">
                            <p>Your adventure starts in the concrete corridors of Delhi, boarding structured wheels alongside total strangers. As highways turn into pine-framed curves, quiet seatmates become code-sharers, inside-joke makers, and adventure partners.</p>
                            <p>By the time you feel Solang's snow slopes, dip into Parvati Valley's ancient rivers, and huddle around Kasol's midnight bonfires, you realize it was never only about coordinates on a map. It is about raw freedom, late-night guitar chords, shared momos, and the family you choose along the way.</p>
                        </div>

                        <div class="pt-4 grid grid-cols-2 gap-6 border-t border-white/5">
                            <div class="space-y-1">
                                <p class="text-3xl font-black text-white font-mono">18-35</p>
                                <p class="text-xs text-amber-400 font-semibold uppercase tracking-widest">Target Aged Crowd</p>
                            </div>
                            <div class="space-y-1">
                                <p class="text-3xl font-black text-white font-mono">100%</p>
                                <p class="text-xs text-amber-400 font-semibold uppercase tracking-widest">Curated Strangers Vibe</p>
                            </div>
                        </div>
                    </div>

                    <div class="relative flex flex-col justify-center space-y-4">
                        <div class="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-amber-500/50 via-sky-500/50 to-red-500/50 pointer-events-none hidden sm:block"></div>
                        <p class="text-xs font-bold text-gray-500 tracking-widest uppercase mb-2 pl-2">STORY STORYBOARD BEATS:</p>

                        @foreach ($storyChapters as $index => $chapter)
                            <article class="group relative flex flex-col sm:flex-row items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-300">
                                <div class="z-10 flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300 {{ $chapter['color'] }}">
                                    {!! $icon($chapter['icon'], 'w-5 h-5') !!}
                                </div>
                                <div class="space-y-1">
                                    <div class="flex flex-wrap items-baseline gap-2">
                                        <h3 class="text-base font-extrabold text-white group-hover:text-amber-400 transition-colors">{{ $chapter['title'] }}</h3>
                                        <span class="text-[10px] font-medium text-amber-300/60 font-mono uppercase">Stage {{ $index + 1 }}</span>
                                    </div>
                                    <p class="text-xs font-bold text-gray-400">{{ $chapter['subtitle'] }}</p>
                                    <p class="text-xs text-gray-400 leading-relaxed pt-1 font-light">{{ $chapter['desc'] }}</p>
                                </div>
                            </article>
                        @endforeach
                    </div>
                </div>
            </section>

            <section id="itinerary" class="relative bg-[#090D16] py-24 px-6 border-t border-b border-white/5 overflow-hidden text-white">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl pointer-events-none"></div>
                <script type="application/json" id="route-stops-data">@json($routeStops)</script>

                <div class="relative z-10 max-w-7xl mx-auto space-y-12">
                    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div class="space-y-4">
                            <span class="text-xs uppercase tracking-widest font-black text-amber-400">INTERACTIVE STORYBOARD</span>
                            <h2 class="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                                Follow the Route: <br class="sm:hidden">
                                <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-white">Delhi to Kasol</span>
                            </h2>
                            <p class="text-sm text-gray-400 max-w-xl">Each clickable marker represents a milestone on our route. Toggle Auto Drive to sit back and watch the traveller move across the Himalayan loop.</p>
                        </div>

                        <button type="button" data-route-autoplay class="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-extrabold transition-all border bg-white/5 text-white border-white/10 hover:bg-white/10">
                            <span data-route-autoplay-icon>{!! $icon('play', 'w-4 h-4 text-amber-400') !!}</span>
                            <span data-route-autoplay-label>Auto Drive Tour</span>
                        </button>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div class="lg:col-span-7 bg-[#050B14]/60 border border-white/5 rounded-3xl p-6 sm:p-10 relative overflow-hidden h-[300px] sm:h-[450px]">
                            <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                            <div class="absolute -bottom-2 right-4 -left-4 h-32 bg-[radial-gradient(ellipse_at_bottom,rgba(255,191,0,0.06)_0%,transparent_70%)] pointer-events-none"></div>

                            <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M 0 60 Q 30 45 50 65 T 100 50" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"></path>
                                <path d="M 0 75 Q 20 60 40 80 T 100 70" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="0.5"></path>
                                <path d="{{ $roadPath }}" fill="none" stroke="url(#line-grad)" stroke-width="1.5" stroke-dasharray="3, 2" class="animate-road-dash" style="stroke-linecap: round; stroke-linejoin: round;"></path>
                                <defs>
                                    <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stop-color="#d97706" stop-opacity="0.8"></stop>
                                        <stop offset="50%" stop-color="#f59e0b" stop-opacity="0.9"></stop>
                                        <stop offset="100%" stop-color="#10b981" stop-opacity="0.8"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>

                            @foreach ($routeStops as $index => $stop)
                                <button
                                    type="button"
                                    data-route-index="{{ $index }}"
                                    class="route-stop absolute group -translate-x-1/2 -translate-y-1/2 flex flex-col items-center focus:outline-none transition-all z-20 {{ $index === 0 ? 'is-active' : '' }}"
                                    style="left: {{ $stop['coords']['x'] }}%; top: {{ $stop['coords']['y'] }}%;"
                                >
                                    <span class="route-aura absolute w-8 h-8 rounded-full border border-amber-400/30 -mt-0.5 scale-75 filter blur-[2px] bg-white/5"></span>
                                    <span class="route-pin relative w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-md bg-[#090D16] border-amber-400 group-hover:bg-amber-500/20 group-hover:scale-110">
                                        <span class="route-pin-dot w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                    </span>
                                    <span class="route-label mt-2 px-2.5 py-1 text-[9px] uppercase tracking-wider font-extrabold rounded-lg whitespace-nowrap transition-all duration-200 border bg-black/80 text-gray-400 border-white/5 opacity-0 sm:opacity-50 group-hover:opacity-100 group-hover:text-white">
                                        {{ $stop['name'] }}
                                    </span>
                                </button>
                            @endforeach

                            <div data-route-van class="absolute z-30 flex items-center justify-center w-12 h-12 rounded-full bg-amber-400 text-black shadow-xl shadow-amber-400/30 transition-all duration-1000 ease-in-out -translate-x-1/2 -translate-y-1/2 border-2 border-white pointer-events-none" style="left: {{ $routeStops[0]['coords']['x'] }}%; top: {{ $routeStops[0]['coords']['y'] }}%;">
                                {!! $icon('bus', 'w-5 h-5 animate-pulse') !!}
                                <div class="absolute -inset-1 rounded-full border border-dashed border-amber-400 animate-spin" style="animation-duration: 6s;"></div>
                            </div>

                            <div class="absolute bottom-4 left-4 p-3 bg-black/60 border border-white/5 backdrop-blur-md rounded-xl text-[10px] space-y-1 font-mono uppercase tracking-widest text-gray-400 pointer-events-none">
                                <div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-sm bg-amber-400 block"></span><span>TRAVO Traveller Van</span></div>
                                <div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-sm bg-gradient-to-r from-amber-400 to-emerald-400 block"></span><span>Trip Highway Route</span></div>
                            </div>
                        </div>

                        <div class="lg:col-span-5 space-y-6">
                            <div class="p-7 sm:p-9 rounded-3xl bg-white/[0.02] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[320px]">
                                <div class="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full filter blur-2xl"></div>
                                <div class="space-y-4">
                                    <div class="flex justify-between items-center">
                                        <span data-route-tag class="text-xs font-black text-amber-400 uppercase tracking-widest font-mono">{{ $routeStops[0]['tag'] }}</span>
                                        <span data-route-count class="text-xs text-gray-500 font-bold font-mono">STOP 1 / {{ count($routeStops) }}</span>
                                    </div>
                                    <h3 data-route-name class="text-3xl font-black text-white tracking-tight">{{ $routeStops[0]['name'] }}</h3>
                                    <p data-route-description class="text-sm text-gray-300 leading-relaxed font-light">{{ $routeStops[0]['description'] }}</p>
                                </div>

                                <div class="pt-6 border-t border-white/5 flex items-center justify-between">
                                    <div class="flex gap-2">
                                        <button type="button" data-route-prev class="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-white border border-white/10" title="Previous Stop">
                                            {!! $icon('chevron-left', 'w-4 h-4') !!}
                                        </button>
                                        <button type="button" data-route-next class="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-white border border-white/10" title="Next Stop">
                                            {!! $icon('chevron-right', 'w-4 h-4') !!}
                                        </button>
                                    </div>

                                    <span class="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                                        {!! $icon('compass', 'w-3.5 h-3.5') !!} ALTITUDE: <span data-route-altitude>{{ $routeStops[0]['altitude'] }}</span> FT
                                    </span>
                                </div>
                            </div>

                            <div class="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6 gap-2">
                                @foreach ($routeStops as $index => $stop)
                                    <button type="button" data-route-index="{{ $index }}" class="route-chip py-2 px-1 text-[10px] font-bold uppercase tracking-wider rounded-xl border text-center transition-all {{ $index === 0 ? 'is-active' : '' }}">
                                        STP {{ $index + 1 }}
                                    </button>
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="story-timeline" class="relative bg-[#050B14] py-24 px-6 overflow-hidden">
                <div class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-amber-500/20 via-sky-500/10 to-transparent pointer-events-none hidden lg:block"></div>

                <div class="relative z-10 max-w-7xl mx-auto space-y-20">
                    <div class="text-center max-w-2xl mx-auto space-y-4">
                        <span class="text-xs uppercase tracking-widest font-black text-amber-400">CHRONICLES OF TRAVO</span>
                        <h2 class="text-4xl md:text-6xl font-black text-white tracking-tight">
                            Your Journey,<br>
                            <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-white">Day by Day</span>
                        </h2>
                        <p class="text-sm text-gray-400">Winding mountain drives, hot chai stops, winter adventures, and starlit electronic bonfire sets. No rush, only real wanderlust stories.</p>
                    </div>

                    <div class="relative space-y-16 lg:space-y-32">
                        @foreach ($timelineItems as $index => $item)
                            <article class="relative flex flex-col lg:flex-row {{ $index % 2 === 0 ? '' : 'lg:flex-row-reverse' }} items-center gap-8 lg:gap-16">
                                <div class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center">
                                    <div class="w-10 h-10 rounded-full bg-[#050B14] border-2 border-amber-400 flex items-center justify-center font-black text-xs text-amber-400 shadow-md shadow-amber-400/20">{{ $index }}</div>
                                    <span class="text-[10px] font-mono text-gray-400 mt-1 uppercase">D{{ $index }}</span>
                                </div>

                                <div class="w-full lg:w-[48%] relative overflow-hidden rounded-3xl group aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] border border-white/5">
                                    <img src="{{ $item['image'] }}" alt="{{ $item['title'] }}" referrerpolicy="no-referrer" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out">
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30"></div>
                                    <div class="absolute inset-0 p-6 flex flex-col justify-between">
                                        <span class="self-start px-3 py-1.5 rounded-xl bg-amber-400 text-black text-xs font-black tracking-widest uppercase">{{ $item['day'] }}</span>
                                        <div class="space-y-2 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                            <div class="flex items-center gap-1.5 text-amber-400">
                                                {!! $icon('quote', 'w-4 h-4') !!}
                                                <span class="text-[10px] uppercase font-bold tracking-widest">Wanderer Quote</span>
                                            </div>
                                            <p class="text-xs sm:text-sm font-medium italic text-gray-200">"{{ $item['quote'] }}"</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="w-full lg:w-[48%] space-y-6 text-left">
                                    <div class="space-y-2">
                                        <div class="flex items-center gap-2">
                                            <span class="w-5 h-px bg-amber-400"></span>
                                            <span class="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">PHASE STORY {{ $index + 1 }}</span>
                                        </div>
                                        <h3 class="text-2xl md:text-4xl font-black text-white tracking-tight">{{ $item['title'] }}</h3>
                                    </div>

                                    <div class="p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent">
                                        <div class="bg-[#090D16] p-6 rounded-2xl space-y-4">
                                            <p class="text-xs uppercase font-extrabold tracking-widest text-gray-400 flex items-center gap-1.5">
                                                {!! $icon('clock', 'w-3.5 h-3.5 text-amber-400') !!} Scheduled Highlights & Pitstops:
                                            </p>
                                            <ul class="space-y-3">
                                                @foreach ($item['highlights'] as $highlight)
                                                    <li class="flex items-start gap-2.5 text-sm my-1 text-gray-300 font-light">
                                                        <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"></span>
                                                        <span>{{ $highlight }}</span>
                                                    </li>
                                                @endforeach
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="flex flex-wrap gap-2 pt-1">
                                        <span class="px-2.5 py-1 text-[10px] font-mono text-gray-400 bg-white/5 rounded-md uppercase tracking-wider">#Adventures</span>
                                        <span class="px-2.5 py-1 text-[10px] font-mono text-gray-400 bg-white/5 rounded-md uppercase tracking-wider">#strangerstofriends</span>
                                        @if ($index === 3)
                                            <span class="px-2.5 py-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md uppercase tracking-wider font-semibold animate-pulse">Riverside Party</span>
                                        @endif
                                    </div>
                                </div>
                            </article>
                        @endforeach
                    </div>
                </div>
            </section>

            <section id="experiences" class="relative bg-[#090D16] py-24 px-6 border-t border-b border-white/5 overflow-hidden text-white">
                <div class="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/[0.04] rounded-full filter blur-3xl pointer-events-none"></div>
                <div class="relative z-10 max-w-7xl mx-auto space-y-16">
                    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div class="space-y-4">
                            <span class="text-xs uppercase tracking-widest font-black text-amber-400">CULTURE, WILDERNESS & ENERGY</span>
                            <h2 class="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                                Moments You'll <br>
                                <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-white">Remember</span>
                            </h2>
                        </div>
                        <p class="text-sm text-gray-400 max-w-md font-light">We do not do boring sightseeing. These are immersive experiences designed to build connections, test your thrill threshold, and enrich your mountain story.</p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        @foreach ($experienceMoments as $item)
                            <article class="group relative h-[360px] rounded-3xl overflow-hidden border border-white/5 bg-[#050B14] flex flex-col justify-end p-6 shadow-xl transition-all duration-300 hover:border-amber-400/30 hover:shadow-2xl hover:shadow-amber-500/5 select-none">
                                <img src="{{ $item['image'] }}" alt="{{ $item['title'] }}" referrerpolicy="no-referrer" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-110 transition-all duration-500 ease-out">
                                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none"></div>
                                <div class="relative z-10 space-y-3">
                                    <div class="flex items-center justify-between">
                                        <div class="p-2.5 rounded-2xl bg-[#090D16]/80 text-amber-400 border border-white/10 backdrop-blur-md">
                                            {!! $icon($item['icon'], 'w-5 h-5 text-amber-400') !!}
                                        </div>
                                        <span class="opacity-0 group-hover:opacity-100 transition-opacity bg-amber-400 text-black px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                                            {!! $icon('eye', 'w-3 h-3') !!} Immersive
                                        </span>
                                    </div>
                                    <div class="space-y-1">
                                        <p class="text-[10px] font-black text-amber-400 uppercase tracking-widest font-mono">{{ $item['tag'] }}</p>
                                        <h3 class="text-xl font-bold text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors">{{ $item['title'] }}</h3>
                                    </div>
                                </div>
                                <span class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                            </article>
                        @endforeach
                    </div>
                </div>
            </section>

            <section id="whats-included" class="relative bg-[#050B14] py-24 px-6 overflow-hidden text-white">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[500px] bg-[radial-gradient(circle,rgba(245,158,11,0.03)_0%,transparent_70%)] pointer-events-none"></div>
                <div class="relative z-10 max-w-7xl mx-auto space-y-16">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end pb-4 border-b border-white/5">
                        <div class="space-y-4">
                            <span class="text-xs uppercase tracking-widest font-black text-amber-500">TRANSPARENCY & BUDGETS</span>
                            <h2 class="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                                Everything Covered for <br class="hidden sm:inline">
                                <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">a Smooth Escape</span>
                            </h2>
                        </div>
                        <p class="text-sm text-gray-400 max-w-lg font-light">We value honest travel. Every major logistical coordinate from comfortable AC transportation to hygienic campsite meals is bundled, so you have zero surprise fees.</p>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        <div class="lg:col-span-7 space-y-6">
                            <div class="flex items-center gap-3">
                                <span class="px-3 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-black uppercase font-mono tracking-widest">INCLUDED PASS PERKS</span>
                                <span class="text-xs text-gray-400 font-bold">9 premium coverages</span>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                @foreach ($inclusions as $item)
                                    <article class="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-300 flex items-start gap-4">
                                        <div class="p-3 bg-white/5 rounded-xl border border-white/10 flex-shrink-0">
                                            {!! $icon($item['icon'], 'w-6 h-6 text-amber-400') !!}
                                        </div>
                                        <div class="space-y-1">
                                            <p class="text-sm font-bold text-gray-200">{{ Str::before($item['text'], ' with ') }}</p>
                                            <p class="text-xs text-gray-400 leading-relaxed font-light">{{ $item['text'] }}</p>
                                        </div>
                                    </article>
                                @endforeach
                            </div>
                        </div>

                        <aside class="lg:col-span-5 bg-[#090D16]/40 border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden space-y-6">
                            <span class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-red-500 to-amber-500"></span>
                            <div class="space-y-4">
                                <div class="flex items-center gap-2">
                                    {!! $icon('alert', 'w-5 h-5 text-amber-500') !!}
                                    <h3 class="text-xl font-bold text-white tracking-tight">Keep This in Mind</h3>
                                </div>
                                <p class="text-xs text-gray-400 leading-relaxed font-light">To keep our luxury price tag affordable, a few self-driven adventure coordinates and personal choices remain out of package.</p>
                            </div>

                            <div class="space-y-3.5 border-t border-white/5 pt-6">
                                @foreach ($exclusions as $item)
                                    <div class="flex items-start gap-3 text-sm text-gray-300">
                                        {!! $icon('x-circle', 'w-4 h-4 text-orange-500/80 mt-1 flex-shrink-0') !!}
                                        <p class="text-xs leading-relaxed text-gray-400 font-light">{{ $item['text'] }}</p>
                                    </div>
                                @endforeach
                            </div>

                            <div class="p-4 rounded-2xl bg-amber-400/5 border border-amber-400/10 flex items-center gap-3">
                                {!! $icon('help', 'w-5 h-5 text-amber-400 flex-shrink-0') !!}
                                <p class="text-[11px] text-gray-300 leading-relaxed">Need details regarding activities? Reach out to our team via WhatsApp for verified local vendor listings to dodge inflated tourist fees.</p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <section id="checklist" class="relative bg-[#090D16] py-24 px-6 border-t border-b border-white/5 overflow-hidden text-white">
                <div class="absolute top-1/4 right-0 w-80 h-80 bg-teal-500/[0.03] rounded-full filter blur-3xl pointer-events-none"></div>
                <div class="relative z-10 max-w-7xl mx-auto space-y-12">
                    <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div class="space-y-4">
                            <span class="text-xs uppercase tracking-widest font-black text-amber-400">TRAVEL COMPANION</span>
                            <h2 class="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                                Pack Smart. <br class="sm:hidden">
                                <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-white">Travel Easy.</span>
                            </h2>
                            <p class="text-sm text-gray-400 max-w-xl font-light">Do not load unnecessary plastic, but do not freeze either. Use this interactive camper checklist to prepare for snow hikes, river trails, and high-altitude drops.</p>
                        </div>

                        <div class="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
                            <div class="relative flex items-center justify-center w-24 h-24">
                                <svg class="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                                    <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.05)" stroke-width="6" fill="transparent"></circle>
                                    <circle data-checklist-circle cx="40" cy="40" r="32" stroke="#fbbf24" stroke-width="6" fill="transparent" stroke-dasharray="201.0619" stroke-dashoffset="201.0619" class="transition-all duration-500 ease-out" stroke-linecap="round"></circle>
                                </svg>
                                <div class="absolute flex flex-col items-center">
                                    <span data-checklist-percent class="text-xl font-black text-white">0%</span>
                                    <span class="text-[8px] uppercase tracking-widest text-amber-400 font-bold">PACKED</span>
                                </div>
                            </div>

                            <div class="space-y-2 text-center sm:text-left">
                                <p class="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                                    {!! $icon('luggage', 'w-4 h-4 text-amber-400 animate-bounce') !!} Bag Preparation Tracker
                                </p>
                                <p class="text-xs text-gray-400">Packed <span data-checklist-count class="font-bold text-white">0</span> of <span class="font-bold text-white">{{ $totalItemsCount }}</span> items.</p>
                                <div class="flex gap-4 pt-1 justify-center sm:justify-start">
                                    <button type="button" data-checklist-reset class="text-[10px] font-mono text-gray-400 hover:text-white flex items-center gap-1 uppercase tracking-widest bg-white/5 border border-white/5 hover:border-white/15 px-2 py-1 rounded">
                                        {!! $icon('rotate', 'w-3 h-3') !!} Reset Pack
                                    </button>
                                    <span data-checklist-ready hidden class="text-[10px] text-emerald-400 font-bold uppercase tracking-widest items-center gap-1 animate-pulse">
                                        {!! $icon('sparkles', 'w-3.5 h-3.5') !!} Ready for Peaks!
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        @foreach ($packingChecklist as $groupIndex => $group)
                            <article class="p-6 rounded-3xl bg-white/[0.015] border border-white/5 hover:border-amber-400/10 transition-all duration-300 relative overflow-hidden group">
                                <div class="absolute top-4 right-4 text-white/5 group-hover:text-amber-400/5 transition-colors">
                                    {!! $icon('star', 'w-12 h-12') !!}
                                </div>
                                <div class="space-y-4">
                                    <div class="pb-3 border-b border-white/5 space-y-1">
                                        <span class="text-[10px] font-mono text-amber-500 uppercase tracking-widest">CATEGORY {{ str_pad($groupIndex + 1, 2, '0', STR_PAD_LEFT) }}</span>
                                        <h3 class="text-lg font-black text-white tracking-wide">{{ $group['category'] }}</h3>
                                    </div>

                                    <div class="space-y-2.5">
                                        @foreach ($group['items'] as $item)
                                            <button type="button" data-checklist-item class="checklist-item w-full p-3 rounded-xl flex items-center gap-3 border text-left transition-all bg-white/[0.01] border-white/5 text-gray-300 hover:bg-white/5 hover:border-white/10">
                                                <span class="checklist-box w-5 h-5 rounded-md flex items-center justify-center border transition-all bg-[#090D16] border-gray-600 flex-shrink-0">
                                                    <span class="checklist-check hidden">{!! $icon('check', 'w-3.5 h-3.5 stroke-[4px]') !!}</span>
                                                </span>
                                                <span class="checklist-label text-xs transition-all">{{ $item }}</span>
                                            </button>
                                        @endforeach
                                    </div>
                                </div>
                            </article>
                        @endforeach
                    </div>
                </div>
            </section>

            <section id="terms" class="relative bg-[#050B14] py-24 px-6 overflow-hidden text-white">
                <div class="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/[0.03] filter blur-3xl rounded-full pointer-events-none"></div>
                <div class="relative z-10 max-w-4xl mx-auto space-y-12">
                    <div class="text-center space-y-4">
                        <span class="text-xs uppercase tracking-widest font-black text-amber-500">TRANSPARENCY CHARTER</span>
                        <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight">Before You Travel</h2>
                        <p class="text-sm text-gray-400 max-w-xl mx-auto font-light">We operate on high alpine roads where nature makes the ultimate calls. Review our simple regulations on bookings, refunds, safety, and mountain guidelines.</p>
                    </div>

                    <div class="space-y-4" data-accordion-group>
                        @foreach ($termsAccordion as $index => $term)
                            <article data-accordion-item class="accordion-item rounded-2xl border transition-all duration-300 {{ $index === 0 ? 'is-open' : '' }}">
                                <button type="button" data-accordion-toggle class="w-full p-5 sm:p-6 flex items-center justify-between text-left focus:outline-none focus:ring-0 select-none group">
                                    <span class="accordion-title text-base font-bold transition-all">{{ $term['title'] }}</span>
                                    <span class="accordion-icon p-2 rounded-xl flex-shrink-0 transition-all" data-accordion-icon>
                                        {!! $icon($index === 0 ? 'minus' : 'plus', 'w-4 h-4 stroke-[3px]') !!}
                                    </span>
                                </button>
                                <div data-accordion-panel class="accordion-panel overflow-hidden transition-all duration-300 {{ $index === 0 ? 'max-h-[300px] border-t border-white/5' : 'max-h-0' }}">
                                    <div class="p-5 sm:p-6 text-sm text-gray-300 leading-relaxed font-light">{{ $term['content'] }}</div>
                                </div>
                            </article>
                        @endforeach
                    </div>

                    <div class="p-6 rounded-2xl bg-[#090D16] border border-white/5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left justify-between">
                        <div class="flex items-center gap-3">
                            {!! $icon('help', 'w-5 h-5 text-amber-400 flex-shrink-0') !!}
                            <p class="text-xs text-gray-400 leading-relaxed">Have specific transport, stay, or custom health queries? Let our support captains solve them.</p>
                        </div>
                        <a href="https://wa.me/911234567890?text=Hi%20TRAVO,%20I%20would%20like%20to%20know%20more%20about%20terms" target="_blank" rel="noopener noreferrer" class="text-xs font-black text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-widest flex items-center gap-1 shrink-0">
                            Chat Captain Now
                        </a>
                    </div>
                </div>
            </section>

            <footer class="relative bg-[#050B14] text-white overflow-hidden select-none">
                <div class="relative py-28 md:py-36 px-6 border-t border-white/5 flex flex-col justify-center items-center text-center">
                    <div class="absolute inset-0 bg-cover bg-center opacity-40 select-none pointer-events-none filter brightness-50" style="background-image: url('{{ $campImage }}');"></div>
                    <div class="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/40 to-transparent pointer-events-none"></div>
                    <div class="absolute inset-0 bg-gradient-to-b from-[#090D16] via-transparent to-[#050B14] pointer-events-none"></div>

                    <div class="relative z-10 max-w-2xl space-y-6">
                        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-widest animate-[pulse_2s_infinite]">
                            {!! $icon('flame', 'w-3.5 h-3.5') !!} SPOTS ARE FILLING SUPER FAST
                        </div>

                        <h2 class="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                            Ready for the <br>
                            <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">Mountains?</span>
                        </h2>

                        <p class="text-sm md:text-base text-gray-300 leading-relaxed max-w-md mx-auto font-light">
                            "Limited seats. Real travellers. Real experiences. Real memories." Step out of your safety cocoon and let crisp alpine air rewrite your core story.
                        </p>

                        <div class="pt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
                            <a href="https://wa.me/911234567890?text=Hi%20TRAVO!%20My%20friends%20and%20I%20are%20stoked%20about%20the%20upcoming%20Manali%20Kasol%20trip.%20Are%20seats%20available?" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20ba56] text-white font-extrabold text-sm uppercase tracking-wider rounded-full shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                                {!! $icon('message', 'w-5 h-5') !!} Book Now on WhatsApp
                            </a>

                            <button type="button" data-download-itinerary class="w-full sm:w-auto px-6 py-4 border border-white/20 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white text-sm font-bold uppercase tracking-wider rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0">
                                <span data-download-icon>{!! $icon('download', 'w-4 h-4') !!}</span>
                                <span data-download-label>Download Itinerary (PDF)</span>
                            </button>
                        </div>

                        <div class="pt-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-xs font-mono text-gray-400">
                            <span class="flex items-center gap-1">Verified secure operators</span>
                            <span class="flex items-center gap-1">Hand-vetted trails</span>
                            <span class="flex items-center gap-1">4.9 Rating (420+ campers)</span>
                        </div>
                    </div>
                </div>

                <div class="border-t border-white/5 py-8 px-6 bg-[#040810] text-center text-xs text-gray-500 font-mono space-y-4">
                    <div class="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-black text-white tracking-widest">TRAVO.</span>
                            <p class="text-[10px] text-gray-600">DELHI - MANALI - KASOL CO.</p>
                        </div>
                        <div class="flex gap-6 text-[10px]">
                            <a href="#itinerary" class="hover:text-white transition-colors">ITINERARY GUIDE</a>
                            <a href="#experiences" class="hover:text-white transition-colors">VIBES</a>
                            <a href="#whats-included" class="hover:text-white transition-colors">POLICIES</a>
                            <a href="#terms" class="hover:text-white transition-colors">TERMS OF ENTRY</a>
                        </div>
                        <p class="text-[10px] text-gray-600">&copy; {{ now()->year }} TRAVO Inc. All rights reserved.</p>
                    </div>
                </div>

                <div class="fixed bottom-6 right-6 z-40">
                    <a href="https://wa.me/911234567890?text=Hi%20TRAVO!%20Need%20quick%20help%20with%20the%20Manali%20trip%20booking!" target="_blank" rel="noopener noreferrer" class="relative group w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl scale-100 hover:scale-110 active:scale-95 transition-all" title="Speak to Trip Captain">
                        <span class="absolute -inset-1.5 rounded-full border border-emerald-500/40 animate-ping pointer-events-none"></span>
                        {!! $icon('message', 'w-6 h-6') !!}
                        <span class="absolute right-16 scale-0 group-hover:scale-100 transition-transform origin-right bg-[#090D16] border border-white/5 font-bold uppercase tracking-widest font-mono text-[9px] text-amber-400 px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl">COORDINATOR ONLINE</span>
                    </a>
                </div>

                <div class="fixed bottom-0 inset-x-0 z-40 bg-[#090D16]/95 backdrop-blur-md border-t border-white/5 py-3 px-6 flex md:hidden items-center justify-between">
                    <div>
                        <p class="text-[9px] uppercase tracking-wider text-gray-400 font-bold leading-none">Manali - Kasol Pass</p>
                        <p class="text-sm font-black text-white font-mono">&#8377;6,999 <span class="text-[10px] font-normal text-gray-400">/ seats</span></p>
                    </div>
                    <button type="button" data-open-booking class="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 font-black text-xs uppercase tracking-widest text-black rounded-full shadow-lg shadow-amber-400/20 active:scale-95 transition-all outline-none">
                        Book Your Seat
                    </button>
                </div>
            </footer>

            <div id="booking-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4" hidden aria-hidden="true">
                <button type="button" data-close-booking class="absolute inset-0 bg-[#050B14]/90 backdrop-blur-md cursor-default" aria-label="Close booking form"></button>

                <section class="relative w-full max-w-xl p-[1px] rounded-3xl bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col" role="dialog" aria-modal="true" aria-labelledby="booking-title">
                    <div class="bg-[#090D16] rounded-3xl p-6 sm:p-8 text-left overflow-y-auto flex-grow flex flex-col justify-between">
                        <div class="flex items-center justify-between pb-4 border-b border-white/5">
                            <div class="flex items-center gap-2">
                                <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                                <h3 id="booking-title" class="text-xl font-black text-white uppercase tracking-wider">TRAVO SECURE SLOTS</h3>
                            </div>
                            <button type="button" data-close-booking class="p-1.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-all active:scale-90" aria-label="Close booking form">
                                {!! $icon('x', 'w-5 h-5') !!}
                            </button>
                        </div>

                        <form data-booking-form class="space-y-6 pt-4 flex-grow">
                            <div class="space-y-4">
                                <div class="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <div>
                                        <h4 class="text-sm font-bold text-white uppercase tracking-wider">Number of Seats</h4>
                                        <p class="text-xs text-gray-400">Secure multiple passes for your circle.</p>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <button type="button" data-seat-delta="-1" class="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white flex items-center justify-center active:scale-90 transition-all font-bold">
                                            {!! $icon('minus', 'w-4 h-4') !!}
                                        </button>
                                        <span data-seat-count class="text-xl font-mono font-black text-amber-400 w-6 text-center">1</span>
                                        <button type="button" data-seat-delta="1" class="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white flex items-center justify-center active:scale-90 transition-all font-bold">
                                            {!! $icon('plus', 'w-4 h-4') !!}
                                        </button>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label class="space-y-1.5">
                                        <span class="text-[10px] font-black uppercase text-gray-400 tracking-wider">Full Name *</span>
                                        <input required type="text" name="fullName" placeholder="e.g. Abhi Kumar" class="w-full px-4 py-3 rounded-xl bg-[#050B14] border border-white/5 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors placeholder:text-gray-600">
                                    </label>
                                    <label class="space-y-1.5">
                                        <span class="text-[10px] font-black uppercase text-gray-400 tracking-wider">Phone Number *</span>
                                        <input required type="tel" name="phoneNumber" placeholder="e.g. +91 98765 43210" class="w-full px-4 py-3 rounded-xl bg-[#050B14] border border-white/5 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors placeholder:text-gray-600">
                                    </label>
                                </div>

                                <label class="space-y-1.5 block">
                                    <span class="text-[10px] font-black uppercase text-gray-400 tracking-wider">Email Address *</span>
                                    <input required type="email" name="email" placeholder="e.g. abhi@example.com" class="w-full px-4 py-3 rounded-xl bg-[#050B14] border border-white/5 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors placeholder:text-gray-600">
                                </label>

                                <label class="space-y-1.5 block">
                                    <span class="text-[10px] font-black uppercase text-gray-400 tracking-wider">Special Requests / Group Notes (Optional)</span>
                                    <textarea rows="2" name="specialRequests" placeholder="e.g. Food exclusions, sharing preferences with another traveler..." class="w-full px-4 py-3 rounded-xl bg-[#050B14] border border-white/5 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors placeholder:text-gray-600 resize-none"></textarea>
                                </label>
                            </div>

                            <div class="space-y-2 border-t border-b border-white/5 py-4">
                                <div class="flex gap-2">
                                    <label class="relative flex-grow">
                                        <span class="sr-only">Promo code</span>
                                        <input type="text" name="promoCode" placeholder="TRY CODES: TRAVO1000 or MOUNTAINLOVE" class="w-full pl-8 pr-4 py-3 rounded-xl bg-[#050B14] border border-white/5 text-white text-[10px] uppercase font-bold tracking-wider focus:outline-none focus:border-amber-400 transition-colors placeholder:text-gray-600">
                                        <span class="text-gray-500 absolute left-3 top-1/2 -translate-y-1/2">{!! $icon('ticket', 'w-3.5 h-3.5') !!}</span>
                                    </label>
                                    <button type="button" data-apply-promo class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs uppercase tracking-wider border border-white/5 active:scale-95 transition-all outline-none font-bold shrink-0">Apply</button>
                                </div>

                                <p data-promo-success hidden class="text-[10px] text-emerald-400 font-bold items-center gap-1">
                                    {!! $icon('check', 'w-3.5 h-3.5') !!} Coupon code <span data-promo-code></span> applied! -&#8377;<span data-discount-inline>0</span>
                                </p>
                                <p data-promo-error hidden class="text-[10px] text-orange-400 font-bold items-center gap-1">
                                    {!! $icon('alert', 'w-3.5 h-3.5') !!} <span data-promo-error-text></span>
                                </p>
                            </div>

                            <div class="bg-[#050B14] p-5 rounded-2xl space-y-2 font-mono border border-white/5">
                                <div class="flex justify-between text-xs text-gray-400">
                                    <span>Expedition Fare (<span data-seat-count-inline>1</span> seats)</span>
                                    <span>&#8377;<span data-subtotal>6,999</span></span>
                                </div>
                                <div data-discount-row hidden class="justify-between text-xs text-emerald-400">
                                    <span>Discount Added</span>
                                    <span>-&#8377;<span data-discount>0</span></span>
                                </div>
                                <div class="flex justify-between text-xs text-gray-400">
                                    <span>Green taxes & State Tolls</span>
                                    <span class="text-emerald-400">FREE / INCLUDED</span>
                                </div>
                                <div class="pt-2 border-t border-white/5 flex justify-between items-baseline">
                                    <span class="text-xs uppercase tracking-widest text-white font-bold">Total Fare Due</span>
                                    <span class="text-xl font-sans font-black text-amber-400">&#8377;<span data-net-total>6,999</span></span>
                                </div>
                            </div>

                            <button type="submit" data-submit-booking class="w-full py-4 text-center bg-gradient-to-r from-amber-500 to-amber-400 font-black text-sm uppercase tracking-wider text-black rounded-2xl shadow-lg hover:shadow-amber-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                <span data-submit-icon>{!! $icon('sparkles', 'w-4 h-4') !!}</span>
                                <span data-submit-label>CONFIRM & GENERATE EXPEDITION TICKET</span>
                            </button>
                        </form>

                        <div data-booking-success hidden class="space-y-6 pt-6 text-center flex-grow flex-col justify-center items-center">
                            <div class="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400">
                                {!! $icon('check', 'w-10 h-10 animate-[bounce_1.5s_infinite]') !!}
                            </div>

                            <div class="space-y-2">
                                <h3 class="text-2xl font-black text-white uppercase tracking-wider">You are going to Manali!</h3>
                                <p class="text-sm text-gray-400 max-w-sm">Congratulations <span data-success-name class="text-white font-bold"></span>! Your slot reservation has been authorized and registered.</p>
                            </div>

                            <div class="w-full p-[1px] rounded-2xl bg-gradient-to-b from-amber-500/40 to-transparent">
                                <div class="bg-[#050B14] p-6 rounded-2xl border border-white/5 text-left font-mono relative overflow-hidden space-y-4">
                                    <div class="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#090D16] border border-white/5"></div>
                                    <div class="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#090D16] border border-white/5"></div>

                                    <div class="flex justify-between items-center text-xs text-amber-400 font-black uppercase tracking-widest leading-none pb-2 border-b border-dashed border-white/10">
                                        <span>TRAVO BOARDING PASS</span>
                                        <span>10 JUNE DEP</span>
                                    </div>

                                    <div class="grid grid-cols-2 gap-4 pt-1">
                                        <div>
                                            <p class="text-[9px] uppercase text-gray-500 font-bold">Pass Holder</p>
                                            <p data-ticket-name class="text-xs font-bold text-white truncate"></p>
                                        </div>
                                        <div>
                                            <p class="text-[9px] uppercase text-gray-500 font-bold">Seats Reserved</p>
                                            <p class="text-xs font-bold text-white font-sans"><span data-ticket-seats>1</span> travelers</p>
                                        </div>
                                        <div>
                                            <p class="text-[9px] uppercase text-gray-500 font-bold">Unique Entry code</p>
                                            <p data-ticket-code class="text-xs font-bold font-sans text-amber-400"></p>
                                        </div>
                                        <div>
                                            <p class="text-[9px] uppercase text-gray-500 font-bold">Status</p>
                                            <span class="text-[10px] text-teal-400 font-black tracking-widest bg-teal-400/10 px-1 py-0.5 rounded border border-teal-500/20 uppercase">AUTHORIZED</span>
                                        </div>
                                    </div>

                                    <div class="pt-3 border-t border-dashed border-white/10 flex justify-between items-center">
                                        <div>
                                            <p class="text-[9px] uppercase text-gray-500 font-bold">Assembly Point</p>
                                            <p class="text-[10px] text-gray-300">New Delhi Metro, Gate 1</p>
                                        </div>
                                        <span class="text-[9px] text-amber-400/90 bg-amber-400/5 px-2 py-1 rounded">Captains Allocated: 2</span>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-3 w-full">
                                <a data-whatsapp-ticket href="#" target="_blank" rel="noopener noreferrer" class="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba56] transition-all font-black text-xs uppercase tracking-widest text-white rounded-xl inline-flex items-center justify-center gap-2">
                                    Share Pass to WhatsApp Support
                                </a>
                                <button type="button" data-close-booking class="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs uppercase tracking-wider font-bold">Close Window</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </body>
</html>
