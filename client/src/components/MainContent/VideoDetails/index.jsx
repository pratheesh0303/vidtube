import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from 'axios';
import {
  ThumbUpOutlined,
  ThumbDownOutlined,
  ThumbUp,
  ThumbDown,
} from "@mui/icons-material";
import Comments from "./Comments";
import VideoList from "../VideoList";
import { useLocation } from "react-router";
import {
  dislike,
  fetchVideoSuccess,
  like,
  notFetching,
} from "../../../redux/videoSlice";
import { subscribed, unsubscribed } from "../../../redux/userSlice";
import { format } from "timeago.js";
const VideoDetailsContainer = styled.div`
  display: flex;
  gap: 3rem;
  width: 100%;
  margin: 2rem;
`;
const VideoContent = styled.div`
  flex: 5;
  color: white;
`;
const Recomendations = styled.div`
  flex: 2;
  color: white;
  margin: 0.8rem;
`;

const VideoContainer = styled.div``;
const Title = styled.h1`
  font-size: 1rem;
`;
const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const VideoInfo = styled.div`
  color: #d9d9d9;
`;
const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
`;

const Break = styled.div`
  margin: 1rem 0rem;
  border: 0.2px solid #d9d9d9;
`;

const ChannelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 1rem;
`;
const Image = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
`;
const Subscribe = styled.button`
  background: red;
  color: white;
  border-radius: 2px;
  border: none;
  height: max-content;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
`;
const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
`;
const ChannelName = styled.span`
  font-weight: 700;
`;
const ChannelCounter = styled.div`
  margin: 0.3rem 0rem;
  font-size: 0.8rem;
`;
const ChannelDescription = styled.p`
  font-size: 0.8rem;
`;
const Video = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const VideoDetails = ({ type }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const videoRef = useRef();
  const user = useSelector((state) => state.users.loggedinUser);
  const video = useSelector((state) => state.videos.currentVideo);
  const [currentVideo, setCurrentVideo] = useState(undefined);
  const videoId = location.pathname.split("/")[2];
  const [channel, setChannel] = useState({});
  const [last24HrsViewsCompleted, setViewsCompleted] = useState(false);
  const [videoPlayed30s, setVideoPlayed30s] = useState(false);

  const onLoadedData = async () => {
    try {
      const videoResponse = await axios.get(`/videos/video/${videoId}`);
      dispatch(fetchVideoSuccess(videoResponse.data));
      const channelResponse = await axios.get(
        `/users/${videoResponse.data.userId}`
      );

      setCurrentVideo(videoResponse.data._id);
      setChannel(channelResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onLoadedData();
    return () => {
      dispatch(fetchVideoSuccess({}));
    };
  }, [videoId]);
  const handleLike = async () => {
    try {
      await axios.put(`/users/like/${video._id}`);
      dispatch(like(user._id));
    } catch (error) {}
  };
  const handleDislike = async () => {
    try {
      await axios.put(`/users/unlike/${video._id}`);
      dispatch(dislike(user._id));
    } catch (error) {}
  };

  const subscribe = async () => {
    await axios.put(`/users/subscribe/${channel._id}`);
    dispatch(subscribed(channel._id));
  };
  const unsubscribe = async () => {
    await axios.put(`/users/unsubscribe/${channel._id}`);
    dispatch(unsubscribed(channel._id));
  };

  const play = () => {
    const duration = videoRef.current.duration;
    let currentTime = videoRef.current.currentTime;
    if (
      duration < 30 &&
      currentTime > 5 &&
      videoRef.current.played.start(0) === 0 &&
      videoRef.current.played.end(0) > 5
    ) {
      setVideoPlayed30s(true);
    } else if (
      duration > 30 &&
      currentTime > 30 &&
      videoRef.current.played.start(0) === 0 &&
      videoRef.current.played.end(0) > 30
    ) {
      setVideoPlayed30s(true);
    }
  };
  useEffect(() => {
    const videoView = video?.views?.filter((view) => view.id === user._id);

    let currentTimestamp = Math.floor(Date.now() / 1000);
    let hrsBackTimestamp = currentTimestamp - 86400;
    let viewsCompleted = false;
    if (videoView?.length) {
      viewsCompleted = videoView
        ?.sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5)
        .every(function (view) {
          return (
            view.timestamp > hrsBackTimestamp &&
            view.timestamp < currentTimestamp
          );
        });
    }
    setViewsCompleted(viewsCompleted);
  }, []);

  useEffect(() => {
    if (videoPlayed30s && !last24HrsViewsCompleted) {
      const updateVideoView = async () => {
        if (!last24HrsViewsCompleted) {
          await axios.put(`/videos/video/views/${video._id}`, {
            timestamp: Math.floor(Date.now() / 1000),
          });
        }
      };
      updateVideoView();
    }
  }, [!videoPlayed30s]);

  return (
    <VideoDetailsContainer>
      <VideoContent>
        <VideoContainer>
          <Video
            ref={videoRef}
            preload="auto"
            onTimeUpdate={play}
            src={video?.videoUrl}
            id={video?._id}
            controls
          ></Video>
        </VideoContainer>
        <Title>{video?.title}</Title>
        <ChannelDescription>{video?.description}</ChannelDescription>
        <DetailsContainer>
          <VideoInfo>
            {video?.views?.length} views , {format(video?.createdAt)}
          </VideoInfo>
          <ButtonsContainer>
            <Button onClick={handleLike}>
              {video?.likes?.includes(user?._id) ? (
                <ThumbUp />
              ) : (
                <ThumbUpOutlined />
              )}
              {video?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {video?.dislikes?.includes(user?._id) ? (
                <ThumbDown />
              ) : (
                <ThumbDownOutlined />
              )}
              Dislike
            </Button>
          </ButtonsContainer>
        </DetailsContainer>
        <Break />
        <ChannelContainer>
          <ChannelInfo>
            <Image src={channel.image} />
            <ChannelDetails>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} Subscibers</ChannelCounter>
            </ChannelDetails>
          </ChannelInfo>
          {user._id !== channel._id ?
          <Subscribe
            onClick={
              user?.subscribed?.includes(channel._id) ? unsubscribe : subscribe
            }
          >
            {user?.subscribed?.includes(channel._id)
              ? "unsubscribe"
              : "Subscribe"}
          </Subscribe>
          : ''}
        </ChannelContainer>
        <Break />
        <Comments videoId={videoId} />
      </VideoContent>
      <Recomendations>
        <VideoList size={"sm"} type={type} />
      </Recomendations>
    </VideoDetailsContainer>
  );
};

export default VideoDetails;
