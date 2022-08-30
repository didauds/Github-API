import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import SearchResult from "../../ui/SearchResult";
import "./Home.css";
import Loading from "../../ui/Loading";
import ScrollButton from "../../ui/ScrollButton";

const Home = () => {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleQueryInput = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  /** Fetch GitHub API, sort by number of Stars in descending order */
  const fetchRepos = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/search/repositories?q=${query}`, {
        params: {
          page,
          per_page: limit,
          sort: "stars",
          order: "desc",
        },
      });
      setLoading(false);
      return data?.items;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      const fetchedRepos = await fetchRepos();
      setRepos(fetchedRepos);
    } else {
      setRepos(null);
    }
  };

  const handlePrevPage = () => {
    setPage((page) => {
      if (page === 1) return page;
      else return page - 1;
    });
  };

  const handleNextPage = () => {
    setPage((page) => page + 1);
  };

  /** Handle number of Repo displaying on a page */
  const handlePageLimit = (e) => {
    const value = e.target.value;
    setLimit(parseInt(value));
  };

  useEffect(() => {
    setRepos([]);
    const displayReposOnChange = async () => {
      if (query) {
        const items = await fetchRepos();
        setRepos(items);
      }
    };
    displayReposOnChange();
  }, [page, limit]);

  return (
    <div className="container">
      <div className="search-form">
        <h2>Search GitHub Repository</h2>
        <form>
          <label>Repository</label>
          <input value={query} onChange={handleQueryInput} type="text" />
          <button onClick={handleSearch}>Search</button>
        </form>
        <div className="more-options">
          <label>
            <span>Per Page</span>
            <select onChange={handlePageLimit}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
          <div className="pagination">
            <button onClick={handlePrevPage}>prev</button>
            <button onClick={handleNextPage}>next</button>
          </div>
        </div>
      </div>
      <div className="search-results">
        {loading && (
          <div className="loading-spinner">
            <Loading />
          </div>
        )}

        {repos ? (
          repos.map((repo) => {
            return <SearchResult repo={repo} key={repo.id} />;
          })
        ) : (
          <h2>There is nothing to display</h2>
        )}
      </div>

      <ScrollButton />
    </div>
  );
};

export default Home;
