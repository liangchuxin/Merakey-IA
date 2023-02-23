import "../styles/gameDetails.scss";
import rating from "../images/rating.png";
import leaderboard from "../images/game-leaderboard.png";
// import cover from "../images/whodidit.png";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useParams } from "react-router-dom";
import IsLoggedIn, { logout, getCurrentUser } from "./utilities/loginStatus";

//icons
import promptIco from "../images/login-prompt.svg";
import closeIco from "../images/close.svg";

// import { comments } from "../../../api/app/models";

function nestComments(commentList) {
  const commentMap = {};

  // 先把 commentList 转为名为 commentMap 的 array（本来是个 list）
  commentList.forEach((comment) => (commentMap[comment.id] = comment));

  // iterate over the comments again and correctly nest the children
  commentList.forEach((comment) => {
    if (comment.parentId !== null) {
      const parent = commentMap[comment.parentId];
      // parent 就是这个数组里 id 评论 parentId 的那条评论
      (parent.children = parent.children || []).push(comment);
      // 上面这个等于 parent.children = parent.children ? parent.children : []
      // 如果 parent 有 children 的 attribute，那就把这条 comment 整条 push 进去，如果没有，就创建这个 attribute 然后 push 进去
    }
  });

  // 这个时候，所有子评论都被放到母评论里了，所有有 parentId 的都是母评论，子评论都被装在母评论里面了，漏在外面的子评论不用理会
  // filter the list to return a list of correctly nested comments
  return commentList.filter((comment) => {
    return comment.parentId === null;
  });
}

function GameDetails() {
  const [name, setName] = React.useState(null);
  const [desc, setDesc] = React.useState(null);
  const [author, setAuthor] = React.useState(null);
  const [players, setPlayers] = React.useState(null);
  const [views, setViews] = React.useState(null);
  const [cover, setCover] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [commentNum, setCommentNum] = React.useState(0);
  const [tabState, setTabState] = React.useState("summary");
  const [content, setContent] = React.useState("");
  const [replyto, setReplyto] = React.useState(0);
  const [popupState, setPopupState] = React.useState(true);
  const [subject, setSubject] = React.useState("null");
  const [topics, setTopics] = React.useState(["null"]);
  const [topic, setTopic] = React.useState("null");
  const mountedRef = React.useRef(true); // ← the "flag"
  const { id } = useParams();
  // console.log("id: " + id);
  function GetUser(uid, field) {
    const response = fetch(`http://localhost:8080/api/profiles/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("data of user " + uid + ": " + JSON.stringify(data.avatar));
        switch (field) {
          case "avatar":
            // console.log("#222 avatar" + JSON.stringify(data.avatar));
            return JSON.stringify(data.avatar);
          case "username":
            return data.displayName;
          case "status":
            return data.status;
        }
        return JSON.stringify(data.avatar);
      });

    // console.log("#333 response: " + response);
    return response;
  }
  const refreshPage = async () => {
    fetch(`http://localhost:8080/api/games/${id}`)
      .then((res) => res.json())
      .then(async (data) => {
        setName(data.name);
        setDesc(data.description);
        setPlayers(data.players);
        setViews(data.views);
        setCover(data.coverW);
        setCommentNum(data.comments.length);
        var author = await GetUser(data.authorId, "username");
        setAuthor(author);
        // console.log("comments: " + JSON.stringify(nestComments(data.comments)));
        var comments = data.comments;
        for (let index = 0; index < comments.length; index++) {
          var user = comments[index].profileId;
          comments[index].avatar = await GetUser(user, "avatar");
          comments[index].username = await GetUser(user, "username");
          comments[index].status = await GetUser(user, "status");
        }
        setComments(nestComments(data.comments).reverse());
      });
  };

  // const refreshPage = () => {
  //   fetch(`http://localhost:8080/api/games/${id}`)
  //     .then((res) => res.json())
  //     .then(async (data) => {
  //       var comments = data.comments;
  //       for (let index = 0; index < comments.length; index++) {
  //         var user = comments[index].profileId;
  //         comments[index].avatar = await GetUser(user, "avatar");
  //         comments[index].username = await GetUser(user, "username");
  //         comments[index].status = await GetUser(user, "status");
  //       }
  //       setComments(comments);
  //     });
  // };

  if (getCurrentUser) {
    // console.log(getCurrentUser);
    var username = getCurrentUser.username;
    var email = getCurrentUser.email;
    var userId = getCurrentUser.id;
    var roles = [];
    getCurrentUser.roles.forEach((x, i) =>
      roles.push(x.slice(5).toLowerCase())
    );
    // console.log(roles);
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
    var author = parseInt(comment.profileId);
    var avatar = GetUser(author, "avatar");
    // console.log(
    //   "#444 author is: " + author + " avatar is: " + avatar + typeof avatar
    // );
    var children = comment.children;
    if (level == 0) {
      // console.log(level);
      return (
        <div className="comment-block" key={comment.id}>
          <div className="comment-info">
            <div className="profile-container">
              {/* <img src="https://cdn.jsdelivr.net/gh/liangchuxin/blog-files/img/20210315225826.jpg"></img> */}
              <img src={JSON.parse(comment.avatar)}></img>

              <span
                className={`user-status ${comment.status}`}
                title={`${comment.status}…`}
              ></span>
            </div>
            <div className="username">
              <p>{comment.username}</p>
            </div>
            <div className="separator"></div>
            <div className="date" title={time}>
              {date}
            </div>
          </div>
          <div className="comment-content">
            <p>{content}</p>
          </div>
          <div
            className="reply-comment"
            style={replyto !== comment.id ? { paddingBottom: `40px` } : {}}
          >
            <div onClick={() => setReplyto(comment.id)}>Reply</div>
            <div
              onClick={() => setReplyto(0)}
              style={replyto !== comment.id ? { display: `none` } : {}}
            >
              Cancel Reply
            </div>
          </div>
          <CommentBox replyNum={replyto} commentId={comment.id} />
          {children?.map((subChildren) => (
            <Comment comment={subChildren} level={level + 1} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="comment-block" key={comment.id}>
          <div className="comment-info">
            <div className="profile-container">
              {/* <img src="https://cdn.jsdelivr.net/gh/liangchuxin/blog-files/img/20210315225826.jpg"></img> */}
              <img src={JSON.parse(comment.avatar)}></img>
              <span
                className={`user-status ${comment.status}`}
                title={`${comment.status}…`}
              ></span>{" "}
            </div>
            <div className="username">
              <p>{comment.username}</p>
            </div>
            <div className="separator"></div>
            <div className="date" title={time}>
              {date}
            </div>
          </div>
          <div className="comment-content">
            <p>{content}</p>
          </div>
          <div
            className="reply-comment"
            style={replyto !== comment.id ? { paddingBottom: `40px` } : {}}
          >
            <div onClick={() => setReplyto(comment.id)}>Reply</div>
            <div
              onClick={() => setReplyto(0)}
              style={replyto !== comment.id ? { display: `none` } : {}}
            >
              Cancel Reply
            </div>
          </div>
          <CommentBox replyNum={replyto} commentId={comment.id} />
          {children?.map((subChildren) => (
            <Comment comment={subChildren} level={level + 1} />
          ))}
        </div>
      );
    }
  }

  function SampleCmt({ commentContent }) {
    const addToBox = (commentContent) => {
      var commentBox = document.getElementById("comment-box");
      commentBox.value += commentContent + " ";
      // setContent(commentBox.value);
      // console.log("Content in the box: " + content);
      commentBox.focus();
    };
    return (
      <span onClick={() => addToBox(commentContent)}>{commentContent}</span>
    );
  }
  React.useEffect(() => {
    refreshPage();
  }, []);
  function CommentBox({ replyNum, commentId }) {
    // console.log("content: " + document.getElementById("comment-box").value);
    // var originalValue = document.getElementById("comment-box").value;

    if (replyNum == commentId) {
      if (!IsLoggedIn()) {
        return (
          <>
            <div className="comment-box">
              <p>
                Please <span onClick={() => navigate("/signup")}>sign up</span>{" "}
                or <span onClick={() => navigate("/login")}>login</span> to
                comment!
              </p>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div className="comment-box">
              <textarea
                placeholder={
                  commentId === 0
                    ? `Please input a friendly comment…`
                    : `Reply to…`
                }
                id="comment-box"
                // onChange={(event) => setContent(event.target.value)}
                // defaultValue={document.getElementById("comment-box").value}
              ></textarea>
              <div className="submit-btn" onClick={() => handleSubmit()}>
                Submit
              </div>
            </div>
            <div
              className="sample-comments"
              style={
                commentId === 0
                  ? { paddingBottom: "55px" }
                  : { paddingBottom: "40px" }
              }
            >
              <SampleCmt commentContent="Nice game!" />
              <SampleCmt commentContent="Wonderful experience!" />
            </div>
          </>
        );
      }
    } else {
      return null;
    }
  }
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
  const submitComment = (comment, parent, user) => {
    const data = { text: comment, parentId: parent, userId: user };
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
    var content = document.getElementById("comment-box").value;
    console.log("Submit comment: " + content);
    if (replyto == 0) {
      submitComment(content, null, userId);
    } else {
      submitComment(content, replyto, userId);
    }
    toast.success("Your comment is submitted!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar",
      onClose: () => {
        content = "";
        document.getElementById("comment-box").defaultValue = "";
        refreshPage();
      },
    });
  };
  const getTopics = (subject) => {
    fetch(`http://localhost:8080/api/topics/subject/${subject}`)
      .then((response) => response.json())
      .then((data) => {
        setTopics(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const submitSubject = (e) => {
    setSubject(e);
    setTopic("null");
    getTopics(e);
  };
  const submitTopic = (e) => {
    setTopic(e);
  };
  console.log("topic: " + topic);

  return (
    <>
      {!IsLoggedIn() && popupState && (
        <div className="login-popup">
          <img src={promptIco} />

          <div className="title">Login to see your progress!</div>
          <div className="content">
            Login or sign up to comment, view all your practice / game
            histories, and to track the wrong questions!
          </div>
          <div className="btn-container">
            <div className="signup" onClick={() => navigate("/signup")}>
              Sign up
            </div>
            <div className="next" onClick={() => setPopupState(false)}>
              Next time
            </div>
          </div>
          <div className="close" onClick={() => setPopupState(false)}>
            <img src={closeIco} />
          </div>
        </div>
      )}
      <div className="details-page">
        <div className="details">
          <ToastContainer autoClose={1000} theme="dark" transition={Slide} />
          <div className="cover-container">
            <img src={cover} style={{ width: "772px" }} />
          </div>
          <div className="game-details">
            <h3>{name}</h3>
            <div className="info">
              <p className="author">By @{author}</p>
              <div className="rating">
                <img src={rating} />
              </div>
            </div>
            <p className="played">Played by: {players} players</p>
          </div>
          <div className="start-options">
            <button
              className={`start-btn${topic == "null" ? " disabled" : ""}`}
              onClick={() => navigate(`play/${topic}`)}
              disabled={topic == "null" ? true : false}
            >
              Start Game
            </button>
            <select
              id="subject"
              name="subject"
              className="subject-dropdown"
              onChange={(e) => submitSubject(e.target.value)}
            >
              <option value="null" selected={subject === "null"}>
                Choose Subject
              </option>
              <option value="maths" selected={subject == "maths"}>
                Maths
              </option>
              <option value="physics" selected={subject == "physics"}>
                Physics
              </option>
            </select>
            {JSON.stringify(topics) !== '["null"]' && (
              <>
                <select
                  id="topic"
                  name="topic"
                  className="topic-dropdown"
                  onChange={(e) => submitTopic(e.target.value)}
                >
                  <option value="none">Choose Topic</option>
                  <option value="all">All Topics</option>
                  {topics.map((topicOption, index) => (
                    <option value={topicOption.id}>
                      {index + 1}. {topicOption.code} {topicOption.name}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

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
          <div
            className={`tab-content ${tabState === "summary" ? "show" : ""}`}
          >
            <p>{desc}</p>
          </div>
          <div
            className={`tab-content ${tabState === "comments" ? "show" : ""}`}
          >
            <CommentBox replyNum={replyto} commentId={0} />

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
    </>
  );
}
export default GameDetails;
