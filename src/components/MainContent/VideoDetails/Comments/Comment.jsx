import {axiosInstance as axios} from "../../../../config";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "timeago.js";

const CommentContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.8rem 0rem;
  color: white;
`;
const ProfileIocn = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChannelName = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;
const Date = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
  margin-left: 0.9rem;
`;
const CommentText = styled.span`
  margin: 0.6rem 0rem;
  font-size: 0.8rem;
  font-weight: 700;
`;

const Comment = ({ comment }) => {
  const [commentedUser, setCommentedUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const user = await axios.get(`/users/${comment.userId}`);
      setCommentedUser(user.data);
    };
    fetchUser();
  }, [comment]);
  return (
    <CommentContainer>
      <ProfileIocn src={commentedUser.image || "/images/user.png"} />
      <Details>
        <ChannelName>
          {commentedUser.name}
          <Date>{format(comment.createdAt)}</Date>
        </ChannelName>
        <CommentText>{comment.description}</CommentText>
      </Details>
    </CommentContainer>
  );
};

export default Comment;
