import React, { useContext, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Context } from '../../../common/context/context';
import { maskCnpj } from '../../../common/utils/masks';
import { validateCnpj } from '../../../common/utils/validators';
import { create } from '../../../services/office';
import { useAlert } from 'react-alert';

const ModalUser = ({ openModal, handleCloseModal }) => {
  const [office, setOffice] = useState({ name: '', document: '' });
  const [nameError, setNameError] = useState(false);
  const [documentError, setDocumentError] = useState(false);
  const { setLoading } = useContext(Context);
  const alert = useAlert();

  const handleChange = (key, value) => {
    if ((key === 'document' && value.length < 21) || key === 'name') {
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

      return alert.success('Usuário cadastrado com sucesso!');
    }
  };

  const handleClearField = () => {
    setOffice({
      name: '',
      document: '',
    });
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
        <Modal.Title>Opções do Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="p-3">
          <Col md={12} className="d-flex justify-content-center">
            <Button className="w-50 mb-2">Ação </Button>
          </Col>
          <Col md={12} className="d-flex justify-content-center">
            <Button className="w-50 mb-2">Ação </Button>
          </Col>
          <Col md={12} className="d-flex justify-content-center">
            <Button className="w-50 mb-2">Ação </Button>
          </Col>
          <Col md={12} className="d-flex d-flex justify-content-center">
            <Button className="w-50">Ação </Button>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleCloseModal()}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => handleSubmit()}>
          Cadastrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalUser.propTypes = {
  openModal: PropTypes.bool,
  handleCloseModal: PropTypes.func,
};

export default ModalUser;
