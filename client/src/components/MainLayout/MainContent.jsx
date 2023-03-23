import React from "react";
import styled from "styled-components";
import Menubar from "./Menubar";
import Navbar from "./Navbar";
import VideoList from "./VideoList";
const MainContentContainer = styled.div`
  display: flex;
`;
const SidebarContainer = styled.div`
  flex: 1;
  height: 100vh;
`;
const ContentContainer = styled.div`
  flex: 7;
`;
const MainContent = ({ type }) => {
  return (
    <MainContentContainer>
      <SidebarContainer>
        <Menubar />
      </SidebarContainer>
      <ContentContainer>
        <VideoList type={type} />
      </ContentContainer>
    </MainContentContainer>
  );
};

export default MainContent;
