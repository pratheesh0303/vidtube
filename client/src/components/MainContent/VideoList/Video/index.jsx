import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "timeago.js";
const VideoContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.size === "sm" ? "row" : "column")};
  gap: ${(props) => props.size === "sm" && "0.8rem"};
`;
const ThumbNailContainer = styled.img`
  height: ${(props) => props.size !== "sm" && "10rem"};
  width: ${(props) => (props.size !== "sm" ? "100%" : "10rem")};
  cursor: pointer;
  flex: ${(props) => props.size === "sm" && 2};
`;
const TitleContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 0.8rem 0rem;
  flex: ${(props) => props.size === "sm" && 5};
`;
const ProfileIconContainer = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  display: ${(props) => props.size === "sm" && "none"};
`;
const Title = styled.span`
  font-weight: 800;
  color: #ffffff;
  font-size: 0.8rem;
  flex: 1;
  display: block;
  display: -webkit-box;
  max-width: 100%;
  height: 25px;
  margin: 0 auto;
  line-height: 1;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  cursor: pointer;
`;
const Author = styled.div`
  font-size: 0.8rem;
  color: #f2f2f2;
  margin-top: 0.9rem;
`;
const DetailsContainer = styled.div`
  flex: ${(props) => (props.size === "sm" ? "3" : "1")};
`;

const ViewContainer = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #f2f2f2;
  display: flex;
  gap: 1rem;
`;
const View = styled.div``;
const Date = styled.div``;
const Video = ({ size, video }) => {
  const [channel, setChannel] = useState([]);
  const user = useSelector((state) => state.users.loggedinUser);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users/${video.userId}`);
      setChannel(response.data);
    };
    fetchUser();
  }, [video.userId]);
  return (
    <VideoContainer size={size}>
      <ThumbNailContainer
        src={
          video?.imageUrl === "" || video?.imageUrl === "test"
            ? `/images/thumbnail.png`
            : video?.imageUrl
        }
        size={size}
      />
      <TitleContainer size={size}>
        <ProfileIconContainer src={channel?.image} size={size} />
        <DetailsContainer size={size}>
          <Title>{video.title}</Title>
          <Author>{channel.name}</Author>
          <ViewContainer>
            <View>{video?.views?.length} views</View>
            <Date>{format(video.createdAt)}</Date>
          </ViewContainer>
        </DetailsContainer>
      </TitleContainer>
    </VideoContainer>
  );
};

export default Video;
