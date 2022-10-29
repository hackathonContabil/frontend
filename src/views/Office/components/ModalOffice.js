import React, { useContext, useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Context } from '../../../common/context/context';
import { maskCnpj } from '../../../common/utils/masks';
import { validateCnpj } from '../../../common/utils/validators';
import { create, removeOffice } from '../../../services/office';
import { useAlert } from 'react-alert';

const ModalCreateOffice = ({ openModal, handleCloseModal, isUpdate, officeInfo }) => {
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

    office.document = document.replace(/[^0-9]+/g, '');

    setLoading(true);
    const response = await create(office);
    setLoading(false);

    if (!response.success) {
      handleChange('document', maskCnpj(document));
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

  const handleDeleteUser = async () => {
    setLoading(true);
    const response = await removeOffice(officeInfo.id);
    setLoading(false);

    if (!response.success) {
      return alert.error(response.message);
    } else {
      handleSubmit();
      handleCloseModal();
      return alert.success('Usuário removido com sucesso!');
    }
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
        <Modal.Title>
          {isUpdate ? 'Opções do Escritório' : 'Cadastre um novo escritório'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="p-3">
          {isUpdate ? (
            <Col md={12} className="d-flex justify-content-center">
              <Button className="w-100" variant="danger" onClick={() => handleDeleteUser()}>
                Deletar Usuário
              </Button>
            </Col>
          ) : (
            <Col md={12} className="d-flex justify-content-center">
              <Form className="w-100">
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
            </Col>
          )}

          {isUpdate && (
            <Alert key={'danger'} variant={'danger'} className="mt-5 text-center">
              Ao remover um escritório, todos os itens associados serão removidos.
            </Alert>
          )}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Row className="d-flex justify-content-center w-100">
          <Col className="d-flex justify-content-center">
            <Button variant="secondary" onClick={() => handleCloseModal()}>
              Fechar
            </Button>
          </Col>
          {!isUpdate && (
            <Col className="d-flex justify-content-center">
              <Button variant="primary" onClick={() => handleSubmit()}>
                Cadastrar
              </Button>
            </Col>
          )}
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

ModalCreateOffice.propTypes = {
  openModal: PropTypes.bool,
  isUpdate: PropTypes.bool,
  officeInfo: PropTypes.object,
  handleCloseModal: PropTypes.func,
};

export default ModalCreateOffice;
