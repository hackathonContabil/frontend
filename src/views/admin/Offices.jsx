import React, { useState, useContext } from 'react';
import { useAlert } from 'react-alert';
import { Button, Col, Form, Modal, Pagination, Row, Table } from 'react-bootstrap';
import { Context } from '../../common/context/context';
import { maskCnpj } from '../../common/utils/masks';
import { validateCnpj } from '../../common/utils/validators';
import { create } from '../../services/office';
import { Container } from './styles';

const Offices = () => {
  const [show, setShow] = useState(false);
  const [office, setOffice] = useState({ name: '', document: '' });
  const [nameError, setNameError] = useState(false);
  const [documentError, setDocumentError] = useState(false);
  const { setLoading } = useContext(Context);
  const alert = useAlert();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (key, value) => {
    if ((key === 'document' && value.length < 21) || key === 'name') {
      setOffice({ ...office, [key]: value });
    }
  };

  const handleSubmit = async () => {
    const { name, document } = office;
    let isValid = true;

    if (name === '') {
      setNameError(true);
      isValid = false;
      alert.error('Razão social não pode estar em branco');
    }

    if (!validateCnpj(document)) {
      setDocumentError(true);
      isValid = false;
      alert.error('CNPJ inválido');
    }

    if (!isValid) return;

    setLoading(true);
    const response = await create(office);
    setLoading(false);

    if (!response.success) {
      return alert.error(response.message);
    } else {
      setOffice({
        name: '',
        document: '',
      });
      setShow(false);
      return alert.success('Usuário cadastrado com sucesso!');
    }
  };

  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Cadastre um novo escritório</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                isInvalid={nameError}
                type="email"
                placeholder="Razão Social"
                autoFocus
                value={office.name}
                onChange={(e) => {
                  handleChange('name', e.target.value);
                  setNameError(false);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="CNPJ"
                isInvalid={documentError}
                value={office.document}
                onChange={(e) => {
                  handleChange('document', maskCnpj(e.target.value));
                  setDocumentError(false);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control placeholder="Busque por CNPJ, razão social ou nome do contador" />
          </Col>
          <Col md={6} className="d-flex justify-content-between">
            <Button>Pesquisar</Button>
            <Button variant="success" onClick={() => setShow(true)}>
              Cadastrar Novo Escritório
            </Button>
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

export default Offices;
