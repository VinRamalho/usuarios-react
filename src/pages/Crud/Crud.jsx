import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  Image,
  Card,
  CalendarOutlined,
  EllipsisOutlined,
  EditOutlined,
  Skeleton,
  Avatar,
} from "antd";
import MenuHeader from "../../components/MenuHeader";

const Crud = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Row>
        <Col push={1}>
          <MenuHeader />
        </Col>
        <Col push={5}>
          <div className="container">
            <h1 style={{ color: "white" }}>Você está no Crud</h1>
          </div>

          <Card
            className="card"
            key={""}
            style={{ width: 550, marginTop: 16 }}
            actions={[
              <CalendarOutlined key="CalendarOutlined" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Skeleton
              loading={loading}
              avatar
              active
              paragraph={{
                rows: 3,
              }}
            >
              <div className="avatar-group">
                <Avatar shape="circle" src={""} />
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
        </Col>
      </Row>
    </>
  );
};

export default Crud;
