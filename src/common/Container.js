import React from "react";
import { Layout } from "antd";
import moment from "moment";
import { withRouter } from "react-router-dom";

const Container = (props) => {
  const { AsyncFunc } = props;
  return (
    <Layout className="site-layout">
      <Layout.Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        <AsyncFunc moment={moment} />
      </Layout.Content>
    </Layout>
  );
};
export default withRouter(Container);
