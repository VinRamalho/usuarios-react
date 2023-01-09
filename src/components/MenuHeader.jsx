import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  SmileOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import "./MenuHeader.css";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem(
    "Inicial",
    "1",
    <NavLink to="/">
      <HomeOutlined />
    </NavLink>
  ),
  getItem(
    "Seu status HTTP",
    "2",
    <NavLink to="/status-cat">
      <GlobalOutlined />
    </NavLink>
  ),
  getItem(
    "Random Dog",
    "3",
    <Link to="/dog-random">
      <SmileOutlined />
    </Link>
  ),
  getItem(
    "Crud cliente",
    "4",
    <Link to="/crud">
      <TeamOutlined />
    </Link>
  ),
];

const MenuHeader = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onClick = (e) => {
    console.log(e);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className="fix"
      style={{
        marginTop: 15,
        width: 250,
      }}
    >
      <Button
        className="fix"
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        className="fix"
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={onClick}
      />
    </div>
  );
};
export default MenuHeader;
