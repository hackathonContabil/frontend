import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Context } from '../../common/context/context';
import { getAll } from '../../services/user';
import { Container } from './styles';
import ModalClient from './components/ModalClient';
import { maskCnpj, maskPhone } from '../../common/utils/masks';

const Clients = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState({ search: '', page: 0, limit: 10 });
  const [info, setInfo] = useState([]);
  const [user, setUser] = useState({ type: '', id: '', isActive: false });
  const { setLoading } = useContext(Context);

  useEffect(() => handleGetUsers(), []);

  const handleClose = () => {
    setShow(false);
  };

  const handleUser = (e) => {
    if (e.isAdmin)
      setUser({ type: 'admin', id: e.id, isActive: e.isActive, emailActive: e.isEmailConfirmed });
    if (e.isAccountant)
      setUser({
        type: 'accountant',
        id: e.id,
        isActive: e.isActive,
        emailActive: e.isEmailConfirmed,
      });
    if (e.isClient)
      setUser({ type: 'client', id: e.id, isActive: e.isActive, emailActive: e.isEmailConfirmed });

    setShow(true);
  };

  const handleChange = (key, value) => {
    setSearch({ ...search, [key]: value });
  };

  const handleGetUsers = async () => {
    setLoading(true);
    const response = await getAll(search);

    if (response.success) {
      response.data.data.users.users.map((user) => {
        user.createdAt = handleMask(user.createdAt, 'data');
        user.emailConfirmedAt = handleMask(user.emailConfirmedAt, 'data');
        user.document = handleMask(user.document, 'document');
        user.phone = handleMask(user.phone, 'phone');
      });

      setInfo(response.data.data.users.users);
    }

    setLoading(false);
  };

  const handleMask = (data, type) => {
    if (type === 'data') {
      if (data !== null) {
        const subData = data.substring(0, 10);
        const splittedDate = subData.split('-');
        const formatedData = splittedDate[2] + '/' + splittedDate[1] + '/' + splittedDate[0];

        return formatedData;
      }
    }

    if (type === 'document') {
      if (data != null) {
        const maskedCnpj = maskCnpj(data);

        return maskedCnpj;
      }
    }

    if (type === 'phone') {
      if (data !== null) {
        const maskedValue = maskPhone(data);

        return maskedValue;
      }
    }
  };

  return (
    <>
      <ModalClient
        openModal={show}
        handleCloseModal={handleClose}
        user={user}
        callback={handleGetUsers}
      />

      <Container>
        <Row className="mb-3 w-100 mw-100">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Busque por CNPJ, razão social ou nome do contador"
              value={search.search}
              onKeyPress={(e) => e.key === 'Enter' && handleGetUsers()}
              onChange={(e) => {
                handleChange('search', e.target.value);
              }}
            />
          </Col>
          <Col md={6}>
            <Button onClick={() => handleGetUsers()}>Pesquisar</Button>
          </Col>
        </Row>
        <Row className="overflow-auto w-100 mw-100">
          <Col>
            <table className="fl-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Escritório</th>
                  <th>Telefone</th>
                  <th>Documento</th>
                  <th>Função</th>
                  <th>Data de Criação</th>
                  <th>Compartilha Informações Bancárias</th>
                  <th>E-mail validado</th>
                  <th>Data de ativação do e-mail</th>
                  <th>Ativo</th>
                </tr>
              </thead>
              <tbody>
                {info.map((user, index) => {
                  return (
                    <tr style={{ cursor: 'pointer' }} key={index} onClick={() => handleUser(user)}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.office}</td>
                      <td>{user.phone}</td>
                      <td>{user.document}</td>
                      <td>{user.isAccountant ? 'Contador' : user.isAdmin ? 'Admin' : 'Cliente'}</td>
                      <td>{user.createdAt}</td>
                      <td>{user.isSharingBankAccountData ? 'Sim' : 'Não'}</td>
                      <td>{user.isEmailConfirmed ? 'Sim' : 'Não'}</td>
                      <td>{user.emailConfirmedAt}</td>
                      <td>{user.isActive ? 'Sim' : 'Não'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="mt-2 w-100 mw-100">
          <Col className="d-flex justify-content-end">
            <ul className="pagination modal-1">
              <li>
                <a style={{ fontSize: '10px' }} href="#" className="active">
                  1
                </a>
              </li>
              <li>
                <a style={{ fontSize: '10px' }} href="#">
                  2
                </a>
              </li>
              <li>
                <a style={{ fontSize: '10px' }} href="#">
                  3
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Clients;
