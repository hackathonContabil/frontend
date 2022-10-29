import React, { useContext, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Context } from '../../../common/context/context';
import { maskCnpj } from '../../../common/utils/masks';
import { validateCnpj } from '../../../common/utils/validators';
import { create } from '../../../services/office';
import { useAlert } from 'react-alert';

const ModalCreateOffice = ({ openModal, handleCloseModal, isUpdate }) => {
  const [office, setOffice] = useState({ name: '', document: '' });
  const [nameError, setNameError] = useState(false);
  const [documentError, setDocumentError] = useState(false);
  const { setLoading } = useContext(Context);
  const alert = useAlert();

  const handleChange = (key, value) => {
    if ((key === 'document' && value.length < 19) || key === 'name') {
      setOffice({ ...office, [key]: value });
    }
  };

  const handleSubmit = async () => {
    const { name, document } = office;
    let isValid = true;

    office.document = document.replace(/[^0-9]+/g, '');

    if (name === '') {
      setNameError(true);
      isValid = false;
      alert.error('Razão social não pode estar em branco');
    }

    if (!validateCnpj(document.replace(/[^0-9]+/g, ''))) {
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

      handleCloseModal();

      return alert.success('Usuário cadastrado com sucesso!');
    }
  };

  const handleClearField = () => {
    setOffice({
      name: '',
      document: '',
    });

    setNameError(false);
    setDocumentError(false);
  };

  return (
    <Modal
      centered
      show={openModal}
      onHide={() => {
        handleCloseModal();
        handleClearField();
      }}>
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title>{isUpdate ? 'Editar Escritório' : 'Cadastre um novo escritório'}</Modal.Title>
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
        <Row className="d-flex justify-content-between w-100">
          <Col>{isUpdate && <Button variant="danger">Deletar Usuário</Button>}</Col>
          <Col className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => handleCloseModal()}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => handleSubmit()}>
              {isUpdate ? 'Salvar' : 'Cadastrar'}
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

ModalCreateOffice.propTypes = {
  openModal: PropTypes.bool,
  isUpdate: PropTypes.bool,
  handleCloseModal: PropTypes.func,
};

export default ModalCreateOffice;
