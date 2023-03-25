import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark">
        <Container>
         
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light ">Home</NavLink>
          </Nav>
          <Nav className="me-auto">
            <NavLink to="/home" className="text-decoration-none text-light ">User</NavLink>
          </Nav>
          <Nav className="me-auto">
            <NavLink to="/category" className="text-decoration-none text-light ">Category</NavLink>
          </Nav>
          <Nav className="me-auto">
            <NavLink to="/tasks" className="text-decoration-none text-light ">Task</NavLink>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default Header
