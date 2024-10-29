import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon, FaUser, FaBars } from 'react-icons/fa';

const NavbarComponent = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      bg={darkMode ? 'dark' : 'light'}
      variant={darkMode ? 'dark' : 'light'}
      expand="lg"
      className="custom-navbar"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/logo.png"
            width="60"
            height="60"
            className="brand-logo"
            alt="Logo"
          />
          <span className="brand-text">Plataforma de Profesores</span>

        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        >
          <FaBars />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              Inicio / Ranking
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/proyectos"
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              Proyectos
            </Nav.Link>
            <button
              onClick={() => {
                toggleDarkMode();
                setExpanded(false);
              }}
              className="theme-toggle-btn ms-2"
              aria-label={
                darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
              }
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <Link
              to="/login"
              className="btn btn-custom-login ms-3"
              onClick={() => setExpanded(false)}
            >
              <FaUser className="me-2" /> Iniciar Sesión
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;