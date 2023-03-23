import React from "react";
import styled from "styled-components";
import {
  HomeOutlined,
  SubscriptionsOutlined,
  VideoLibraryOutlined,
  AccountCircleOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MenubarContainer = styled.div`
  color: white;
  font-size: 1rem;
  position: sticky;
  top: 0;
  padding: 1.5rem 1.5rem;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  font-size: 1rem;
`;
const HorizontalBreak = styled.div`
  margin: 1.2rem 0.5rem;
  border: 0.5px solid #5a5654;
`;
const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
`;
const Button = styled.button`
  margin-top: 0.8rem;
  padding: 0.3rem 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  border: 1px solid #2a6f96;
  background: transparent;
  color: #2a6f96;
  font-weight: 900;
  cursor: pointer;
`;

const Menubar = () => {
  const user = useSelector((state) => state.users.loggedinUser);
  return (
    <MenubarContainer>
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        <Item>
          <HomeOutlined />
          Home
        </Item>
      </Link>

      <Link to="/trending" style={{ color: "inherit", textDecoration: "none" }}>
        <Item>
          <TrendingUpOutlined />
          Trending
        </Item>
      </Link>
      {user?
      <>
      <Link
        to="/subscriptions"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <Item>
          <SubscriptionsOutlined />
          Subscriptions
        </Item>
      </Link>
      <Link
        to="/own_videos"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <Item>
          <VideoLibraryOutlined />
          Your Videos
        </Item>
      </Link>
      </>
      :''}
      <HorizontalBreak />
      {!user ? (
        <SignInContainer>
          Sign in to like videos, comment and subscribe.
          <Link  style={{ textDecoration: 'none' }} to="/login">
            <Button>
              <AccountCircleOutlined />
              <span>Sign in</span>
            </Button>
          </Link>
        </SignInContainer>
      ) : (
        ""
      )}
    </MenubarContainer>
  );
};

export default Menubar;
