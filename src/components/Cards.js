import React from "react";
import { withRouter } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import { List, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Card from "./Card";

const Cards = (props) => {
  const { list, total, getList, setHasMore, loading, hasMore } = props;

  const handleInfiniteOnLoad = () => {
    if (list.length === total) {
      message.warning("Loaded all! :)");
      setHasMore(false);
      return;
    }
    getList();
  };

  return (
    <div className="infinite-container">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
      >
        <List
          grid={{
            gutter: 16,
            xs: 2,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={list}
          renderItem={(item) => (
            <List.Item>
              <Card item={item} />
            </List.Item>
          )}
        >
          {loading && hasMore && (
            <div className="loading-container">
              <Spin style={{ color: "#FFFFFF" }} indicator={<LoadingOutlined />} />
            </div>
          )}
        </List>
      </InfiniteScroll>
    </div>
  );
};

export default withRouter(Cards);
