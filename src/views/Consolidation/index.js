import React, { useState, useContext, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Context } from '../../common/context/context';
import { maskCnpj } from '../../common/utils/masks';
import { getAll } from '../../services/consolidation';
import { Container } from './styles';

const Consolidation = () => {
  const [info, setInfo] = useState([]);
  const [search, setSearch] = useState({ page: 0, limit: 10 });
  const { setLoading } = useContext(Context);
  const { id } = useParams();
  const alert = useAlert();

  const handleChange = (key, value) => {
    setSearch((prev) => ({ ...prev, [key]: value }));
  };

  const handleGetTransactions = async () => {
    setLoading(true);

    const response = await getAll(id, search);

    if (!response.success) {
      return alert.error(response.message);
    }

    if (response.data.data.transactions.total === 0) {
      setLoading(false);

      return alert.info('Não foram encontradas transações para este cliente');
    } else {
      setLoading(false);

      return setInfo(response.data.data.transactions.transactions);
    }
  };

  useEffect(() => {
    handleGetTransactions();
  }, info);

  const handleExport = () => {
    return;
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col md={6}>
          <Button onClick={() => handleExport()}>Exportar Transações</Button>
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
              {info.map((transaction, index) => {
                return (
                  <tr style={{ cursor: 'pointer' }} key={index} onClick={() => {}}>
                    <td>{transaction.id}</td>
                    <td>{transaction.createdAt}</td>
                    <td>{transaction.email}</td>
                    <td>{transaction.office}</td>
                    <td>{transaction.phone}</td>
                    <td>{transaction.document}</td>
                    <td>{transaction.createdAt}</td>
                    <td>{transaction.isSharingBankAccountData}</td>
                    <td>{transaction.isEmailConfirmed}</td>
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
