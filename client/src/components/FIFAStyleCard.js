import React, { useState } from 'react';
import { Card, Badge, Form, Button } from 'react-bootstrap';
import { FaThumbsUp, FaChevronDown, FaTrophy, FaMedal } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../styles/FIFAStyleCard.css';

const FIFAStyleCard = ({ 
  teacher, 
  rank, 
  onLikesAdded, 
  openMenuId, 
  setOpenMenuId, 
  darkMode,
  onClick 
}) => {
  const { id, name, department, photo, likes, skills } = teacher;
  const [selectedLikes, setSelectedLikes] = useState([]);

  const likeOptions = [
    'Compañerismo', 'Innovación', 'Comunicación', 'Liderazgo',
    'Empatía', 'Creatividad', 'Motivación', 'Trabajo en equipo',
    'Paciencia', 'Organización'
  ];

  const handleLikeToggle = (skillType) => {
    setSelectedLikes(prevSelected =>
      prevSelected.includes(skillType)
        ? prevSelected.filter(skill => skill !== skillType)
        : [...prevSelected, skillType]
    );
  };

  const handleSubmitLikes = (e) => {
    e.stopPropagation(); // Evitar que se propague al onClick de la tarjeta
    if (selectedLikes.length > 0) {
      onLikesAdded(id, selectedLikes);
      setSelectedLikes([]);
      setOpenMenuId(null);
    }
  };

  const handleDropdownToggle = (e) => {
    e.stopPropagation(); // Evitar que se propague al onClick de la tarjeta
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const getRankIcon = () => {
    switch(rank) {
      case 1:
        return <FaTrophy className="rank-icon gold" />;
      case 2:
        return <FaTrophy className="rank-icon silver" />;
      case 3:
        return <FaTrophy className="rank-icon bronze" />;
      default:
        return <div className="rank">{rank}</div>;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={`fifa-style-card rank-${rank}`}
        onClick={onClick}
      >
        {rank <= 3 && (
          <div className={`rank-medal rank-${rank}`}>
            {getRankIcon()}
          </div>
        )}
        
        <div className="rank">{rank}</div>
        <Card.Img 
          variant="top" 
          src={photo || "/placeholder-teacher.jpg"} 
          alt={name}
        />
        
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2">{department}</Card.Subtitle>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="likes-count">
              <FaThumbsUp className="me-1" />
              <span>{likes}</span>
            </div>
            <Button 
              variant="primary" 
              onClick={handleDropdownToggle}
              className="like-button"
            >
              Like <FaChevronDown />
            </Button>
          </div>

          {openMenuId === id && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`like-dropdown-menu ${darkMode ? 'dark-mode' : 'light-mode'}`}
              onClick={e => e.stopPropagation()} // Evitar que se cierre al hacer clic dentro
            >
              <div className="like-options-container">
                {likeOptions.map((option) => (
                  <Form.Check
                    key={option}
                    type="checkbox"
                    id={`like-${id}-${option}`}
                    label={option}
                    checked={selectedLikes.includes(option)}
                    onChange={() => handleLikeToggle(option)}
                    className="like-option"
                  />
                ))}
              </div>
              <Button 
                onClick={handleSubmitLikes} 
                className="submit-likes-btn"
                disabled={selectedLikes.length === 0}
              >
                Enviar Likes
              </Button>
            </motion.div>
          )}

          <div className="skills-container">
            {skills && skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Badge bg="info" className="skill-badge">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default FIFAStyleCard;