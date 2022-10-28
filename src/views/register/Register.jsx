import React, { useContext, useState } from 'react';
import { Context } from '../../common/context/context';
import { useAlert } from 'react-alert';
import { login } from '../../services/login/loginService';
import { Container, Footer } from './styles';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { validateEmail } from '../../common/utils/validators';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    crc: '',
    office: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    crcError: false,
    officeError: false,
    passwordError: false,
    confirmPasswordError: false,
  });

  const { setLoading, setAuth } = useContext(Context);
  const alert = useAlert();

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const handleError = (field, boolean) => {
    setErrors((prev) => ({ ...prev, [field]: boolean }));
  };

  const handleSubmit = async () => {
    const { name, email, crc, office, password, confirmPassword } = user;
    let isValid = true;

    if (name === '') {
      handleError('nameError', true);
      alert.error('Nome não pode estar em branco.');
      isValid = false;
    }

    if (!validateEmail(email)) {
      handleError('emailError', true);
      alert.error('E-mail inválido');
      isValid = false;
    }

    if (crc === '') {
      handleError('crcError', true);
      alert.error('CRC não pode estar em branco.');
      isValid = false;
    }

    if (office === '') {
      handleError('officeError', true);
      alert.error('Escritório não pode estar em branco.');
      isValid = false;
    }

    if (password === '') {
      handleError('passwordError', true);
      alert.error('Senha não pode estar em branco');
      isValid = false;
    }

    if (password !== confirmPassword) {
      handleError('passwordError', true);
      handleError('confirmPassword', true);
      alert.error('Senhas não correspondem');
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);
    const response = await login(user);
    setLoading(false);

    if (!response.success) {
      return alert.error(response.message);
    }

    setAuth(response.data.data);

    window.location.href = '/home';
  };

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <Form>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Nome"
                    isInvalid={errors.nameError}
                    value={user.name}
                    onChange={(e) => {
                      handleChange('name', e.target.value);
                      handleError('nameError', false);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="E-mail"
                    isInvalid={errors.emailError}
                    value={user.email}
                    onChange={(e) => {
                      handleChange('email', e.target.value);
                      handleError('nameError', false);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="CRC"
                    isInvalid={errors.crcError}
                    value={user.crc}
                    onChange={(e) => {
                      handleChange('crc', e.target.value);
                      handleError('crcError', false);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Escritório"
                    isInvalid={errors.officeError}
                    value={user.office}
                    onChange={(e) => {
                      handleChange('office', e.target.value);
                      handleError('officeError', false);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Senha"
                    isInvalid={errors.passwordError}
                    value={user.password}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    onChange={(e) => {
                      handleChange('password', e.target.value);
                      handleError('nameError', false);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Confirmar Senha"
                    isInvalid={errors.confirmPasswordError}
                    value={user.confirmPassword}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    onChange={(e) => {
                      handleChange('confirmPassword', e.target.value);
                      handleError('confirmPassword', false);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" className="w-100 mb-3" onClick={() => handleSubmit()}>
              Cadastrar
            </Button>

            <a href={window.origin + '/login'}>Já possuí conta? Realize seu login.</a>
          </Form>
        </Col>
      </Row>
      <Footer>
        <p style={{ fontWeight: 'bold', color: 'white' }}>Hackathon Uni-FACEF</p>
      </Footer>
    </Container>
  );
};

export default Register;
