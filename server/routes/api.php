<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeacherController;

Route::get('/teachers', [TeacherController::class, 'index']);
Route::get('/teachers/{id}', [TeacherController::class, 'show']);
Route::post('/teachers/{id}/like', [TeacherController::class, 'addLike']);
Route::post('/teachers/{id}/comment', [TeacherController::class, 'addComment']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});