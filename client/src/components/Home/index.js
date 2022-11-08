import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Login from "../Login";
import MainContent from "../MainContent";
import VideoDetails from "../MainContent/VideoDetails";

const Container = styled.div`
  display: flex;
  background: #181818;
  justify-content: center;
`;

const Home = () => {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/" element={<MainContent type="random" />} />
          <Route path="/trending" element={<MainContent type="trending" />} />
          <Route
            path="/subscriptions"
            element={<MainContent type="subscribed" />}
          />
          <Route path="/own_videos" element={<MainContent type="own" />} />
          <Route path="/video/:id" element={<VideoDetails type="random" />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default Home;
