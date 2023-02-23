import "../styles/homePage.scss";
import leaderboard from "../images/leaderboard.png";
import reload from "../images/refresh-cw.svg";
import storyList from "../images/free-and-premium.png";
import React, { useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const defaultCover =
    "https://cdn.jsdelivr.net/gh/liangchuxin/blog-files/img/20210607224729.png";
  const mountedRef = React.useRef(true); // ← the "flag"
  const [recent, setRecent] = React.useState(undefined);
  const [recentRandom, setRecentRandom] = React.useState([]);
  const [covers, setCovers] = React.useState([
    defaultCover,
    defaultCover,
    defaultCover,
    defaultCover,
    defaultCover,
    defaultCover,
  ]);
  const Grid = ({ num }) => {
    return (
      <div
        className="card story-card"
        style={{
          backgroundImage: `url(
                      "${covers[num]}"                  )`,
        }}
        onClick={() => navigate(`/games/${recentRandom[num][0]}`)}
      ></div>
    );
  };
  const getMultipleRandom = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };
  const getRecent = () => {
    fetch(`http://localhost:8080/api/games/recent/10`)
      .then((res) => res.json())
      .then((data) => {
        const recents = [];
        for (var i = 0; i < data.length; i++) {
          recents.push([data[i].id, data[i].coverR]);
        }
        setRecent(recents);
        return;
      });
  };
  React.useEffect(() => {
    console.log("第一次跑，获取故事和照片" + mountedRef.current);
    console.log("getRecent这段跑了");
    getRecent();
  }, []);

  // React.useEffect(() => {
  //   var array = getMultipleRandom(recent, 6);
  //   var dictionary = {};
  //   array.forEach(
  //     (key, i) =>
  //       (dictionary[key[0]] = { id: array[i][0], coverR: array[i][1] })
  //   );
  //   console.log("array0: " + array[0]);
  //   setRecentRandom(array);
  //   console.log("recent is updated a second time!");
  // }, [recent]);

  React.useEffect(() => {
    if (mountedRef.current === false) {
      // ← the trick

      // if (recent !== null && recent !== [undefined]) {
      console.log("Recent is not undefined. recent: " + recent);
      var array = getMultipleRandom(recent, 6);
      console.log("array0: " + array[0]);
      setRecentRandom(array);
      console.log("recent is updated a second time!");
      // } else {
      //   console.log("recent is null");
      // }
    }
  }, [recent]);

  React.useEffect(() => {
    if (mountedRef.current) {
      mountedRef.current = false;
    } else {
      if (recentRandom) {
        setCovers([
          recentRandom[0][1],
          recentRandom[1][1],
          recentRandom[2][1],
          recentRandom[3][1],
          recentRandom[4][1],
          recentRandom[5][1],
        ]);
      }
    }
  }, [recentRandom]);

  React.useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  var topId = 2;
  var cardIds = [1, 3, 4, 5, 6, 7];
  return (
    <div className="homePage">
      <div className="main-home">
        <div className="leaderboard-container">
          <h3>
            <span>Leader</span>board
          </h3>
          <div className="leaderboard">
            <img src={leaderboard} />
          </div>
        </div>
        <div className="new-feed">
          <div>
            <div>
              <div
                className="story-wide story-card"
                style={{
                  backgroundImage: `url(
                    "https://cdn.jsdelivr.net/gh/liangchuxin/blog-imgs/img/202209022318918.png"
                  )`,
                }}
                onClick={() => navigate(`/games/${topId}`)}
              ></div>
              <div className="story-grid">
                <Grid num={0} />
                <Grid num={1} />
                <Grid num={2} />
              </div>
              <div className="story-grid">
                <Grid num={3} />
                <Grid num={4} />
                <Grid num={5} />
              </div>
              <button className="story-card" onClick={() => getRecent()}>
                <img src={reload} /> Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="free-and-premium">
        <img src={storyList} />
      </div>
    </div>
  );
}
export default HomePage;
