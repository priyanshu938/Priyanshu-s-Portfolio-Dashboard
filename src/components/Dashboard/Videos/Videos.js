import React, { useEffect, useState } from "react";
import Video from "./Video";
import url from "../../../ServerUrl";
import { Typography, Button, Grid } from "@mui/material";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AddVideoModal from "./AddVideoModal";
import Snackbar from "../../ReusableComponents/Snackbar";
import Spinner from "../../ReusableComponents/Spinner";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [openAddVideoModal, setOpenAddVideoModal] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getAllVideos = async () => {
    setIsLoading(true);
    const response = await fetch(`${url}/videos/getAllVideosDashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": window.localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setAllVideos(json.result);
    setVideos(json.result);
    setIsLoading(false);
  };
  const handleSearchChange = (e) => {
    const searchVal = e.target.value;
    searchVal.length > 0
      ? setVideos(
          allVideos.filter((video) =>
            video.title.toLowerCase().includes(searchVal.toLowerCase())
          )
        )
      : setVideos(allVideos);
  };
  //Below useEffect will be called whenever value of isOpen will be changed
  useEffect(() => {
    getAllVideos();
  }, [isOpen]);
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <Snackbar
            isOpen={isOpen}
            severity={severity}
            message={message}
            setIsOpen={setIsOpen}
          />
          {openAddVideoModal && (
            <AddVideoModal
              openAddVideoModal={openAddVideoModal}
              setOpenAddVideoModal={setOpenAddVideoModal}
              setIsOpen={setIsOpen}
              setSeverity={setSeverity}
              setMessage={setMessage}
            />
          )}
          <Input
            type="text"
            className="mt-1 mx-4"
            placeholder="Search video..."
            onChange={handleSearchChange}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon className="text-secondary" />
              </InputAdornment>
            }
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            color="success"
            onClick={() => setOpenAddVideoModal(!openAddVideoModal)}
          >
            Add a Video
          </Button>

          {videos.length > 0 ? (
            <Grid container spacing={3} my={2}>
              {videos.map((video) => (
                <Video
                  key={video._id}
                  id={video._id}
                  title={video.title}
                  description={video.description}
                  link={video.link}
                  setIsOpen={setIsOpen}
                  setSeverity={setSeverity}
                  setMessage={setMessage}
                />
              ))}
            </Grid>
          ) : (
            <Typography px={2} my={4} variant="h6" component="div" gutterBottom>
              No video found !
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default Videos;
