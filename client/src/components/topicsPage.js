import "../styles/subjectsPage.scss";
import "../styles/topicsPage.scss";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TopicsPage() {
  const { subject } = useParams();
  const [topics, setTopics] = React.useState([]);
  const getTopics = (subject) => {
    fetch(`http://localhost:8080/api/topics/subject/${subject}`)
      .then((res) => res.json())
      .then((data) => {
        setTopics(data);
      });
  };
  React.useEffect(() => {
    getTopics(subject);
  }, []);
  return (
    <>
      <div className="topics-page-container">
        <div className="topics-container" style={{ padding: `100px` }}>
          {topics.map((topic) => (
            <h2>
              {topic.code}&nbsp;{topic.name}
            </h2>
          ))}
        </div>
      </div>
      <div className="topics-overlay" />
    </>
  );
}
export default TopicsPage;
