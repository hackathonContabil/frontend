import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Context } from '../../common/context/context';
import { getAll } from '../../services/user';
import { Container } from './styles';
import ModalClient from './components/ModalClient';
import { maskCnpj, maskPhone } from '../../common/utils/masks';

const Clients = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState({ search: '', page: 0, limit: 15 });
  const [info, setInfo] = useState([]);
  const [user, setUser] = useState({
    type: '',
    id: '',
    isActive: false,
    emailActive: false,
    isSharingBankAccountData: false,
  });
  const { setLoading } = useContext(Context);

  useEffect(() => handleGetUsers(), []);

  const handleClose = () => {
    setShow(false);
  };

  const handleUser = (e) => {
    if (e.isAdmin)
      setUser({
        type: 'admin',
        id: e.id,
        isActive: e.isActive,
        emailActive: e.isEmailConfirmed,
        isSharingBankAccountData: e.isSharingBankAccountData,
      });
    if (e.isAccountant)
      setUser({
        type: 'accountant',
        id: e.id,
        isActive: e.isActive,
        emailActive: e.isEmailConfirmed,
        isSharingBankAccountData: e.isSharingBankAccountData,
      });
    if (e.isClient)
      setUser({
        type: 'client',
        id: e.id,
        isActive: e.isActive,
        emailActive: e.isEmailConfirmed,
        isSharingBankAccountData: e.isSharingBankAccountData,
      });

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
                  <th>Ativo</th>
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
                </tr>
              </thead>
              <tbody>
                {info.map((userInfo, index) => {
                  return (
                    <tr
                      style={{ cursor: 'pointer' }}
                      key={index}
                      onClick={() => handleUser(userInfo)}>
                      <td>{userInfo.isActive ? 'Sim' : 'Não'}</td>
                      <td>{userInfo.name}</td>
                      <td>{userInfo.email}</td>
                      <td>{userInfo.accountingOfficeName}</td>
                      <td>{userInfo.phone}</td>
                      <td>{userInfo.document}</td>
                      <td>
                        {userInfo.isAccountant
                          ? 'Contador'
                          : userInfo.isAdmin
                          ? 'Admin'
                          : 'Cliente'}
                      </td>
                      <td>{userInfo.createdAt}</td>
                      <td>{userInfo.isSharingBankAccountData ? 'Sim' : 'Não'}</td>
                      <td>{userInfo.isEmailConfirmed ? 'Sim' : 'Não'}</td>
                      <td>{userInfo.emailConfirmedAt}</td>
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
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Clients;
