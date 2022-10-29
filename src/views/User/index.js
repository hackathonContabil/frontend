import React, { useContext, useState } from 'react';
import { useAlert } from 'react-alert';
import { Button, Col, Form, Pagination, Row, Table } from 'react-bootstrap';
import { Context } from '../../common/context/context';
import ModalUser from './components/ModalUser';
import { Container } from './styles';

const Users = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const alert = useAlert();

  const info = [
    {
      teste: 'teste',
      teste2: 'teste',
      teste3: 'teste',
      teste4: 'teste',
      teste5: 'teste',
      teste6: 'teste',
      teste7: 'teste',
      teste8: 'teste',
      teste9: 'teste',
      teste10: 'teste',
      teste11: 'teste',
    },
    {
      teste: 'teste',
      teste2: 'teste',
      teste3: 'teste',
      teste4: 'teste',
      teste5: 'teste',
      teste6: 'teste',
      teste7: 'teste',
      teste8: 'teste',
      teste9: 'teste',
      teste10: 'teste',
      teste11: 'teste',
    },
    {
      teste: 'teste',
      teste2: 'teste',
      teste3: 'teste',
      teste4: 'teste',
      teste5: 'teste',
      teste6: 'teste',
      teste7: 'teste',
      teste8: 'teste',
      teste9: 'teste',
      teste10: 'teste',
      teste11: 'teste',
    },
    {
      teste: 'teste',
      teste2: 'teste',
      teste3: 'teste',
      teste4: 'teste',
      teste5: 'teste',
      teste6: 'teste',
      teste7: 'teste',
      teste8: 'teste',
      teste9: 'teste',
      teste10: 'teste',
      teste11: 'teste',
    },
  ];

  const { setLoading } = useContext(Context);

  const handleClose = () => {
    setShow(false);
  };

  const handleUser = (e) => {
    setShow(true);
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
      <ModalUser openModal={show} handleCloseModal={handleClose} />

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
            <Button onClick={() => handleSubmit()}>Pesquisar</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Escritório</th>
                  <th>Telefone</th>
                  <th>Documento</th>
                  <th>Função</th>
                  <th>Data de Criação</th>
                  <th>Compartilha Informações Bancárias</th>
                  <th>Dados Validados</th>
                  <th>Ativo</th>
                </tr>
              </thead>
              <tbody>
                {info.map((user, index) => {
                  return (
                    <tr style={{ cursor: 'pointer' }} key={index} onClick={(e) => handleUser(e)}>
                      <td>{user.teste}</td>
                      <td>{user.teste2}</td>
                      <td>{user.teste3}</td>
                      <td>{user.teste4}</td>
                      <td>{user.teste5}</td>
                      <td>{user.teste6}</td>
                      <td>{user.teste7}</td>
                      <td>{user.teste8}</td>
                      <td>{user.teste9}</td>
                      <td>{user.teste10}</td>
                      <td>{user.teste11}</td>
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

export default Users;
