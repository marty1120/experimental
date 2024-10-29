import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaChalkboardTeacher, FaTrophy, FaThumbsUp, FaUsers } from 'react-icons/fa';
import FIFAStyleCard from './FIFAStyleCard';
import TeacherModal from './TeacherModal';
import Confetti from './Confetti';
import StatsDashboard from './StatsDashboard';
import { getTeachers, addLikes } from '../services/teacherService';
import { useTheme } from '../context/ThemeContext';
import '../styles/TeacherList.css';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedRank, setSelectedRank] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await getTeachers();
      const sortedTeachers = response.data.sort((a, b) => b.likes - a.likes);
      setTeachers(sortedTeachers);
      setFilteredTeachers(sortedTeachers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const results = teachers.filter(teacher =>
      teacher.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      teacher.department.toLowerCase().includes(departmentFilter.toLowerCase())
    );
    setFilteredTeachers(results);
  }, [nameFilter, departmentFilter, teachers]);

  const handleLikeAdded = useCallback(async (teacherId, likeTypes) => {
    try {
      const previousTeacher = teachers.find(t => t.id === teacherId);
      await addLikes(teacherId, likeTypes);
      await fetchTeachers();
      
      // Verificar si el profesor subió en el ranking
      const updatedTeacher = teachers.find(t => t.id === teacherId);
      if (updatedTeacher && previousTeacher) {
        const previousRank = teachers.indexOf(previousTeacher);
        const newRank = teachers.indexOf(updatedTeacher);
        if (newRank < previousRank) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      }
    } catch (error) {
      console.error('Error adding likes:', error);
    }
  }, [teachers]);

  const handleCardClick = useCallback((teacher, rank) => {
    setSelectedTeacher(teacher);
    setSelectedRank(rank);
    setShowModal(true);
  }, []);

  return (
    <div className={`teacher-list-container ${darkMode ? 'dark-mode' : ''}`}>
      <Confetti 
        run={showConfetti} 
        onComplete={() => setShowConfetti(false)}
      />

      <TeacherModal
        show={showModal}
        onHide={() => setShowModal(false)}
        teacher={selectedTeacher}
        rank={selectedRank}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="ranking-header"
      >
        <h1 className="ranking-title">
          <FaTrophy className="trophy-icon" />
          Ranking de Profesores
        </h1>
      </motion.div>

      {/* Dashboard de estadísticas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <StatsDashboard teachers={teachers} />
      </motion.div>

      {/* Búsqueda */}
      <Row className="justify-content-center mb-4">
        <Col md={6} lg={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <InputGroup className="search-input">
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </InputGroup>
          </motion.div>
        </Col>
        <Col md={6} lg={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <InputGroup className="search-input">
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Buscar por departamento"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              />
            </InputGroup>
          </motion.div>
        </Col>
      </Row>

      {/* Grid de tarjetas */}
      <AnimatePresence>
        <motion.div 
          className="cards-grid"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {filteredTeachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0 }
              }}
              layout
            >
              <FIFAStyleCard
                teacher={teacher}
                rank={index + 1}
                onLikesAdded={handleLikeAdded}
                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}
                darkMode={darkMode}
                onClick={() => handleCardClick(teacher, index + 1)}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Mensaje si no hay resultados */}
      {filteredTeachers.length === 0 && (
        <motion.div 
          className="no-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FaChalkboardTeacher size={40} className="mb-3" />
          <h3>No se encontraron profesores</h3>
          <p>Intenta con otros criterios de búsqueda</p>
        </motion.div>
      )}
    </div>
  );
};

export default React.memo(TeacherList);