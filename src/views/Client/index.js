import React, { useContext, useState } from 'react';
import { Button, Col, Form, Pagination, Row, Table } from 'react-bootstrap';
import { Context } from '../../common/context/context';
import ModalClient from './components/ModalClient';
import { Container } from './styles';

const Clients = () => {
  const [show, setShow] = useState(false);
  const [isUpdate, setIsUpate] = useState(false);
  const [search, setSearch] = useState('');
  const { setLoading } = useContext(Context);

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (value) => {
    setSearch(value);
  };

  const handleSubmit = async () => {
    let isValid = true;

    if (!isValid) return;

    console.log(search);

    setLoading(true);
    const response = '';
    setLoading(false);
  };

  return (
    <>
      <ModalClient openModal={show} handleCloseModal={handleClose} />

      <Container>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Busque por CNPJ, razão social ou nome do contador"
              value={search}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
            />
          </Col>
          <Col md={6}>
            <Button>Pesquisar</Button>
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
    </>
  );
};

export default Clients;
