import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { Context } from '../../context/context';

const NavbarComponent = () => {
  const auth = true;

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>Hackathon Uni-FACEF</Navbar.Brand>
        <Nav className="me-auto">
          {auth ? (
            <>
              <Nav.Link href="/admin/usuarios">Controle de Usuários</Nav.Link>
              <Nav.Link href="/admin/escritorios">Controle de Escritórios</Nav.Link>
              <Nav.Link href="/login" onClick={() => localStorage.removeItem('TOKEN_KEY')}>
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/contador/usuarios">Controle de Usuários</Nav.Link>
              <Nav.Link href="/login" onClick={() => localStorage.removeItem('TOKEN_KEY')}>
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

NavbarComponent.propTypes = {};

export default NavbarComponent;
