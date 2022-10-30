import React, { useState, useContext, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Context } from '../../common/context/context';
import { getAll } from '../../services/consolidation';
import { Container } from './styles';
import './styles.css';

const Consolidation = () => {
  const [info, setInfo] = useState([]);
  const [search, setSearch] = useState({ initialDate: '', finalDate: '', page: 0, limit: 10 });
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
        <Col md={3}>
          <Form.Label>Data Inicial</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter email"
            value={search.initialDate}
            onChange={(e) => handleChange('initialDate', e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Label>Data Final</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter email"
            search={search.finalDate}
            onChange={(e) => handleChange('finalDate', e.target.value)}
          />
        </Col>
        <Col md={3} className="d-flex justify-content-start align-items-end">
          <Button onClick={() => handleGetTransactions()}>Pesquisar</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <table className="fl-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo de Operação</th>
                <th>Entrada ou Saída</th>
                <th>CPF ou CNPJ</th>
                <th>Categoria do Pgto ou Recebimento</th>
                <th>Descrição do Realizador</th>
                <th>Documento</th>
                <th>Valor da Operação</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {info.map((transaction, index) => {
                return (
                  <tr key={index}>
                    <td>{transaction.date}</td>
                    <td>{transaction.operationType}</td>
                    <td>{transaction.inOrOut}</td>
                    <td>{transaction.payerType}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.payerName}</td>
                    <td>{transaction.payerDocument}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.balance}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end ">
          <div className="pagination">
            <a href="#">&laquo;</a>
            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">6</a>
            <a href="#">&raquo;</a>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-start align-items-end">
          <Button onClick={() => handleExport()}>Exportar Transações</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Consolidation;
