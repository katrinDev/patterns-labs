import "antd/dist/reset.css";
import "./App.css";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Route, Routes } from "react-router-dom";
import Gallery from "../pages/CarouselPage";
import { Link } from "react-router-dom";
import BussesPage from "../pages/BusesPage";
import ProjectsPage from "../pages/ProjectsPage";

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

  return (
    <Layout
      className="layout"
      style={{
        height: "100vh",
      }}
    >
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={links.map((item) => ({
            key: item.key,
            label: <Link to={item.key}>{item.label}</Link>,
          }))}
        />
      </Header>
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
      <Footer style={{ textAlign: "center" }}>
        Bsuir ©2023 Created by Vlasov
      </Footer>
    </Layout>
  );
};

export default App;
