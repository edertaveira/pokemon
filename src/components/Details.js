import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  Spin,
  message,
  Card,
  Col,
  Row,
  List,
  Divider,
  Typography,
  PageHeader,
  Tabs,
  Affix,
  Collapse,
  Descriptions,
} from "antd";
import Seo from "../common/Seo";
import { LoadingOutlined } from "@ant-design/icons";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { endpoint } from "../common/constants/endpoint";

import "./Details.scss";

const Details = (props) => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingAbility, setLoadingAbility] = useState(false);
  const [ability, setAbility] = useState(null);
  const [loadingForm, setLoadingForm] = useState(false);
  const [form, setForm] = useState(null);

  useEffect(() => {
    getCard();
  }, []);

  function getCard() {
    const id = props.match.params.id;
    setLoading(true);
    axios
      .get(endpoint + "pokemon/" + id)
      .then((result) => {
        const res = result.data;
        if (res) {
          setCard(res);
          getForms(res);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  async function onChangeAbility(value) {
    if (!value) return;
    const ability = card.abilities.find((item) => item.ability.name === value);
    setLoadingAbility(true);
    const result = await axios.get(ability.ability.url);
    setAbility(result.data);
    setLoadingAbility(false);
  }

  async function getForms(card) {
    if (!card.forms[0]) return;
    setLoadingForm(true);
    const result = await axios.get(card.forms[0].url);
    setForm(result.data);
    setLoadingForm(false);
  }

  return (
    <div>
      <Seo title={`${card ? card.name : "Details Page"}`} />
      <Spin style={{ color: "#FFFFFF" }} indicator={<LoadingOutlined />} spinning={loading}>
        <PageHeader
          onBack={() => window.history.back()}
          className="site-page-header"
          title={
            card && (
              <React.Fragment>
                <img
                  alt={card.name}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${card.id}.png`}
                />
                {card.name}
              </React.Fragment>
            )
          }
        />
        {card && (
          <Row gutter={16} className="container-internal">
            <Col lg={12} md={12} sm={24} xs={24}>
              <Divider orientation="left">Moves</Divider>

              <List
                pagination={{ size: "small" }}
                bordered={false}
                dataSource={card && card.moves}
                renderItem={(item) => <List.Item style={{ color: "#ffffff" }}>{item.move.name}</List.Item>}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Divider orientation="left">Abilities</Divider>

              <Collapse accordion={true} onChange={onChangeAbility} bordered={false}>
                {card.abilities.map((item) => {
                  const entry = ability && ability.effect_entries.find((item) => item.language.name === "en");

                  return (
                    <Collapse.Panel
                      header={item.ability.name}
                      key={item.ability.name}
                      className="site-collapse-custom-panel"
                    >
                      <Spin spinning={loadingAbility} indicator={<LoadingOutlined />}>
                        <h3>Effect Changes</h3>
                        {ability &&
                          ability.effect_changes &&
                          ability.effect_changes.map((item, index) => {
                            const changes = item.effect_entries.find((item) => item.language.name === "en");
                            return (
                              <p key={index}>
                                <FaArrowRight /> {changes && changes.effect}
                              </p>
                            );
                          })}

                        <Divider />
                        <h3>Effect Entries</h3>
                        <p>{entry && entry.effect}</p>
                      </Spin>
                    </Collapse.Panel>
                  );
                })}
              </Collapse>

              <Divider orientation="left">Form</Divider>
              <Spin spinning={loadingForm} indicator={<LoadingOutlined />}>
                {form && (
                  <Descriptions title={form.name}>
                    <Descriptions.Item label="Is Batter Only?">{form.is_batter_only ? "Yes" : "No"}</Descriptions.Item>
                    <Descriptions.Item label="Is Default?">{form.is_default ? "Yes" : "No"}</Descriptions.Item>
                    <Descriptions.Item label="Is Mega?">{form.is_mega ? "Yes" : "No"}</Descriptions.Item>
                    <Descriptions.Item label="Order">{form.order}</Descriptions.Item>
                  </Descriptions>
                )}

                <Divider orientation="left">Sprites</Divider>

                {form &&
                  Object.entries(form.sprites).map(([key, value]) => {
                    return <img key={key} alt={key} src={value} />;
                  })}
              </Spin>
            </Col>
          </Row>
        )}
      </Spin>
    </div>
  );
};

export default withRouter(Details);
