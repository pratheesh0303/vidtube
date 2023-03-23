import React, { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import S3FileUpload, { uploadFile } from "react-s3";
import { Buffer } from "buffer";
Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #363a3b;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalContainer = styled.div`
  width: 30rem;
  height: 40rem;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  padding: 2rem 2rem;
`;
const Title = styled.div`
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
`;
const Close = styled.div`
  position: absolute;
  right: 0.9rem;
  top: 0.9rem;
  cursor: pointer;
`;
const Input = styled.input`
  border: 1px solid #cccccc;
  padding: 1rem 1rem; ;
`;
const Desc = styled.textarea`
  border: 1px solid #cccccc;
  padding: 0.5rem;
`;
const Label = styled.label`
  text-align: center;
`;
const Button = styled.button`
  width: 5rem;
  text-align: center;
`;
const Status = styled.span`
  color: green;
`;

const config = {
  bucketName: "vidtubepratheesh0303",
  region: "us-east-1",
  accessKeyId: "AKIAVJSMBCSW2RYDPHT7",
  secretAccessKey: "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",
};

const VideoUpload = ({handleCloseUpload}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [thumbnail, setThumbnail] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [videoUrl, setVideoUrl] = useState(undefined);
  const [thumbnailUrl, setThumbnailUrl] = useState(undefined);
  const [videoUploaded, setVideoUploaded] = useState("");
  const [thumbnailUploaded, setThumbnailUploaded] = useState("");

  const splitTags = (e) => {
    setTags(e.target.value.split(","));
  };

  useEffect(() => {
    video && fileUpload(video, "videos");
  }, [video]);
  useEffect(() => {
    thumbnail && fileUpload(thumbnail, "thumbnails");
  }, [thumbnail]);

  const fileUpload = (file, directory) => {
    S3FileUpload.uploadFile(file, { dirName: directory, ...config })
      .then((data) => {
        directory === "videos"
          ? setVideoUrl(data.location)
          : setThumbnailUrl(data.location);
        directory === "videos"
          ? setVideoUploaded("video processing completed")
          : setThumbnailUploaded("Thumbnail image processing completed");
      })
      .catch((err) => console.log(err));
  };

  const renameFile = (e, type) => {
    let file = e.target.files[0];
    let filename = e.target.files[0].name.split(".");
    let changedFile = new File(
      [file],
      filename[0] + Date.now() + `.${filename[1]}`
    );
    if (type === "video") {
      setVideoUploaded("video processing in progress");
      setVideo(changedFile);
    } else {
      setThumbnailUploaded("Thumbnail image processing in progress");
      setThumbnail(changedFile);
    }
  };

  const createVideo = async () => {
    const response = await axios.post("/videos", {
      title: title,
      description: description,
      imageUrl: thumbnailUrl,
      videoUrl: videoUrl,
      tags: tags,
    });
  };
  return (
    <MainContainer>
      <ModalContainer>
        <Title>Upload a new video</Title>
        <Close onClick={handleCloseUpload}>X</Close>
        <Input
          type="file"
          id="videoupload"
          accept="video/*"
          onChange={(e) => renameFile(e, "video")}
        />
        <Status>{videoUploaded}</Status>
        <Input
          type="text"
          placeholder="Video Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Desc
          type="textarea"
          rows={10}
          placeholder="Video Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Label for="tags">Tags:</Label>
        <Input
          type="text"
          id="tags"
          placeholder="please enter comma seperated values"
          onBlur={splitTags}
        />
        <Label>Thumbnail Image:</Label>
        <Input
          type="file"
          id="Thumbnail"
          accept="image/*"
          onChange={(e) => renameFile(e, "thumbnail")}
        />
        <Status>{thumbnailUploaded}</Status>
        <Button
          disabled={
            videoUploaded != "video processing completed" ||
            thumbnailUploaded != "Thumbnail image processing completed" ||
            title == "" ||
            description == ""
          }
          onClick={()=>{
            createVideo();
            handleCloseUpload();
            redirect("/");
          }}
        >
          Upload
        </Button>
      </ModalContainer>
    </MainContainer>
  );
};

export default VideoUpload;
