import React from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { Card as CardAnt } from "antd";

const Card = (props) => {
  const { item } = props;
  const code = item.url.split("pokemon/")[1].slice(0, -1);

  return (
    <Link id={`card_${item.name}`} to={`/pokemon/${item.name}`}>
      <CardAnt
        bordered={false}
        hoverable
        cover={
          <div className="container-cover">
            <img
              alt={item.name}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${code}.png`}
            />
          </div>
        }
      >
        <CardAnt.Meta title={item.name} />
      </CardAnt>
    </Link>
  );
};

export default Card;
