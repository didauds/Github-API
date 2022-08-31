import React from 'react'
import { Link } from 'react-router-dom';
import "./result-item.css";

const ResultItem = (props) => {
  console.log(props)
  return (
    <Link to={`/repos/${props.owner.login}/${props.name}`} className='item-card'>
      <div className="item-card--image">
        <img src={props.owner.avatar_url} alt={props.owner.login} />
      </div>
      <div className="item-card--content">
        <h3>{props.owner.login}</h3>
        <span>
          View Profile
        </span>
      </div>
    </Link>
  )
}

export default ResultItem