import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import axios from "../../utils/axios";
import "./commits.css";
import Loading from "../../components/ui/Loading";
import ScrollToTopButton from "../../components/ui/ScrollToTopButton";

const Commits = () => {
  const params = useParams();

  const { login, name } = params;

  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    /** Fetch GitHub API for commits, default 30 most recent results  */
    const fetchCommits = async () => {
      try {
        const { data } = await axios.get(`repos/${login}/${name}/commits`, {
          params: {
            per_page: 30,
          },
        });
        setCommits(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };
    fetchCommits();
  }, [login, name]);

  return (
    <div className="container">
      <Link to="/" className="back">
        <button>Back</button>
      </Link>
      <div className="repo-information">
        <h2>Username: {login}</h2>
        <h2>Repository: {name}</h2>
      </div>
      <div className="commits">
        {error && (
          <div className="error">
            <h2>Ooops! Looks like something went wrong.</h2>
            <Link to="/">
              <button>Go back to Home</button>
            </Link>
          </div>
        )}
        {loading && <Loading />}
        {commits && commits.length !== 0
          ? commits.map((commit) => {
              const { committer, message } = commit.commit;
              const { node_id, html_url } = commit;

              return (
                <ul className="commit-content" key={node_id}>
                  <li>Date: {moment(committer.date).format("LLLL")}</li>
                  <li>Committer: {committer.name}</li>
                  <li>Message: {message}</li>
                  <li>
                    <a href={html_url} target="_blank" rel="noreferrer">
                      Click to view this commit
                    </a>
                  </li>
                </ul>
              );
            })
          : !loading && <h2>No commits for this user.</h2>}
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default Commits;
