import SecondSide from "./secondSide";
import React, { useEffect, useRef } from "react";
import IsLoggedIn, { logout, getCurrentUser } from "../utilities/loginStatus";
import { useNavigate } from "react-router-dom";
import fileIco from "../../images/file-text.svg";

function PastProblems() {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState("all");
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
    console.log(getCurrentUser);
    var username = getCurrentUser.username;
    var email = getCurrentUser.email;
    var id = getCurrentUser.id;
    var roles = [];
    getCurrentUser.roles.forEach((x, i) =>
      roles.push(x.slice(5).toLowerCase())
    );
    console.log(roles);
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
  function Row({ width, name, arrow = false }) {
    return (
      <div colSpan="1" style={{ flex: `${width} 0 auto`, width: `${width}px` }}>
        <div className="flex items-center justify-between">
          <div className="overflow-hidden text-ellipsis">{name}</div>
        </div>
      </div>
    );
  }
  function ArrowIco() {
    return (
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          fill="currentColor"
        >
          <path d="M18.695 9.378L12.83 3.769a1.137 1.137 0 00-.06-.054c-.489-.404-1.249-.377-1.7.06L5.303 9.381a.51.51 0 00-.16.366c0 .297.27.539.602.539h12.512a.64.64 0 00.411-.146.501.501 0 00.028-.762zM12.77 20.285c.021-.017.042-.035.062-.054l5.863-5.609a.5.5 0 00-.028-.762.64.64 0 00-.41-.146H5.743c-.332 0-.601.242-.601.54a.51.51 0 00.16.365l5.769 5.606c.45.437 1.21.464 1.698.06z"></path>
        </svg>
      </span>
    );
  }
  const wrongQs = [
    {
      qs: "What is the gradient of y = x?",
      wrong: "3",
      correct: "1",
      exp: ", gradient is the number before 'x'",
      freq: "15",
      topicId: "C1",
      topic: "Number",
      subject: "Maths",
    },
    {
      qs: "Work out: 3 + 18 ÷ 3 – 2",
      wrong: "24",
      correct: "22.5",
      exp: "",
      freq: "2",
      topicId: "C1",
      topic: "Number",
      subject: "Maths",
    },
    {
      qs: "Factorise 6p^3 + 2pq",
      wrong: "54",
      correct: "2p(3p^2+q)",
      exp: "",
      freq: "1",
      topicId: "C3",
      topic: "Algebra and graphs",
      subject: "Maths",
    },
    {
      qs: "Write down the smallest number which is a multiple of both 25 and 15.",
      wrong: "5",
      correct: "75",
      exp: "",
      freq: "1",
      topicId: "C1",
      topic: "Number",
      subject: "Maths",
    },
    {
      qs: "Simplify: 3a^2 x 8a^4",
      subject: "Maths",
      correct: "24a^6",
      wrong: "24",
      freq: "1",
      exp: ", multiply the coefficients and add the powers.",
      topicId: "C3",
      topic: "Algebra and graphs",
    },
    {
      qs: "The area of a semi-circle is 119.2 cm^2. Calculate the radius of the circle in 2 digital places.",
      subject: "Maths",
      correct: "8.71",
      wrong: "24",
      freq: "5",
      exp: ", A=πr^2/2, 119x2/π=75.88507, √75.88507=8.71",
      topicId: "C7",
      topic: "Geometry",
    },
    {
      qs: "The length of a rectangle is 5 cm, the width is 10 cm. Both measurements are to the nearest cm. (a) Write down the upper bound for the length of the rectangle; (b) Write down the lower bound for the width of the rectangle. (without units as decimals)",
      subject: "Maths",
      correct: "5.5, 9.5",
      wrong: "6",
      freq: "1",
      exp: "",
      topicId: "C9",
      topic: "Mensuration",
    },
    {
      qs: "A girl travels 3 miles to visit her friend, completing the journey in 1 hour. She finds her friend is not at home, and immediately makes the return journey at 2 miles per hour. Calculate how long the return journey took in hours.",
      subject: "Maths",
      wrong: "3",
      correct: "1.5",
      exp: ", 3 / 2 = 1.5 hours",
      freq: "1",
      topicId: "C3",
      topic: "Algebra and graphs",
    },
    {
      qs: "Simplify completely 5(3x-y)-7(8x-5y)",
      subject: "Maths",
      correct: "-41x+30y",
      wrong: "x+y",
      freq: "10",
      exp: ", =15x-5y-56x+35y, =-41x+30y",
      topicId: "C3",
      topic: "Algebra and graphs",
    },
    {
      qs: "What is the gradient of y = x?",
      wrong: "3",
      correct: "1",
      exp: ", gradient is the number before 'x'",
      freq: "15",
      topicId: "C1",
      topic: "Number",
      subject: "Maths",
    },
    {
      qs: "Work out: 3 + 18 ÷ 3 – 2",
      wrong: "24",
      correct: "22.5",
      exp: "",
      freq: "2",
      topicId: "C1",
      topic: "Number",
      subject: "Maths",
    },
    {
      qs: "Factorise 6p^3 + 2pq",
      wrong: "54",
      correct: "2p(3p^2+q)",
      exp: "",
      freq: "1",
      topicId: "C3",
      topic: "Algebra and graphs",
      subject: "Maths",
    },
    {
      qs: "Write down the smallest number which is a multiple of both 25 and 15.",
      wrong: "5",
      correct: "75",
      exp: "",
      freq: "1",
      topicId: "C1",
      topic: "Number",
      subject: "Maths",
    },
    {
      qs: "Simplify: 3a^2 x 8a^4",
      subject: "Maths",
      correct: "24a^6",
      wrong: "24",
      freq: "1",
      exp: ", multiply the coefficients and add the powers.",
      topicId: "C3",
      topic: "Algebra and graphs",
    },
    {
      qs: "The area of a semi-circle is 119.2 cm^2. Calculate the radius of the circle in 2 digital places.",
      subject: "Maths",
      correct: "8.71",
      wrong: "24",
      freq: "5",
      exp: ", A=πr^2/2, 119x2/π=75.88507, √75.88507=8.71",
      topicId: "C7",
      topic: "Geometry",
    },
    {
      qs: "The length of a rectangle is 5 cm, the width is 10 cm. Both measurements are to the nearest cm. (a) Write down the upper bound for the length of the rectangle; (b) Write down the lower bound for the width of the rectangle. (without units as decimals)",
      subject: "Maths",
      correct: "5.5, 9.5",
      wrong: "6",
      freq: "1",
      exp: "",
      topicId: "C9",
      topic: "Mensuration",
    },
    {
      qs: "A girl travels 3 miles to visit her friend, completing the journey in 1 hour. She finds her friend is not at home, and immediately makes the return journey at 2 miles per hour. Calculate how long the return journey took in hours.",
      subject: "Maths",
      wrong: "3",
      correct: "1.5",
      exp: ", 3 / 2 = 1.5 hours",
      freq: "1",
      topicId: "C3",
      topic: "Algebra and graphs",
    },
    {
      qs: "Simplify completely 5(3x-y)-7(8x-5y)",
      subject: "Maths",
      correct: "-41x+30y",
      wrong: "x+y",
      freq: "10",
      exp: ", =15x-5y-56x+35y, =-41x+30y",
      topicId: "C3",
      topic: "Algebra and graphs",
    },
  ];

  return (
    <>
      <SecondSide />
      <section
        className="user-main past-problems"
        style={{ margin: `0 -30px 0 240px` }}
      >
        <div>
          <h2>
            <img src={fileIco} />
            <span>Past Problems</span>
          </h2>
          <div>
            <ul className="tabs">
              <li
                onClick={() => setTab("all")}
                class={tab == "all" && `active`}
              >
                All
              </li>
              <li
                onClick={() => setTab("maths")}
                class={tab == "maths" && `active`}
              >
                Maths
              </li>
              <li
                onClick={() => setTab("physics")}
                class={tab == "physics" && `active`}
              >
                Physics
              </li>
            </ul>
          </div>
          <div className="inline-block">
            <div>
              <div className="title-row">
                <Row width="225" name="Questions" />
                <Row width="100" name="Your Ans" />
                <Row width="250" name="Solution" />
                <div
                  colSpan="1"
                  style={{
                    flex: `100 0 auto`,
                    width: `100px`,
                    cursor: `pointer`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="overflow-hidden text-ellipsis">Freq</div>
                    <ArrowIco />
                  </div>
                </div>
                <Row width="90" name="Topic" />
                <Row width="90" name="Subject" />
              </div>
              {wrongQs.map((wrongQ) => (
                <div className="row">
                  <Row width="225" name={wrongQ.qs} />
                  <Row width="100" name={wrongQ.wrong} />
                  <Row width="250" name={wrongQ.correct + wrongQ.exp} />
                  <Row width="100" name={wrongQ.freq} />
                  <Row width="90" name={wrongQ.topicId + " " + wrongQ.topic} />
                  <Row width="90" name={wrongQ.subject} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-overlay" />
      </section>
    </>
  );
}
export default PastProblems;
