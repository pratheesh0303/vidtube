import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Login from "../Login";
import MainLayout from "../MainLayout";

const Container = styled.div`
  background: #181818;
  width: 100%;
`;

const Home = () => {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
            <Route path="*" element={<MainLayout/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default Home;
