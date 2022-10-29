import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Context } from '../../common/context/context';
import { getAll } from '../../services/user';
import { Container } from './styles';
import ModalUser from './components/ModalUser';
import { maskCnpj, maskPhone } from '../../common/utils/masks';

const Users = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState({ search: '', page: 0, limit: 10 });
  const [info, setInfo] = useState([]);
  const [user, setUser] = useState({ type: '', id: '' });
  const { setLoading } = useContext(Context);

  useEffect(() => handleGetUsers(), []);

  const handleClose = () => {
    setShow(false);
  };

  const handleUser = (e) => {
    if (e.isAdmin) setUser({ type: 'admin', id: e.id });
    if (e.isAccountant) setUser({ type: 'accountant', id: e.id });
    if (e.client) setUser({ type: 'client', id: e.id });

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
        user.document = handleMask(user.document, 'document');
        user.phone = handleMask(user.phone, 'phone');
      });

      setInfo(response.data.data.users.users);
    }

    setLoading(false);
  };

  const handleMask = (data, type) => {
    if (type === 'data') {
      const subData = data.substring(0, 10);
      const splittedDate = subData.split('-');
      const formatedData = splittedDate[2] + '/' + splittedDate[1] + '/' + splittedDate[0];

      return formatedData;
    }

    if (type === 'document') {
      if (data != null) {
        const maskedCnpj = maskCnpj(data);

        return maskedCnpj;
      }
    }

    if (type === 'phone') {
      if (data != null) {
        const maskedValue = maskPhone(data);

        return maskedValue;
      }
    }
  };

  return (
    <>
      <ModalUser openModal={show} handleCloseModal={handleClose} user={user} />

      <Container>
        <Row className="mb-3">
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
        <Row>
          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Código</th>
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
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.office}</td>
                      <td>{user.phone}</td>
                      <td>{user.document}</td>
                      <td>{user.isAccountant ? 'Contador' : user.isAdmin ? 'Admin' : 'Cliente'}</td>
                      <td>{user.createdAt}</td>
                      <td>{user.isSharingBankAccountData ? 'Sim' : 'Não'}</td>
                      <td>{user.isEmailConfirmed ? 'Sim' : 'Não'}</td>
                      <td>{user.email}</td>
                      <td>{user.isActive ? 'Sim' : 'Não'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end ">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  {'<'}
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  {'>'}
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Users;
