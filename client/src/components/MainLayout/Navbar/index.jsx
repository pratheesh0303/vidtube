import React, { useState } from "react";
import styled from "styled-components";
import {
  SearchOutlined,
  AccountCircleOutlined,
  VideoCallOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VideoUpload from "./videoUpload";
import Profile from "../../Logout";
import {searchTerm} from "../../../redux/searchSlice";
const NavbarContainer = styled.div`
    background: #181818;
    padding: 1rem 1rem;
    display: flex;
    justify-content: space-evenly;
  `;
  const SearchContainer = styled.div`
    width: 30rem;
    background: #ffffff;
    position: relative;

    margin: auto;
  `;
  const Search = styled.input`
    border: unset;
    padding: 0.4rem 0.4rem;
    width: 28rem;
    outline: none;
  `;
  const Icon = styled.span`
    position: absolute;
    right: 0.5rem;
    cursor: pointer;
  `;
  const Button = styled.button`
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
  const RightSideContent = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
  `;
  const UserContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    cursor: pointer;
  `;

  const Image = styled.img`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  `;
  const Name = styled.span`
    color: #ffffff;
    font-size: 1.2rem;
  `;
  const Logo = styled.div`
  display: flex;
  align-items: center;
`;

  const LogoImage = styled.img`
  height: 4rem;
`;
const Title = styled.h3`
  color: white;
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.loggedinUser);

  const [modal, openModal] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [profileModal, handleOpenProfileModal] = useState(false);
  const handleClose = () => {
    handleOpenProfileModal(false);
  };

  const handleCloseUpload = () =>{
    openModal(false);
  }

  const searchVideo = () =>{
    
  }
  const changeInput=(e)=>{
    setSearchWord(e.target.value)
    dispatch(searchTerm(searchWord));
  }
  return (
    <>
      <NavbarContainer>
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        <Logo>
          <LogoImage src="/images/logo.png" />
          <Title>VideoTube</Title>
        </Logo>
      </Link>
        <SearchContainer>
          <Search  onChange={changeInput} value={searchWord}/>
          <Icon>
            <SearchOutlined onClick={searchVideo} />
          </Icon>
        </SearchContainer>
        <RightSideContent>
        {user ?
          <VideoCallOutlined
            onClick={() => openModal(true)}
            style={{ fontSize: "2rem", color: "#FFFFFF", cursor: "pointer" }}
          /> :''}
          {user ? (
            <>
              <UserContainer onClick={() => handleOpenProfileModal(true)}>
                <Image
                  src={user.image ? user.image : `/images/user.png`}
                  referrerpolicy="no-referrer"
                />
                <Name>{user.name}</Name>
              </UserContainer>
              {profileModal && (
                <Profile open={profileModal} handleClose={handleClose} />
              )}
            </>
          ) : (
            <Link style={{ textDecoration: 'none' }} to="/login">
              <Button>
                <AccountCircleOutlined />
                <span>Sign in</span>
              </Button>
            </Link>
          )}
        </RightSideContent>
      </NavbarContainer>
      {modal && <VideoUpload openModal={openModal} handleCloseUpload={handleCloseUpload} />}
    </>
  );
};

export default Navbar;
