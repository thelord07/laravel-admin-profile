<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\SkillsController;
use App\Http\Controllers\ProjectController;

Route::get('/', function () {
    return redirect('dashboard');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::resource('skills', SkillsController::class)
    ->except(['create', 'show', 'edit']);
    Route::resource('projects', ProjectController::class)
    ->except(['create', 'show', 'edit']);
});
