/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import "../styles/ListUsers.css";
import {
  EditOutlined,
  EllipsisOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Card,
  Skeleton,
  Button,
  Calendar,
  Modal,
  Row,
  Col,
  Input,
  Pagination,
  AutoComplete,
} from "antd";
import Api from "../services/Api";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import dayLocaleData from "dayjs/plugin/localeData";
import MenuHeader from "./MenuHeader";

dayjs.extend(dayLocaleData);

const ListUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);
  const [paginationNumber, setpaginationNumber] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchApi = async () => {
    setLoading(true);
    try {
      const response = await Api.get(
        "?inc=name,location,email,login,dob,picture&page=1&results=15&seed=abc"
      );
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

  const filterFetch = async (event) => {
    const value = event.target.value;
    const response = await Api.get(
      `?inc=name,location,email,login,dob,picture&page=1&results=15&seed=abc`
    );
    const userDataname = response.data.results;

    const filtro = userDataname.filter((res) => {
      return (
        res.login.username === value ||
        res.name.first === value ||
        res.email === value
      );
    });
    if (filtro.length > 0) {
      setUsers(filtro);
    }
    if (filtro.length === 0) {
      console.log(userDataname);
      // setUsers(userDataname);
      paginationChange(paginationNumber);
    }
  };

  const paginationChange = async (e) => {
    setpaginationNumber(e);
    const response = await Api.get(
      `?inc=name,location,email,login,dob,picture&page=${e}&results=15&seed=abc`
    );
    const userDataname = response.data.results;
    setUsers(userDataname);
    scroll(0, 0);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const onSearch = (searchText) => {
    let arrListUsers = [];
    let arrIndexUsers = [];

    users.forEach((element) => {
      arrListUsers.push(element.name.first);
      arrListUsers.push(element.email);
      arrListUsers.push(element.login.username);
    });
    arrListUsers.map((element, i) => {
      if (element.includes(searchText)) {
        arrIndexUsers.push({ label: element, value: element });
      }
    });
    setSearch(arrIndexUsers);
  };

  const onSelect = (data) => {
    const filtro = users.filter((res) => {
      return (
        res.login.username === data ||
        res.name.first === data ||
        res.email === data
      );
    });

    if (filtro.length > 0) {
      setUsers(filtro);
    }
  };

  return (
    <Row>
      <Col push={1}>
        <MenuHeader />
      </Col>
      <Col push={3}>
        <div className="container">
          <AutoComplete
            dropdownMatchSelectWidth={252}
            style={{
              width: 550,
            }}
            options={search}
            onSelect={onSelect}
            onSearch={onSearch}
          >
            <Input.Search
              onSearch={(event) => {
                filterFetch(event);
              }}
              onChange={(event) => {
                filterFetch(event);
              }}
              placeholder="Digite o nome"
              enterButton
              loading={loading}
              size="large"
            />
          </AutoComplete>

          {/* <Button
            style={{ marginTop: 16 }}
            type="primary"
            // icon={<PoweroffOutlined />}
            loading={loading}
            onClick={() => fetchApi()}
          >
            Atualizar
          </Button> */}
          {users.map((user, i) => {
            // console.log(user);
            return (
              <>
                <Card
                  className="card"
                  key={i}
                  style={{ width: 550, marginTop: 16 }}
                  actions={[
                    <CalendarOutlined
                      key="CalendarOutlined"
                      onClick={showModal}
                    />,
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
                      <Avatar shape="circle" src={user.picture.thumbnail} />
                      <p>
                        <b>{user.login.username}</b>
                      </p>
                    </div>

                    <p>
                      Nome: {user.name.first} {user.name.last}
                    </p>
                    <p> Email: {user.email}</p>
                    <p>Cidade: {user.location.city}</p>
                    <p>Idade: {user.dob.age}</p>
                  </Skeleton>
                </Card>
              </>
            );
          })}
          <Pagination
            style={{ color: "white" }}
            className="pagination"
            defaultCurrent={1}
            total={50}
            onChange={(e) => {
              paginationChange(e);
            }}
          />
          <Modal
            title="Agenda"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Calendar
              locale="pt-BR"
              className="site-calendar-demo-card"
              // style={{ width: 550 }}
              fullscreen={false}
              onPanelChange={onPanelChange}
            />
          </Modal>
        </div>
      </Col>
    </Row>
  );
};

export default ListUsers;
