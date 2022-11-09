import React, { useState, useEffect } from "react";
import {axiosInstance as axios} from "../../../config";
import styled from "styled-components";
import Video from "./Video";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearSearch } from "../../../redux/searchSlice";
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex-direction: ${(props) => (props.size !== "sm" ? "row" : "column")};
  justify-content: ${(props) => props.size !== "sm" && "center"};
`;
const VideoContainer = styled.div`
  width: ${(props) => props.size !== "sm" && "18rem"};
  height: ${(props) => props.size !== "sm" && "18rem"};
`;

const VideoList = ({ size, type }) => {
  const [videos, setVideos] = useState([]);
  const [filteredvideos, setfilteredVideos] = useState([]);
  const [searchField, setSearchField] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.loggedinUser);
  const search = useSelector((state)=> state.search.searchVideoTerm);
  
  
  useEffect(() => {
    setSearchField(search);
  }, [search])
  let filteredVideo = videos;
  useEffect(() => {
    filteredVideo = videos?.filter(
      video => {
        return (
          video
          .title
          .toLowerCase()
          .includes(searchField.toLowerCase()) 
          ||
          video
          .description
          .toLowerCase()
          .includes(searchField.toLowerCase())
        );
      }
    );
    setfilteredVideos(filteredVideo);
  }, [searchField])
 

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(`/videos/${type}`);
      setVideos(response.data);
      setfilteredVideos(response.data)
    };
    fetchVideos();
    setSearchField('');
    
    dispatch(clearSearch());
  }, [type]);
  
  return (
    <ListContainer size={size}>
      {filteredvideos && filteredvideos.length && filteredvideos.map((video) => {
        return (
          <Link key={video._id} to={user?`/video/${video._id}`:`/login`} style={{ textDecoration: "none" }}>
            <VideoContainer key={video._id} size={size}>
              <Video video={video} size={size} />
            </VideoContainer>
          </Link>
        );
      })}
    </ListContainer>
  );
};

export default VideoList;
