<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'department', 'photo', 'likes'];

    protected $casts = [
        'skills' => 'array',
        'comments' => 'array',
    ];
}