import React from 'react';
import { Col, Form, Pagination, Row, Table } from 'react-bootstrap';
import { Container } from './styles';

const Users = () => {
  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-start">
          <Form.Control
            className="w-50 mb-3"
            placeholder="Busque por CNPJ, razão social ou nome do contador"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Escritório</th>
                <th>Telefone</th>
                <th>Documento</th>
                <th>Função</th>
                <th>Data de Criação</th>
                <th>Compartilha Informações Bancárias</th>
                <th>Dados Validados</th>
                <th>Ativo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
