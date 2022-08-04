import React, { useEffect, useState } from "react";
import { Typography, Button, Link } from "@mui/material";
import EditAboutMeModal from "./EditAboutMeModal";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import LaunchIcon from "@mui/icons-material/Launch";
import url from "../../../ServerUrl";
import Snackbar from "../../ReusableComponents/Snackbar";
import Spinner from "../../ReusableComponents/Spinner";

const AboutMe = () => {
  const [myDetails, setMyDetails] = useState([]);
  const [openEditAboutMeModal, setOpenEditAboutMeModal] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getMyDetails = async () => {
    setIsLoading(true);
    const response = await fetch(`${url}/resume/getResume`, {
      method: "GET",
    });
    const json = await response.json();
    if (response.status === 200) {
      setMyDetails(json.result[0]);
      setId(json.result[0]._id);
      setImage(json.result[0].image);
      setDescription(json.result[0].description);
      setLink(json.result[0].link);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyDetails();
  }, [isOpenSnackbar]);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mt-4">
          <Snackbar
            isOpen={isOpenSnackbar}
            severity={severity}
            message={message}
            setIsOpen={setIsOpenSnackbar}
          />
          {openEditAboutMeModal && (
            <EditAboutMeModal
              openEditAboutMeModal={openEditAboutMeModal}
              setOpenEditAboutMeModal={setOpenEditAboutMeModal}
              setIsOpenSnackbar={setIsOpenSnackbar}
              setSeverity={setSeverity}
              setMessage={setMessage}
              id={id}
              image={image}
              description={description}
              link={link}
            />
          )}
          <Typography px={2} variant="h4" component="div" gutterBottom>
            About Me
          </Typography>
          <div className="mt-5 container">
            <div className="row">
              <div className="col-4">
                <img
                  src={myDetails.image}
                  alt="not found"
                  style={{ height: "50vh" }}
                />
              </div>
              <div className="col">
                <div className="mt-4 mb-5">
                  <label
                    className="ms-2 "
                    style={{ color: "#00b7eb", fontSize: "20px" }}
                  >
                    Name :
                  </label>
                  <br />
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    style={{ width: "40vw" }}
                    type="text"
                    className="ms-2"
                    value="Hello, I am 
            Priyanshu Tiwari"
                  />
                  <br />
                  <label
                    className="ms-2 mt-4 "
                    style={{ color: "#00b7eb", fontSize: "20px" }}
                  >
                    Description :
                  </label>
                  <br />
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    style={{ width: "40vw" }}
                    multiline
                    type="text"
                    className="ms-2 mb-5 "
                    value={myDetails.description}
                  />
                  <br />
                  <Link href={myDetails.link} target="_blank" underline="none">
                    <Button
                      className=""
                      variant="contained"
                      endIcon={<LaunchIcon />}
                    >
                      Resume Link
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-4"></div>
                <div className=" col">
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    style={{ backgroundColor: "gray", width: "20vw" }}
                    onClick={() => {
                      setOpenEditAboutMeModal(true);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutMe;
