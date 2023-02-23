import "../styles/aboutPage.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <div className="page-container">
        <div className="main-about">
          <h1>ABOUT MERAKEY</h1>
          <h2>
            A <em>revolutionary</em> platform for students
          </h2>
          <p>
            <b>What is Merakey?</b>
          </p>
          <p>
            A learning platform, a gaming website, a young community… It can be
            a combination of all of these, and, to be honest, its definition is
            totally depending on <b>you</b>.
          </p>
          <p>
            Merakey is a learning platform for middle school and high school
            students enrolling in curriculums of IGCSE and O'level. By providing
            a rich resource of practice questions and past exam questions
            together with intrigueing interactive text games of a variety of
            genres, Merakey provides the best way for you to focus on doing
            practicing questions without procrastination, to relax in the
            process.
          </p>
          <blockquote>
            <p>You define how you learn.</p>
          </blockquote>
          <p>
            Merakey offers great flexibility. different types of games, it is up
            to your preference. Step 1: choose the area you would like to revise
            for from our database. Step 2: inject the questions from the
            database into any of the text games on the site.
          </p>
          <p>
            You can always replay a game that you love, and inject questions of
            different topics, even different subjects into it.
          </p>
        </div>
      </div>
      <div className="image">
        <img src="https://images.unsplash.com/photo-1639322537228-f710d846310a" />
      </div>

      <div className="page-container">
        <div className="main-about">
          <p className="image-text">
            Merakey connects everything together, Image from{" "}
            <a href="https://unsplash.com/photos/T9rKvI3N0NM">Unsplash</a>
          </p>
          <blockquote>
            <p>For students, by students.</p>
          </blockquote>
          <p>
            As a user of the website, your role is not limited to a "player". In
            fact, we highly encourage you to become a "contributor". We believe
            that students know students better, and therefore can provide more
            quality contents to the platform.
          </p>
          <p>
            If you are interested in story-writing, you can become a "content
            contributor" -- You can design you own story, email it to us and
            earn points. You can also be a "problem contributor" -- If you have
            great sources of practice questions for any topic in any subject,
            you are highly welcome to email it to us.
          </p>
        </div>
      </div>
    </>
  );
}
export default AboutPage;
