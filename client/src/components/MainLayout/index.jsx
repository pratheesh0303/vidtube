import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import MainContent from "./MainContent";
import Navbar from "./Navbar";
import VideoDetails from "./VideoDetails";

const MainLayoutConatiner  = styled.div``;
const MainLayout = () => {
  return (
      <MainLayoutConatiner>
        <Navbar/>
        <Routes>
        <Route path="/" element={<MainContent type="random" />} />
          <Route path="/trending" element={<MainContent type="trending" />} />
          <Route
              path="/subscriptions"
              element={<MainContent type="subscribed" />}
          />
          <Route path="/own_videos" element={<MainContent type="own" />} />
          <Route path="/video/:id" element={<VideoDetails type="random" />} />
        </Routes>
      </MainLayoutConatiner>
  );
};

export default MainLayout;
