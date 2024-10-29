import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams para acceder a los parámetros de la ruta
import { getTeacherById } from '../services/teacherService';

const TeacherProfile = () => {
  const { id } = useParams(); // Obtiene el parámetro `id` de la URL
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    getTeacherById(id)
      .then(response => setTeacher(response.data))
      .catch(error => console.error('Error fetching teacher data:', error));
  }, [id]);

  if (!teacher) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Perfil de {teacher.name}</h2>
      <p><strong>Departamento:</strong> {teacher.department}</p>
      <p><strong>Likes:</strong> {teacher.likes}</p>
      <p><strong>Descripción:</strong> {teacher.description}</p>
      {/* Otros datos del profesor */}
    </div>
  );
};

export default TeacherProfile;
