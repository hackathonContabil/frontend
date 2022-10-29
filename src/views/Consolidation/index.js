import React, { useState, useContext } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Context } from '../../common/context/context';
import { getAll } from '../../services/office';
import { Container } from './styles';

const Consolidation = () => {
  const [info, setInfo] = useState([]);
  const [search, setSearch] = useState({ search: '', page: 0, limit: 10 });
  const { setLoading } = useContext(Context);

  const handleChange = (key, value) => {
    setSearch({ ...search, [key]: value });
  };

  const handleGetTransactions = async () => {
    setLoading(true);
    const response = await getAll(search);

    if (response.success) {
      setInfo(response.data.data.users.users);
    }

    setLoading(false);
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Busque por CNPJ, razão social ou nome do contador"
            value={search.search}
            onKeyPress={(e) => e.key === 'Enter' && handleGetTransactions()}
            onChange={(e) => {
              handleChange('search', e.target.value);
            }}
          />
        </Col>
        <Col md={6}>
          <Button onClick={() => handleGetTransactions()}>Pesquisar</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo de Operação</th>
                <th>Entrada ou Saída</th>
                <th>CPF ou CNPJ</th>
                <th>Categoria do Pgto ou Recibimento</th>
                <th>Descrição do Realizador</th>
                <th>Documento</th>
                <th>Valor da Operção</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {info.map((user, index) => {
                return (
                  <tr style={{ cursor: 'pointer' }} key={index} onClick={() => {}}>
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
                    <td>{user.emailConfirmedAt}</td>
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
  );
};

export default Consolidation;
