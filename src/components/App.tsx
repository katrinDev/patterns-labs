import "antd/dist/reset.css";
import "./App.css";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Route, Routes } from "react-router-dom";
import Gallery from "../pages/CarouselPage";
import { Link } from "react-router-dom";
import BussesPage from "../pages/BusesPage";
import ProjectsPage from "../pages/ProjectsPage";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";

const { Header, Content, Footer } = Layout;

const links = [
  {
    key: "/",
    label: "Home",
  },
  {
    key: "/buses",
    label: "Buses",
  },
  {
    key: "/projects",
    label: "Projects",
  },
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
 const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      className="layout"
      style={{
        minHeight: "100vh",
        minWidth: "100vh"
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="light"
          mode="vertical"
          defaultSelectedKeys={["2"]}
          items={links.map((item) => ({
            key: item.key,
            label: <Link to={item.key}>{item.label}</Link>,
          }))}
        />
      </Sider>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer }}
        >
          <Routes>
            <Route path="/" element={<Gallery />}></Route>
            <Route path="/buses" element={<BussesPage />}></Route>
            <Route path="/projects" element={<ProjectsPage />}></Route>
          </Routes>
        </div>
      </Content>
    </Layout>
  );
};

export default App;
