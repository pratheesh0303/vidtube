import { SendOutlined } from "@mui/icons-material";
import {axiosInstance as axios} from "../../../../config";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const CommentsContainer = styled.div``;
const NewCommentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const ProfileIocn = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
`;
const CommentInput = styled.input`
  outline: none;
  padding: 0.5rem;
`;
const Comments = ({ videoId }) => {
  const user = useSelector((state) => state.users.loggedinUser);
  const [comments, setComments] = useState([]);
  const [newComment, createNewComment] = useState("");
  const [commeneted, setCommented] = useState(false);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/comments/${videoId}`);
        setComments(response.data);
        createNewComment("");
        setCommented(false);
      } catch (error) {}
    };
    fetchComments();
  }, [commeneted, videoId]);

  const createComment = async () => {
    await axios.post(`/comments`, {
      userId: user._id,
      videoId: videoId,
      description: newComment,
    });
  };
  return (
    <CommentsContainer>
      <NewCommentContainer>
        <ProfileIocn src={user.image || '/images/user.png'}></ProfileIocn>
        <CommentInput
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => createNewComment(e.target.value)}
        ></CommentInput>
        <SendOutlined
          style={{cursor: 'pointer'}}
          onClick={() => {
            createComment();
            setCommented(true);
          }}
        />
      </NewCommentContainer>
      {comments.map((comment) => {
        return <Comment comment={comment} />;
      })}
      {/* <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/> */}
    </CommentsContainer>
  );
};

export default Comments;
