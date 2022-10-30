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

  useEffect(() => handleSubmit(), []);

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (key, value) => {
    setSearch({ ...search, [key]: value });
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
        <Row className="mb-3 w-100 mw-100">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Busque por CNPJ ou razão social"
              value={search.search}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              onChange={(e) => {
                handleChange('search', e.target.value);
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
        <Row className="overflow-auto w-100 mw-100">
          <Col>
            <table className="fl-table">
              {' '}
              <thead>
                <tr>
                  <th>CNPJ</th>
                  <th>Razão Social</th>
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
                      <td>{office.name}</td>
                      <td>{office.document}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="mt-2 w-100 mw-100">
          <Col className="d-flex justify-content-end">
            <div className="pagination">
              <a style={{ fontSize: '12px' }}>&laquo;</a>
              <a style={{ fontSize: '12px' }}>1</a>
              <a style={{ fontSize: '12px' }}>2</a>
              <a style={{ fontSize: '12px' }}>3</a>
              <a style={{ fontSize: '12px' }}>4</a>
              <a style={{ fontSize: '12px' }}>5</a>
              <a style={{ fontSize: '12px' }}>6</a>
              <a style={{ fontSize: '12px' }}>&raquo;</a>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Offices;
