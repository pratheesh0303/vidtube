import { useState, useEffect } from "react";
import { Close } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import {axiosInstance as axios} from "../../config";
import { logout, updateUserDetails } from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import S3FileUpload from "react-s3";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
  bucketName: "vidtubepratheesh0303",
  region: "us-east-1",
  accessKeyId: "AKIAVJSMBCSW2RYDPHT7",
  secretAccessKey: "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",
};

const style = {
  position: "absolute",
  top: "10%",
  right: "1%",
  bgcolor: "#121212",
  outline: "none",
  padding: "3rem",
  color: "#FFFFFF",
};

const Form = styled.div`
  margin-top: 1rem;
`;
const Button = styled.button`
  background: #9191bf;
  cursor: pointer;
`;
const Image = styled.img``;
const Icon = styled.span`
  position: absolute;
  top: 50px;
  right: 25px;
  cursor: pointer;
`;
const Progress = styled.span`
  color: green;
`;
export default function Profile({ open, handleClose }) {
  const currentUser = useSelector((state) => state.users.loggedinUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await axios.get(`/users/${currentUser._id}`);
      setUser(userData.data);
      setName(userData.data.name);
      setImage(userData.data.image);
    };
    fetchUser();
  }, [currentUser._id] );

  const fileUpload = (file) => {
    setProgress("Profile image is processing...")
    S3FileUpload.uploadFile(file, { dirName: "profile", ...config })
      .then((data) => {
        setProgress("Profile image processing completed...")
        setImage(data.location);
      })
      .catch((err) => console.log(err));
  };

  const renameFile = (e) => {
    let file = e.target.files[0];
    let filename = e.target.files[0].name.split(".");
    let changedFile = new File(
      [file],
      filename[0] + Date.now() + `.${filename[1]}`
    );
    fileUpload(changedFile);
  };

  const updateUser = async () => {
    await axios.put(`users/${currentUser._id}`, { name: name, image: image });
    dispatch(updateUserDetails({ name: name, image: image }));
    handleClose();
  };

  const logOut = () => {
    dispatch(logout());
    navigate('/')
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Profile
          </Typography>
          <Icon>
            <Close onClick={handleClose} />
          </Icon>
          <Form>
            <label>Profile Image:</label>
            <br />
            <input type="file" onChange={renameFile} value="" />
            {progress?<Progress>{progress}</Progress>:''}
            <br />
            <br />
            {user.image? <Image width="200" height="200" src={user.image} />:''}
            
            <br />
            <label>Channel Name:</label>
            <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />
            <Button onClick={updateUser}>Update User</Button>
            <br />
            <br />
            <Button onClick={logOut}>Logout</Button>
            <br />
            <br />
          </Form>
        </Box>
      </Modal>
    </div>
  );
}
