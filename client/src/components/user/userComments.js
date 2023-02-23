import SecondSide from "./secondSide";
import React, { useEffect, useRef } from "react";
import IsLoggedIn, { logout, getCurrentUser } from "../utilities/loginStatus";
import "./styles/userComments.scss";
import { useNavigate } from "react-router-dom";
// icons
import messageIco from "./icons/message-square.svg";

function UserComments() {
  const navigate = useNavigate();
  const [comments, setComments] = React.useState([]);
  const getComments = (userId) => {
    fetch(`http://localhost:8080/api/profiles/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
      });
  };
  if (getCurrentUser) {
    // console.log(getCurrentUser);
    var username = getCurrentUser.username;
    var email = getCurrentUser.email;
    var id = getCurrentUser.id;
    var roles = [];
    getCurrentUser.roles.forEach((x, i) =>
      roles.push(x.slice(5).toLowerCase())
    );
  }
  React.useEffect(() => {
    getComments(id);
  }, []);
  React.useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
  }, []);
  const formatTime = (t) => {
    let time = new Date(t);
    var hr = time.getHours();
    var min = time.getMinutes();
    var sc = time.getSeconds();
    return (
      <>
        {time.toISOString().split("T")[0]}&nbsp;&nbsp;{hr}:{min}:{sc}
      </>
    );
  };

  return (
    <>
      <SecondSide />
      <section class="user-main comments" style={{ margin: `0 -30px 0 240px` }}>
        <div>
          <h2>
            <img src={messageIco} />
            <span>Comment Management</span>
          </h2>
          {comments.length != 0 ? (
            <table>
              <tr style={{ backgroundColor: `#4b494921`, fontWeight: `900` }}>
                <td>id</td>
                <td style={{ width: `130px` }}>Parent id</td>
                <td style={{ width: `450px` }}>Content</td>
                <td>Game</td>
                <td style={{ width: `200px` }}>Date</td>
                <td style={{ width: `100px` }}>Actions</td>
              </tr>
              {comments.map((comment) => (
                <tr
                  onClick={() => navigate(`/games/${comment.gameId}`)}
                  style={{ cursor: `pointer` }}
                >
                  <td>{comment.id}</td>
                  <td>{comment.parentId !== null && comment.parentId}</td>
                  <td>{comment.text}</td>
                  <td>{comment.gameId}</td>
                  <td>{formatTime(Date.parse(comment.createdAt))}</td>
                  <td>View</td>
                </tr>
              ))}
            </table>
          ) : (
            <div
              style={{
                color: `#626262`,
                textAlign: `left`,
                fontFamily: `poppins`,
                marginTop: `35px`,
              }}
            >
              You do not have any comments!
            </div>
          )}
        </div>
        <div className="bg-overlay" />
      </section>
    </>
  );
}
export default UserComments;
