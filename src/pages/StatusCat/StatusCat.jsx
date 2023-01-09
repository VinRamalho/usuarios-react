import { Col, Row } from "antd";
import React from "react";
import MenuHeader from "../../components/MenuHeader";

const StatusCat = () => {
  return (
    <>
      <Row>
        <Col push={1}>
          <MenuHeader />
        </Col>
        <Col push={3}>
          <h1>Você esta na status cat</h1>
        </Col>
      </Row>
    </>
  );
};

export default StatusCat;
