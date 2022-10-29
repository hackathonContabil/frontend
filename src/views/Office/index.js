import React, { useContext, useState } from 'react';
import { Button, Col, Form, Pagination, Row, Table } from 'react-bootstrap';
import { Context } from '../../common/context/context';
import ModalOffice from './components/ModalOffice';
import { Container } from './styles';

const Offices = () => {
  const [show, setShow] = useState(false);
  const [isUpdate, setIsUpate] = useState(false);
  const [search, setSearch] = useState('');
  const { setLoading } = useContext(Context);

  const handleClose = () => {
    setShow(false);
  };

  const info = [
    {
      teste: 'teste',
      teste2: 'teste',
      teste3: 'teste',
    },
    {
      teste: 'teste',
      teste2: 'teste',
      teste3: 'teste',
    },
    {
      teste: 'teste',
      teste2: 'teste',
      teste3: 'teste',
    },
    {
      teste: 'teste',
      teste2: 'teste',
      teste3: 'teste',
    },
  ];

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

  const handleOffice = (e) => {
    setShow(true);
  };

  return (
    <>
      <ModalOffice openModal={show} handleCloseModal={handleClose} isUpdate={isUpdate} />

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
          <Col md={6} className="d-flex justify-content-between">
            <Button>Pesquisar</Button>
            <Button
              variant="success"
              onClick={() => {
                setShow(true);
                setIsUpate(false);
              }}>
              Cadastrar Novo Escritório
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Razão Social</th>
                  <th>CNPJ</th>
                </tr>
              </thead>
              <tbody>
                {info.map((user, index) => {
                  return (
                    <tr
                      style={{ cursor: 'pointer' }}
                      key={index}
                      onClick={(e) => {
                        handleOffice(e);
                        setIsUpate(true);
                      }}>
                      <td>{user.teste}</td>
                      <td>{user.teste2}</td>
                      <td>{user.teste3}</td>
                    </tr>
                  );
                })}
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

export default Offices;
