import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Pagination, Row, Table } from 'react-bootstrap';
import { Context } from '../../common/context/context';
import { maskCnpj } from '../../common/utils/masks';
import { getAll } from '../../services/office';
import ModalOffice from './components/ModalOffice';
import { Container } from './styles';

const Offices = () => {
  const [show, setShow] = useState(false);
  const [isUpdate, setIsUpate] = useState(false);
  const [search, setSearch] = useState({ search: '', page: 0, limit: 10 });
  const [office, setOffice] = useState({ id: '' });
  const [info, setInfo] = useState([]);
  const { setLoading } = useContext(Context);

  useEffect(() => handleSubmit(), info);

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (value) => {
    setSearch(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await getAll(search);

    if (response.success) {
      response.data.data.offices.map((office) => {
        office.document = handleMask(office.document, 'document');
      });

      setInfo(response.data.data.offices);
    }

    setLoading(false);
  };

  const handleMask = (data, type) => {
    if (type === 'document') {
      if (data != null) {
        const maskedCnpj = maskCnpj(data);

        return maskedCnpj;
      }
    }
  };

  const handleOffice = (e) => {
    setOffice({ id: e.id });

    setShow(true);
  };

  return (
    <>
      <ModalOffice
        openModal={show}
        handleCloseModal={handleClose}
        isUpdate={isUpdate}
        officeInfo={office}
      />

      <Container>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Busque por CNPJ ou razão social"
              value={search.search}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
            />
          </Col>
          <Col md={6} className="d-flex justify-content-between">
            <Button onClick={() => handleSubmit()}>Pesquisar</Button>
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
                {info.map((office, index) => {
                  return (
                    <tr
                      style={{ cursor: 'pointer' }}
                      key={index}
                      onClick={() => {
                        handleOffice(office);
                        setIsUpate(true);
                      }}>
                      <td>{office.id}</td>
                      <td>{office.document}</td>
                      <td>{office.name}</td>
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
