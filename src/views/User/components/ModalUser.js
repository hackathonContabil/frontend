import React, { useContext } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Context } from '../../../common/context/context';
import { useAlert } from 'react-alert';
import { active } from '../../../services/user';

const ModalUser = ({ openModal, handleCloseModal, user }) => {
  const { setLoading } = useContext(Context);
  const alert = useAlert();

  const handleActiveUser = async (userId) => {
    setLoading(true);
    const response = await active(userId);
    setLoading(false);

    if (!response.success) {
      handleCloseModal();
      return alert.error(response.message);
    }

    handleCloseModal();
    return alert.success('Usuário ativado com sucesso');
  };

  return (
    <Modal centered show={openModal} onHide={() => handleCloseModal()}>
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title>Opções do Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="p-3">
          {user.type === 'accountant' ? (
            <>
              <Col md={12} className="d-flex justify-content-center">
                <Button
                  disabled={user.isActive}
                  onClick={() => handleActiveUser(user.id)}
                  className="w-50 mb-2">
                  Ativar Usuário
                </Button>
              </Col>
              <Col md={12} className="d-flex justify-content-center">
                <Button disabled={true} className="w-50 mb-3">
                  ...
                </Button>
              </Col>
            </>
          ) : user.type === 'admin' ? (
            <>
              <Col md={12} className="d-flex justify-content-center">
                <Button disabled={true} className="w-50 mb-3">
                  ...
                </Button>
              </Col>
              <Col md={12} className="d-flex justify-content-center">
                <Button disabled={true} className="w-50 mb-3">
                  ...
                </Button>
              </Col>
              <Col md={12} className="d-flex justify-content-center"></Col>
            </>
          ) : (
            <>
              <Col md={12} className="d-flex justify-content-center">
                <Button disabled={true} className="w-50 mb-3">
                  ...
                </Button>
              </Col>
              <Col md={12} className="d-flex justify-content-center">
                <Button disabled={true} className="w-50 mb-3">
                  ...
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="secondary" onClick={() => handleCloseModal()}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalUser.propTypes = {
  openModal: PropTypes.bool,
  user: PropTypes.object,
  handleCloseModal: PropTypes.func,
};

export default ModalUser;
