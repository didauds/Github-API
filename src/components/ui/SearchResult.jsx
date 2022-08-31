import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ repo }) => {

  const {description, name, clone_url: { repository_url } } = repo;
  const {avatar_url, login} = repo.owner;

  return (
    <div className="repo">
      <div className="image">
        <img src={avatar_url} alt={login} />
      </div>

      <div className="repo-info">
        <h3>{login}</h3>
        <a href={repository_url} target="_blank" rel="noreferrer">
          {repository_url}
        </a>
        <p>{description}</p>
        <Link to={`/repos/${login}/${name}`}>
          Click to view commits
        </Link>
      </div>
    </div>
  );
};

export default SearchResult;
