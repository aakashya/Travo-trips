<?php

use App\Http\Controllers\BookingInquiryController;
use App\Http\Controllers\ContactInquiryController;
use Illuminate\Support\Facades\Route;

Route::post('/forms/booking-inquiries', [BookingInquiryController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('booking-inquiries.store');

Route::post('/forms/contact-inquiries', [ContactInquiryController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('contact-inquiries.store');

Route::get('/', function () {
    return view('welcome');
});

Route::get('/{path}', function () {
    return view('welcome');
})->where('path', '.*');
