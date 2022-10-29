import React, { useContext } from 'react';
import { Alert, Button, Col, Modal, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Context } from '../../../common/context/context';
import { useAlert } from 'react-alert';
import { active } from '../../../services/client';
import { useHistory } from 'react-router';

const ModalClient = ({ openModal, handleCloseModal, user }) => {
  const { setLoading } = useContext(Context);
  const alert = useAlert();
  const history = useHistory();

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

  const handleTransactions = (id) => {
    history.push('/contador/consolidacao/' + id);
  };

  return (
    <Modal centered show={openModal} onHide={() => handleCloseModal()}>
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title>Opções do Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="p-3">
          <Col md={12} className="d-flex justify-content-center">
            {!user.emailActive && (
              <Alert key="info" variant="info" className="mb-3">
                E-mail do usuário não confirmado
              </Alert>
            )}
          </Col>
          <Col md={12} className="d-flex justify-content-center">
            <Button
              disabled={user.isActive || !user.emailActive}
              onClick={() => handleActiveUser(user.id)}
              className="w-50 mb-3">
              Ativar Usuário
            </Button>
          </Col>
          <Col md={12} className="d-flex justify-content-center">
            <Button onClick={() => handleTransactions(user.id)} className="w-50">
              Acessar Transações
            </Button>
          </Col>
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

ModalClient.propTypes = {
  openModal: PropTypes.bool,
  user: PropTypes.object,
  handleCloseModal: PropTypes.func,
};

export default ModalClient;
