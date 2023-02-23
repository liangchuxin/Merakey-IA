import "../styles/search.scss";
import searchIco from "../images/search.svg";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
export function Search(props) {
  const [searchState, setSearchState] = React.useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const mountedRef = React.useRef(true); // ← the "flag"

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          closeSearch();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  React.useEffect(() => {
    if (props.show) {
      openSearch();
    } else {
      closeSearch();
    }
  });
  React.useEffect(() => {
    // 我也搞不懂 ref，所以此处用了个不用 ref 自动选择的笨方法
    if (mountedRef.current) {
      mountedRef.current = false;
    } else {
      if (searchState) {
        document.getElementById("searchfield").focus();
      }
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(query);
    navigate(`/search/${query}`);
    closeSearch();
    props.closeParent(false);
    return false;
  };
  const closeSearch = (e) => {
    setSearchState(false);
    props.closeParent(false);
  };
  const openSearch = () => {
    setSearchState(true);
  };
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };
  // React.useEffect(() => {
  if (searchState === true) {
    return (
      <>
        <div className="search-box-backdrop">
          <div className="search">
            <form
              class="search-form"
              name="search"
              ref={wrapperRef}
              onSubmit={(e) => handleSubmit(e)}
            >
              <input
                class="search-field"
                id="searchfield"
                type="text"
                name="q"
                placeholder="Search games and subject topics…"
                onChange={(event) => setQuery(event.target.value)}
              />
              <button
                class="appear-button always-appear"
                type="button"
                id="searchsubmit"
                onClick={(e) => handleSubmit(e)}
              >
                <img className="search-icon" src={searchIco} />
                <i class="icon icon-search" aria-hidden="true"></i>
              </button>
              <button class="search-button" onClick={(e) => handleSubmit(e)}>
                <i class="icon icon-search" aria-hidden="true"></i>
              </button>
            </form>
          </div>
          <button
            onClick={() => closeSearch()}
            class="search-wrapper-close"
            aria-label="Close"
          ></button>
        </div>
      </>
    );
  } else if (searchState === false) {
    return null;
  }
}
