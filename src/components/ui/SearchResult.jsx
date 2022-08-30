import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ repo }) => {
  return (
    <div className="repo">
      <div className="image">
        <img src={repo.owner.avatar_url} alt={repo.owner.login} />
      </div>

      <div className="repo-info">
        <h3>{repo.owner.login}</h3>
        <a href={repo.clone_url} target="_blank" rel="noreferrer">
          {repo.clone_url}
        </a>
        <p>{repo.description}</p>
        <Link to={`/repos/${repo.owner.login}/${repo.name}`}>
          Click to view commits
        </Link>
      </div>
    </div>
  );
};

export default SearchResult;
