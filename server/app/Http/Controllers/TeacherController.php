<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TeacherController extends Controller
{
    private $mockTeachers = [
        [
            'id' => 1,
            'name' => 'Juan Pérez',
            'department' => 'Matemáticas',
            'photo' => 'https://randomuser.me/api/portraits/men/1.jpg',
            'likes' => 15,
            'skills' => ['Compañerismo', 'Innovación'],
        ],
        [
            'id' => 2,
            'name' => 'María García',
            'department' => 'Literatura',
            'photo' => 'https://randomuser.me/api/portraits/women/1.jpg',
            'likes' => 20,
            'skills' => ['Empatía', 'Creatividad'],
        ],
        [
            'id' => 3,
            'name' => 'Carlos Rodríguez',
            'department' => 'Ciencias',
            'photo' => 'https://randomuser.me/api/portraits/men/2.jpg',
            'likes' => 18,
            'skills' => ['Liderazgo', 'Comunicación'],
        ],
        [
            'id' => 4,
            'name' => 'Ana Martínez',
            'department' => 'Historia',
            'photo' => 'https://randomuser.me/api/portraits/women/2.jpg',
            'likes' => 12,
            'skills' => ['Paciencia', 'Organización'],
        ],
        [
            'id' => 5,
            'name' => 'David López',
            'department' => 'Educación Física',
            'photo' => 'https://randomuser.me/api/portraits/men/3.jpg',
            'likes' => 25,
            'skills' => ['Motivación', 'Trabajo en equipo'],
        ],
    ];

    public function index()
    {
        return response()->json($this->mockTeachers);
    }

    public function show($id)
    {
        $teacher = collect($this->mockTeachers)->firstWhere('id', $id);
        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }
        return response()->json($teacher);
    }

    public function addLike(Request $request, $id)
    {
        $teacher = collect($this->mockTeachers)->firstWhere('id', $id);
        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }
        $teacher['likes']++;
        if (!in_array($request->skillType, $teacher['skills'])) {
            $teacher['skills'][] = $request->skillType;
        }
        return response()->json($teacher);
    }

    public function addComment(Request $request, $id)
    {
        $teacher = collect($this->mockTeachers)->firstWhere('id', $id);
        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }
        if (!isset($teacher['comments'])) {
            $teacher['comments'] = [];
        }
        $teacher['comments'][] = $request->comment;
        return response()->json($teacher);
    }
}