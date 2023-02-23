import "../styles/gameDetails.scss";
import rating from "../images/rating.png";
import leaderboard from "../images/game-leaderboard.png";
// import cover from "../images/whodidit.png";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function nestComments(commentList) {
  const commentMap = {};

  // move all the comments into a map of id => comment
  commentList.forEach((comment) => (commentMap[comment.id] = comment));

  // console.log("CommentMap: " + JSON.stringify(commentMap));
  // iterate over the comments again and correctly nest the children
  commentList.forEach((comment) => {
    if (comment.parentId !== null) {
      const parent = commentMap[comment.parentId];
      // console.log("parent: " + JSON.stringify(parent));
      (parent.children = parent.children || []).push(comment);
    }
  });

  // filter the list to return a list of correctly nested comments
  return commentList.filter((comment) => {
    return comment.parentId === null;
  });
}
function Comment({ comment, level }) {
  // console.log(comment);
  if (!level) {
    var level = 0;
  }
  var user = comment.userId;
  var date = comment.createdAt.split("T")[0];
  var time = comment.createdAt.split("T")[1].split(".")[0];
  var content = comment.text;
  var children = comment.children;
  // console.log("level: " + JSON.stringify(level));
  if (level == 0) {
    // console.log(level);
    return (
      <div className="comment-block" key={comment.id}>
        <div className="comment-info">
          <div className="profile-container">
            <img src="https://cdn.jsdelivr.net/gh/liangchuxin/blog-files/img/20210315225826.jpg"></img>
            <span className="user-status gaming"></span>
          </div>
          <div className="username">
            <p>Cecelia Liang{user}</p>
          </div>
          <div className="separator"></div>
          <div className="date" title={time}>
            {date}
          </div>
        </div>
        <div className="comment-content">
          <p>{content}</p>
        </div>
        <div className="reply-comment">Reply</div>

        {children?.map((subChildren) => (
          <Comment comment={subChildren} level={level + 1} />
        ))}
      </div>
    );
  } else {
    return (
      // <div>
      //   <div key={comment.id}>
      //     User {user} replied on {date} at {time}: {content}
      //   </div>
      //   {children?.map((subChildren) => (
      //     <Comment comment={subChildren} level={level + 1} />
      //   ))}
      // </div>
      <div className="comment-block" key={comment.id}>
        <div className="comment-info">
          <div className="profile-container">
            <img src="https://cdn.jsdelivr.net/gh/liangchuxin/blog-files/img/20210315225826.jpg"></img>
            <span className="user-status gaming"></span>
          </div>
          <div className="username">
            <p>Cecelia Liang{user}</p>
          </div>
          <div className="separator"></div>
          <div className="date" title={time}>
            {date}
          </div>
        </div>
        <div className="comment-content">
          <p>{content}</p>
        </div>
        <div className="reply-comment">Reply</div>
      </div>
    );
  }
}
function GameDetails() {
  const [name, setName] = React.useState(null);
  const [desc, setDesc] = React.useState(null);
  const [authorId, setAuthorId] = React.useState(null);
  const [players, setPlayers] = React.useState(null);
  const [views, setViews] = React.useState(null);
  const [cover, setCover] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [commentNum, setCommentNum] = React.useState(0);
  const [tabState, setTabState] = React.useState("summary");
  const [content, setContent] = React.useState("");
  const [replyto, setReplyto] = React.useState();
  const mountedRef = React.useRef(true); // ← the "flag"
  console.log("content: " + content);
  const { id } = useParams();
  // console.log("id: " + id);
  const refreshPage = () => {
    fetch(`http://localhost:8080/api/games/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setDesc(data.description);
        setAuthorId(data.authorId);
        setPlayers(data.players);
        setViews(data.views);
        setCover(data.coverW);
        setCommentNum(data.comments.length);
        // console.log("comments: " + JSON.stringify(nestComments(data.comments)));
        setComments(nestComments(data.comments));
      });
  };
  function SampleCmt({ commentContent }) {
    const addToBox = (commentContent) => {
      var commentBox = document.getElementById("comment-box");
      commentBox.value += commentContent + " ";
      setContent(commentBox.value);
      console.log("Content in the box: " + content);
      commentBox.focus();
    };
    return (
      <span onClick={() => addToBox(commentContent)}>{commentContent}</span>
    );
  }
  React.useEffect(() => {
    refreshPage();
  }, []);

  React.useEffect(() => {
    if (mountedRef.current) {
      mountedRef.current = false;
    } else {
      addView(views + 1);
      console.log("there are " + views + " views");
    }
  }, [views]);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // console.log(name, desc);

  const navigate = useNavigate();

  const addView = (viewNum) => {
    const data = { views: viewNum };
    fetch(`http://localhost:8080/api/games/${id}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  function CommentBox() {
    return (
      <>
        <div className="comment-box">
          <textarea
            placeholder="Please input a friendly comment…"
            id="comment-box"
            // onChange={(event) => setContent(event.target.value)}
          ></textarea>
          <div className="submit-btn" onClick={() => handleSubmit()}>
            Submit
          </div>
        </div>
        <div className="sample-comments">
          <SampleCmt commentContent="Nice game!" />
          <SampleCmt commentContent="Wonderful experience!" />
        </div>
      </>
    );
  }
  const submitComment = (comment) => {
    const data = { text: comment };
    fetch(`http://localhost:8080/api/comments/${id}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleSubmit = () => {
    var contentSubmit = document.getElementById("comment-box").value;
    console.log("Submit comment: " + contentSubmit);
    // submitComment(content);
    alert("Your comment is successfully submitted");
    setContent("");
    document.getElementById("comment-box").value = "";
    refreshPage();
  };

  return (
    <div className="details-page">
      <div className="details">
        <div className="cover-container">
          <img src={cover} style={{ width: "772px" }} />
        </div>
        <div className="game-details">
          <h3>{name}</h3>
          <div className="info">
            <p className="author">By @ameowdog</p>
            <div className="rating">
              <img src={rating} />
            </div>
          </div>
          <p className="played">Played by: {players} players</p>
        </div>
        <button className="start-btn" onClick={() => navigate("play/")}>
          Start Game
        </button>
        <br />
        <div className="tabs">
          <ul>
            <li
              className={tabState === "summary" ? "active" : ""}
              onClick={() => setTabState("summary")}
            >
              Summary
            </li>
            <li
              className={tabState === "comments" ? "active" : ""}
              onClick={() => setTabState("comments")}
            >
              Comments ({commentNum})
            </li>
            <li
              className={tabState === "related" ? "active" : ""}
              onClick={() => setTabState("related")}
            >
              Related (3)
            </li>
          </ul>
        </div>
        <div className={`tab-content ${tabState === "summary" ? "show" : ""}`}>
          <p>{desc}</p>
        </div>
        <div className={`tab-content ${tabState === "comments" ? "show" : ""}`}>
          {/* <div className="comment-box">
            <textarea
              placeholder="Please input a friendly comment…"
              id="comment-box"
              onChange={(event) => setContent(event.target.value)}
            ></textarea>
            <div className="submit-btn" onClick={() => handleSubmit()}>
              Submit
            </div>
          </div>
          <div className="sample-comments">
            <SampleCmt commentContent="Nice game!" />
            <SampleCmt commentContent="Wonderful experience!" />
          </div> */}
          <CommentBox />
          {comments.map((comment) => (
            <>
              <Comment comment={comment} level={0} />
            </>
          ))}
        </div>
      </div>
      <div className="leaderboard">
        <img src={leaderboard} />
      </div>
    </div>
  );
}
export default GameDetails;
