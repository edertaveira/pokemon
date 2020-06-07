import React from "react";
import HandyAuth from "./common/HandyAuth";
import { Provider } from "react-redux";
import Loadable from "react-loadable";
import PageLoading from "./common/PageLoading";
import { Layout } from "antd";
import configureStore from "./storage/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import moment from "moment";
import momentPTBR from "./common/constants/momentPTBR";
import "./App.scss";
import Container from "./common/Container";
import { FaCopyright } from "react-icons/fa";

const renderComponent = (AsyncFunc) => {
  moment.locale("pt-BR", momentPTBR);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Link to="/" style={{ margin: "auto" }}>
        <img alt="logo" src="/images/logo.png" className="logo" />
      </Link>
      <Container AsyncFunc={AsyncFunc} />
    </Layout>
  );
};

const asyncDashboard = Loadable({
  loader: () => import("./components/Dashboard"),
  loading: PageLoading,
});

const asyncCard = Loadable({
  loader: () => import("./components/Details"),
  loading: PageLoading,
});

const { store, persistor } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path={"/"} render={() => renderComponent(asyncDashboard)} />
          <Route exact path={"/pokemon/:id"} render={() => renderComponent(asyncCard)} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
