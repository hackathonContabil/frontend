import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { Context } from '../../context/context';
import { useHistory } from 'react-router';

const NavbarComponent = () => {
  const { auth } = useContext(Context);
  const history = useHistory();
  const teste = true;

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>Hackathon Uni-FACEF</Navbar.Brand>
        <Nav className="me-auto">
          {teste ? (
            <>
              <Nav.Link onClick={() => history.push('/admin/usuarios')}>
                Controle de Usuários
              </Nav.Link>
              <Nav.Link onClick={() => history.push('/admin/escritorios')}>
                Controle de Escritórios
              </Nav.Link>
            </>
          ) : (
            <Nav.Link onClick={() => history.push('/contador/usuarios')}>
              Controle de Usuários
            </Nav.Link>
          )}
          <Nav.Link
            onClick={() => {
              localStorage.removeItem('TOKEN_KEY');
              history.push('/login');
            }}>
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

NavbarComponent.propTypes = {};

export default NavbarComponent;
