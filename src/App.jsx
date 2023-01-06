/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import "./App.css";
import {
  EditOutlined,
  EllipsisOutlined,
  CalendarOutlined,
  UserOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Skeleton, DatePicker, Button, Calendar } from "antd";
import Api from "./services/Api";

const { Meta } = Card;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchApi = async () => {
    setLoading(true);
    try {
      const response = await Api.get("?results=10");
      const userData = response.data;
      setUsers(userData.results);
      setLoading(false);
    } catch (error) {
      return error;
    }
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format("DD-MM-YYYY"), mode);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="container">
      <Button
        style={{ marginTop: 16 }}
        type="primary"
        // icon={<PoweroffOutlined />}
        loading={loading}
        onClick={() => fetchApi()}
      >
        Buscar
      </Button>

      {/* <Calendar fullscreen={false} onPanelChange={onPanelChange} /> */}

      {users.map((user, i) => {
        console.log(user);
        return (
          <Card
            key={i}
            style={{ width: 300, marginTop: 16 }}
            actions={[
              <CalendarOutlined
                key="CalendarOutlined"
                onClick={
                  <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                }
              />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Skeleton loading={loading} avatar active>
              <Meta
                avatar={<Avatar shape="circle" src={user.picture.thumbnail} />}
                title={`${user.name.first} ${user.name.last}`}
                description={`
                Idade: ${user.dob.age}
                Cidade: ${user.location.city}
                `}
                cover={
                  <img
                    alt="Image"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
              />
            </Skeleton>
          </Card>
        );
      })}
    </div>
  );
};

export default App;
