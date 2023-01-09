import React, { useState } from "react";
import { Col, Row, Card, Skeleton, Avatar, Button, Modal, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  UserOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import MenuHeader from "../../components/MenuHeader";
const { confirm } = Modal;

const Crud = () => {
  // const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(null);

  const showDeleteConfirm = () => {
    confirm({
      title: "Deseja mesmo excluir este usuario?",
      icon: <ExclamationCircleFilled />,
      content: "Você apagara esse usuario",
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <Row>
        <Col push={1}>
          <MenuHeader />
        </Col>
        <Col push={3}>
          <div className="container">
            <Button
              type="primary"
              shape="round"
              icon={<UserAddOutlined />}
              size={"large"}
              style={{ width: "100%" }}
              onClick={() => {
                setOpen(true);
                setTitle("Adicionar usuario");
              }}
            />

            <Card
              className="card"
              key={""}
              style={{ width: 550, marginTop: 16 }}
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    setOpen(true);
                    setTitle("Editar usuario");
                  }}
                />,
                <DeleteOutlined key="delete" onClick={showDeleteConfirm} />,
              ]}
            >
              <Skeleton
                loading={false}
                avatar
                active
                paragraph={{
                  rows: 3,
                }}
              >
                <div className="avatar-group">
                  <Avatar shape="circle" icon={<UserOutlined />} />
                  <p>
                    <b>USERNAME</b>
                  </p>
                </div>

                <p>Nome: nome sobrenome</p>
                <p> Email: email</p>
                <p>Cidade: cidade</p>
                <p>Idade: idade</p>
              </Skeleton>
            </Card>

            <Modal
              title={title}
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width={1000}
              style={{
                top: 20,
              }}
            >
              <Input
                size="large"
                placeholder="Username"
                prefix={<UserOutlined />}
              />
              <br />
              <br />
              <Input
                size="large"
                placeholder="Nome"
                prefix={<UserOutlined />}
              />
              <br />
              <br />
              <Input
                size="large"
                placeholder="Email"
                prefix={<UserOutlined />}
              />
            </Modal>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Crud;
