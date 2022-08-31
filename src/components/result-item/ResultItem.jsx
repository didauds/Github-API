import React from "react";
import { Link } from "react-router-dom";
import "./result-item.css";

const ResultItem = (props) => {
  const { description, name } = props;
  const { avatar_url, login } = props.owner;

  return (
    <Link to={`/repos/${login}/${name}`} className="item-card">
      <div className="item-card--image">
        <img src={avatar_url} alt={login} />
      </div>
      <div className="item-card--content">
        <h2>{name}</h2>
        <small>{description}</small>
        <p>View Commits</p>
      </div>
    </Link>
  );
};

export default ResultItem;
