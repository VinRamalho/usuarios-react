import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ContainerOutlined,
  RedditOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import "./MenuHeader.css";
import { dblClick } from "@testing-library/user-event/dist/click";
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
    "Status",
    "2",
    <NavLink to="/status-cat">
      <RedditOutlined />
    </NavLink>
  ),
  getItem("Option 3", "3", <ContainerOutlined />),
  getItem("Option 7", "4", <ContainerOutlined />),
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
