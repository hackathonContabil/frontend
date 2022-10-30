import React, { useState, useContext, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Context } from '../../common/context/context';
import { exportBankingReconciliation, exportCashFlow, getAll } from '../../services/consolidation';
import { Container } from './styles';
import './styles.css';

const Consolidation = () => {
  const [info, setInfo] = useState([]);
  const [search, setSearch] = useState({ from: '', to: '', page: 0, limit: 10 });
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
  }, []);

  const handleExportCashFlow = async () => {
    setLoading(true);

    const response = await exportCashFlow(id, search);

    if (!response.success) {
      return alert.error(response.message);
    }

    const href = window.URL.createObjectURL(new Blob([response.data], { type: 'application/csv' }));
    const link = document.createElement('a');

    link.href = href;
    link.setAttribute('download', 'fluxo-de-caixa.csv');
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(href);

    setLoading(false);
    return alert.success('Arquivo exportado com sucesso!');
  };

  const handleExportBankingReconciliation = async () => {
    setLoading(true);

    const response = await exportBankingReconciliation(id, search);

    if (!response.success) {
      return alert.error(response.message);
    }

    const href = window.URL.createObjectURL(new Blob([response.data], { type: 'application/csv' }));
    const link = document.createElement('a');

    link.href = href;
    link.setAttribute('download', 'conciliacao-bancaria.csv');
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(href);

    setLoading(false);
    return alert.success('Arquivo exportado com sucesso!');
  };

  return (
    <Container>
      <Row className="mb-3 w-100 mw-100">
        <Col md={3}>
          <Form.Label>Data Inicial</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter email"
            value={search.from}
            onChange={(e) => handleChange('from', e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Label>Data Final</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter email"
            search={search.to}
            onChange={(e) => handleChange('to', e.target.value)}
          />
        </Col>
        <Col md={3} className="d-flex justify-content-start align-items-end">
          <Button onClick={() => handleGetTransactions()}>Pesquisar</Button>
        </Col>
      </Row>
      <Row className="overflow-auto w-100 mw-100">
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
      <Row className="w-100 mw-100">
        <Col className="d-flex justify-content-start align-items-end">
          <Button className={'mr-2'} onClick={() => handleExportCashFlow()}>
            Exportar Fluxo de Caixa
          </Button>
          <Button className={'ml-2'} onClick={() => handleExportBankingReconciliation()}>
            Exportar Consolidação Bancária
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Consolidation;
