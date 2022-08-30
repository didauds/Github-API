import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import axios from "../../../axios";
import "./Repository.css";
import Loading from "../../ui/Loading";
import ScrollButton from "../../ui/ScrollButton";

const Repository = () => {
  const params = useParams();

  console.log("params", params);

  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchCommits = async () => {
      try {
        const { data } = await axios.get(
          `repos/${params.login}/${params.name}/commits`,
          {
            params: {
              per_page: 30,
            },
          }
        );
        setCommits(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCommits();
  }, []);

  return (
    <div className="container">
      <Link to="/" className="back">
        Back
      </Link>
      <div className="repo-information">
        <h2>Username: {params.login}</h2>
        <h2>Repository: {params.name}</h2>
      </div>
      <div className="commits">
        {loading && (
          <div className="loading-spinner">
            <Loading />
          </div>
        )}
        {commits ? (
          commits.map((commit) => {
            return (
              <ul className="commit-content" key={commit.node_id}>
                <li>
                  Date: {moment(commit.commit.committer.date).format("LLLL")}
                </li>
                <li>Committer: {commit.commit.committer.name}</li>
                <li>Message: {commit.commit.message}</li>
                <li>
                  <a href={commit.html_url} target="_blank">
                    Click to view this commit
                  </a>
                </li>
              </ul>
            );
          })
        ) : (
          <h2>No repos for this user...</h2>
        )}
      </div>
      <ScrollButton />
    </div>
  );
};

export default Repository;
