import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import "./home.css";
import Loading from "../../components/ui/Loading";
import ScrollToTopButton from "../../components/ui/ScrollToTopButton";
import ResultList from "../../components/Results-list/ResultsList";

const Home = () => {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [loading, setLoading] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [error, setError] = useState(false);

  const handleQueryInput = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  /** Fetch GitHub API, sort by number of Stars in descending order */
  const fetchRepos = async () => {
    setShowScrollToTop(false);
    setShowLoadMoreBtn(false);
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
      setShowLoadMoreBtn(true);
      setShowScrollToTop(true);
      return data?.items;
    } catch (error) {
      console.error(error);
      setError(true);
      return null;
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setRepos([]);
    setPage(1);
    // setLimit(30);

    if (query) {
      const fetchedRepos = await fetchRepos();
      setRepos(fetchedRepos);
    } else {
      setRepos(null);
    }
  };

  useEffect(() => {
    const displayReposOnChange = async () => {
      if (query) {
        const items = await fetchRepos();
        setRepos(items);
      }
    };
    displayReposOnChange();
  }, [page, limit]);

  const loadMore = () => {
    setLimit(limit + 30);
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <main
      style={
        repos && repos.length !== 0
          ? { height: "100%" }
          : { height: "calc(100vh - 9rem + 40px)" }
      }
    >
      <div className="container">
        <div className="search-form">
          <form>
            <label>Repository</label>
            <input value={query} onChange={handleQueryInput} type="text" />
            <button onClick={handleSearch}>Search</button>
          </form>
        </div>
        <div className="search-results">
          {error && (
            <div className="error">
              <h2>Ooops! Looks like something went wrong.</h2>
              <Link to="/">
                <button onClick={refreshPage}>Refresh the page</button>
              </Link>
            </div>
          )}
          {repos ? (
            <ResultList results={repos} />
          ) : (
            <h2>There is nothing to display.</h2>
          )}
        </div>

        {showLoadMoreBtn && repos && (
          <div className="load-more--btn">
            <button onClick={loadMore}>Load More</button>
          </div>
        )}
        {showScrollToTop && repos && <ScrollToTopButton />}

        {loading && <Loading />}
      </div>
    </main>
  );
};

export default Home;
