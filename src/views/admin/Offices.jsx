import React from 'react';
import { Col, Form, FormText, Pagination, Row, Table } from 'react-bootstrap';
import { Container } from './styles';

const Offices = () => {
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
                <th>Razão Social</th>
                <th>CNPJ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry the Bird</td>
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

export default Offices;
