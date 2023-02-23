import React, { useState } from "react";
// import {
//   HashRouter as Router,
//   Switch,
//   Route,
//   Routes,
//   Link,
//   Redirect,
// } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navBar";
import HomePage from "./components/homePage";
import GameDetails from "./components/gameDetails";
import PlayGame from "./components/playGame";
import AboutPage from "./components/aboutPage";
import SubjectsPage from "./components/subjectsPage";
import SearchPage from "./components/searchPage";
import Login from "./components/login";
import SignUp from "./components/signup";
import UserHome from "./components/user/userHome";
import PastProblems from "./components/user/pastProblems";
import YourGames from "./components/user/yourGames";
import UserComments from "./components/user/userComments";
import AddStory from "./components/user/addStory";
import EditStory from "./components/user/editStory";
import GameHistory from "./components/user/gameHistory";
import UserSettings from "./components/user/userSettings";
import TopicsPage from "./components/topicsPage";

import IsLoggedIn, { getCurrentUser } from "./components/utilities/loginStatus";

function App() {
  if (getCurrentUser) {
    var username = getCurrentUser.username;
    var email = getCurrentUser.email;
    var id = getCurrentUser.id;
    var roles = [];
    getCurrentUser.roles.forEach((x, i) =>
      roles.push(x.slice(5).toLowerCase())
    );
  }
  return (
    <div className="App">
      <React.StrictMode>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/games/:id" element={<GameDetails />} />
            <Route path="/games/:id/play/:topic" element={<PlayGame />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="/search/:query" element={<SearchPage />} />
            <Route path="/search/" element={<SearchPage />} />
            <Route path="/subjects/:subject" element={<TopicsPage />} />

            {IsLoggedIn() && (
              <>
                <Route path="/login" element={<Navigate to="/user" />} />
                <Route path="/signup" element={<Navigate to="/user" />} />
                <Route path="/user" element={<UserHome />} />
                <Route path="/user/past-problems" element={<PastProblems />} />
                <Route path="/user/games" element={<YourGames />} />
                <Route path="/user/comments" element={<UserComments />} />
                <Route path="/user/add" element={<AddStory />} />
                <Route path="/user/edit/:gameid" element={<EditStory />} />
                <Route path="/user/history" element={<GameHistory />} />
                <Route path="/user/settings" element={<UserSettings />} />
              </>
            )}
            {!IsLoggedIn() && (
              <>
                <Route exact path="/user" element={<Navigate to="/login" />} />
                <Route
                  path="/user/:anything"
                  element={<Navigate to="/login/" />}
                />
                <Route
                  path="/user/:anything/:anything"
                  element={<Navigate to="/login/" />}
                />
              </>
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* users */}
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
}

export default App;
