import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Input, Row, Col, message } from "antd";
import Seo from "../common/Seo";
import axios from "axios";
import { endpoint } from "../common/constants/endpoint";
import { searching } from "../reducers/actions/commonActions";
import Cards from "./Cards";
import "./Dashboard.scss";

const limit = 20;
const errorMessage = "Something wrong. Sorry for that. Try again. :/ ";

const Dashboard = (props) => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  const onSearch = async (value) => {
    if (value === "") return;
    try {
      setLoadingSearch(true);
      const result = await axios.get(`${endpoint}pokemon/${value.toLowerCase()}`);
      setLoadingSearch(false);
      props.dispatch(searching(value));
      props.history.push(`/pokemon/${result.data.name}`);
    } catch (error) {
      if (error.response.status) {
        message.error("Pokemon Not found!");
      } else {
        message.error(errorMessage);
      }
      setLoadingSearch(false);
    }
  };

  const onChange = (event) => {
    if (event.target.value === "") onSearch(null);
  };

  const getList = () => {
    setLoading(true);
    axios
      .get(`${endpoint}pokemon?limit=${limit}&offset=${(page - 1) * limit}`)
      .then((response) => {
        setList(list.concat(response.data.results));
        setTotal(response.data.count);
        setPage(page + 1);
        setLoading(false);
      })
      .catch((error) => {
        message.error(errorMessage);
        setLoading(false);
      });
  };

  return (
    <div className="dashboard">
      <Seo title="Dashboard" />

      <Row>
        <Col lg={{ span: 8, offset: 8 }} md={{ span: 10, offset: 7 }} sm={{ span: 24 }} xs={{ span: 24 }}>
          <Input.Search
            allowClear={true}
            defaultValue={props.searchValue}
            onChange={onChange}
            placeholder="Input search to get a Pokemon. :)"
            onSearch={onSearch}
            loading={loadingSearch}
          />
        </Col>
      </Row>
      <Cards list={list} total={total} loading={loading} hasMore={hasMore} setHasMore={setHasMore} getList={getList} />
    </div>
  );
};

const mapStateToProps = (appState) => ({
  searchValue: appState.common.search,
});
export default withRouter(connect(mapStateToProps)(Dashboard));
